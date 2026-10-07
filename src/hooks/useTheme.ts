import { useState, useEffect } from "react";

type Theme = "dark" | "light";

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem("haven_theme") as Theme | null;
        if (saved === "dark" || saved === "light") return saved;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
        localStorage.setItem("haven_theme", theme);
    }, [theme]);

    const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
    const isDark = theme === "dark";

    return { theme, isDark, toggleTheme };
}
