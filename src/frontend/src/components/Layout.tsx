import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const footerLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 w-full">{children}</main>

      <footer className="bg-card border-t border-border/60 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="font-display font-semibold text-foreground/70 hover:text-foreground transition-smooth text-sm"
            >
              4K Sticker Gallery
            </Link>
            <span className="text-border">·</span>
            <Link
              to="/upload"
              className="hover:text-foreground transition-smooth"
            >
              Upload Sticker
            </Link>
          </div>
          <p>
            © {year}.{" "}
            <a
              href={footerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-smooth"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
