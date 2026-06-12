"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // this prevents hydration tree error
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;//empty placeholder during load
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg border bg-white dark:bg-slate-900 text-zinc-800 dark:text-slate-50 transition-colors"
      aria-label="Wissel thema"
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  );
}