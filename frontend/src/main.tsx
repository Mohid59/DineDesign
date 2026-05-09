import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

try {
  const stored = window.localStorage.getItem("dinedesign.theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const useDark = stored ? stored === "dark" : prefersDark;
  document.documentElement.classList.toggle("dark", useDark);
} catch {
  // Ignore localStorage/matchMedia errors in restricted environments.
}

createRoot(document.getElementById("root")!).render(<App />);
