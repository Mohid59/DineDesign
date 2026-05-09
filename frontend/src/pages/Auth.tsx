import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { loginUser, registerUser } from "@/lib/api";

const Auth = () => {
  const SAVED_CREDENTIALS_KEY = "dinedesign.savedCredentials";
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const adminCredentials = (import.meta.env.VITE_ADMIN_CREDENTIALS || "")
    .split(",")
    .map((value: string) => value.trim())
    .filter(Boolean)
    .map((item: string) => {
      const [adminEmail = "", adminName = "", adminPassword = ""] = item.split("|").map((part) => part.trim());
      return {
        email: adminEmail.toLowerCase(),
        name: adminName,
        password: adminPassword,
      };
    })
    .filter((entry) => entry.email && entry.password);

  type LoginResult = {
    data?: {
      token?: string;
      user?: {
        role?: string;
        name?: string;
        email?: string;
      };
    };
  };

  const onAuthSuccess = (login: LoginResult) => {
    const token = login?.data?.token || "";
    const loginRole = login?.data?.user?.role === "admin" ? "admin" : "client";
    const loginName = login?.data?.user?.name || name;
    const loginEmail = login?.data?.user?.email || email;
    signIn({ name: loginName, email: loginEmail, role: loginRole, token });
    window.localStorage.setItem(
      SAVED_CREDENTIALS_KEY,
      JSON.stringify({ email: loginEmail, password }),
    );
    navigate(loginRole === "admin" ? "/admin" : "/dashboard");
  };

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(SAVED_CREDENTIALS_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { email?: string; password?: string };
      if (parsed.email) setEmail(parsed.email);
      if (parsed.password) setPassword(parsed.password);
    } catch {
      window.localStorage.removeItem(SAVED_CREDENTIALS_KEY);
    }
  }, []);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const matchedAdmin = adminCredentials.find(
        (entry) => entry.email === normalizedEmail && entry.password === password,
      );

      if (matchedAdmin) {
        const login = await loginUser({ email: matchedAdmin.email, password });
        onAuthSuccess(login);
        return;
      }

      try {
        const login = await loginUser({ email, password });
        onAuthSuccess(login);
      } catch {
        setMode("signup");
        throw new Error("Email/password not recognized. Please sign up first.");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to connect backend");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (password !== confirmPassword) {
        throw new Error("Password and confirm password do not match.");
      }

      await registerUser({
        name,
        email,
        password,
        role: "customer",
      });

      const login = await loginUser({ email, password });
      onAuthSuccess(login);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to connect backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-3xl font-bold font-display">
            {mode === "signin" ? "Sign in to DineDesign" : "Create your DineDesign account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Create an account or Sign in.</p>

          <div className="mt-6 grid grid-cols-2 gap-2 rounded-lg border border-border p-1">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setError("");
              }}
              className={`rounded-md px-3 py-2 text-sm font-medium ${mode === "signin" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError("");
              }}
              className={`rounded-md px-3 py-2 text-sm font-medium ${mode === "signup" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
            >
              Sign Up
            </button>
          </div>

          <form className="mt-8 space-y-4" onSubmit={mode === "signin" ? handleSignIn : handleSignUp}>
            {mode === "signup" ? (
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
            ) : null}

            <label className="block">
              <span className="mb-1 block text-sm font-medium">Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium">Password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </label>

            {mode === "signup" ? (
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Confirm Password</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </label>
            ) : null}

            {error ? <p className="text-sm text-destructive">{error}</p> : null}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Connecting..." : mode === "signin" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Auth;
