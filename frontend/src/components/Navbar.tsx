import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { getOrders } from "@/lib/api";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [ordersCount, setOrdersCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  const location = useLocation();
  const { user, role, signOut } = useAuth();
  const seenOrdersCountKey = "admin.orders.seen.count";

  const links = [
    { to: "/", label: "Home" },
    ...(role === "admin" ? [{ to: "/admin/orders", label: "Orders" }] : []),
    { to: "/marketplace", label: "Templates" },
    ...(role === "client" ? [{ to: "/cart", label: "Cart" }] : []),
  ];

  useEffect(() => {
    setDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (role !== "admin") return;
    let mounted = true;
    const loadNotifications = async () => {
      try {
        const response = await getOrders();
        if (!mounted) return;
        const nextOrdersCount = Array.isArray(response?.data) ? response.data.length : 0;
        setOrdersCount(nextOrdersCount);
        const seenOrdersCount = Number(window.localStorage.getItem(seenOrdersCountKey) || 0);
        setNotificationCount(Math.max(nextOrdersCount - seenOrdersCount, 0));
      } catch {
        if (!mounted) return;
        setOrdersCount(0);
        setNotificationCount(0);
      }
    };
    loadNotifications();
    const timer = window.setInterval(loadNotifications, 10000);
    return () => {
      mounted = false;
      window.clearInterval(timer);
    };
  }, [role]);

  useEffect(() => {
    if (role !== "admin") return;
    if (location.pathname !== "/admin/orders") return;
    window.localStorage.setItem(seenOrdersCountKey, String(ordersCount));
    setNotificationCount(0);
  }, [location.pathname, ordersCount, role]);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("dinedesign.theme", next ? "dark" : "light");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold font-display">
          <span className="bg-hero-gradient rounded-lg px-2 py-1 text-primary-foreground text-sm font-sans font-bold">DD</span>
          DineDesign
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`relative text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === l.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
              {role === "admin" && l.to === "/admin/orders" && notificationCount > 0 ? (
                <span className="absolute -right-3 -top-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                  {notificationCount}
                </span>
              ) : null}
            </Link>
          ))}
          <Button variant="ghost" size="icon" onClick={toggleTheme} title="Toggle theme">
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          {user ? (
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" size="sm">
                <Link to={role === "admin" ? "/admin" : "/dashboard"}>
                  <User className="h-4 w-4 mr-1.5" />
                  {role === "admin" ? "Admin" : "Dashboard"}
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-1.5" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" size="sm">
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild size="sm" className="bg-hero-gradient text-primary-foreground hover:opacity-90">
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 animate-fade-in">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-2 text-sm font-medium text-muted-foreground hover:text-primary"
            >
              <span>{l.label}</span>
              {role === "admin" && l.to === "/admin/orders" && notificationCount > 0 ? (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
                  {notificationCount}
                </span>
              ) : null}
            </Link>
          ))}
          <Button size="sm" variant="ghost" className="mt-2 w-full" onClick={toggleTheme}>
            {darkMode ? "Light mode" : "Dark mode"}
          </Button>
          {user ? (
            <>
              <Link
                to={role === "admin" ? "/admin" : "/dashboard"}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary"
              >
                {role === "admin" ? "Admin Dashboard" : "My Dashboard"}
              </Link>
              <Button size="sm" variant="outline" className="mt-2 w-full" onClick={() => { signOut(); setMobileOpen(false); }}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button asChild size="sm" className="mt-2 w-full bg-hero-gradient text-primary-foreground">
              <Link to="/auth" onClick={() => setMobileOpen(false)}>Get Started</Link>
            </Button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
