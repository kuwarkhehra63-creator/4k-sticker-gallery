import { Link, useLocation } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Button } from "./ui/button";

export function Header() {
  const { isAuthenticated, isLoggingIn, login, logout, principalText } =
    useAuth();
  const location = useLocation();
  const isUploadPage = location.pathname === "/upload";

  return (
    <header
      className="sticky top-0 z-50 bg-card border-b border-border/60 shadow-elevated"
      data-ocid="header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo + Title */}
        <Link
          to="/"
          className="flex items-center gap-3 group transition-smooth"
          data-ocid="header.home_link"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center transition-smooth group-hover:bg-primary/30">
            <span className="text-primary text-sm font-bold font-mono">4K</span>
          </div>
          <span className="font-display font-bold text-lg text-foreground leading-none hidden sm:block">
            4K Sticker Gallery
          </span>
        </Link>

        {/* Nav + Auth */}
        <div className="flex items-center gap-3">
          {!isUploadPage && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2 border-primary/40 text-primary hover:bg-primary/10 hover:border-primary/60 transition-smooth"
              data-ocid="header.upload_link"
            >
              <Link to="/upload">
                <Upload className="size-4" />
                <span className="hidden sm:inline">Upload</span>
              </Link>
            </Button>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {principalText && (
                <span
                  className="hidden md:block text-xs text-muted-foreground font-mono max-w-[120px] truncate"
                  title={principalText}
                >
                  {principalText.slice(0, 8)}…
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
                data-ocid="header.logout_button"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              onClick={login}
              disabled={isLoggingIn}
              className="bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth"
              data-ocid="header.login_button"
            >
              {isLoggingIn ? "Connecting…" : "Login"}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
