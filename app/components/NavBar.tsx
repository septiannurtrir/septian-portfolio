"use client";

import { useEffect, useState } from "react";

export default function NavBar({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 0);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-page border-b transition-[border-color] duration-200 ${
        scrolled ? "border-edge" : "border-transparent"
      }`}
    >
      {children}
    </nav>
  );
}
