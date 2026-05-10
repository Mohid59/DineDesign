import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { clearToken, getToken, setToken as persistToken } from "@/lib/api";

type UserRole = "admin" | "client";

interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  role: UserRole | null;
  token: string;
  loading: boolean;
  signIn: (payload: { name: string; email: string; role: UserRole; token: string }) => void;
  signOut: () => void;
}

const STORAGE_KEY = "dinedesign.auth";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as { user: AuthUser; role: UserRole };
        setUser(parsed.user);
        setRole(parsed.role);
        setToken(getToken());
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
        clearToken();
      }
    }
    setLoading(false);
  }, []);

  const signIn = useCallback(
    ({ name, email, role: nextRole, token: nextToken }: { name: string; email: string; role: UserRole; token: string }) => {
      const nextUser = { name, email };
      setUser(nextUser);
      setRole(nextRole);
      setToken(nextToken);
      persistToken(nextToken);
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ user: nextUser, role: nextRole }),
      );
    },
    [],
  );

  const signOut = useCallback(() => {
    setUser(null);
    setRole(null);
    setToken("");
    window.localStorage.removeItem(STORAGE_KEY);
    clearToken();
  }, []);

  const value = useMemo(
    () => ({
      user,
      role,
      token,
      loading,
      signIn,
      signOut,
    }),
    [loading, role, signIn, signOut, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
