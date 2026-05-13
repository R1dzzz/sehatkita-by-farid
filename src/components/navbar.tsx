"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Heart,
  Menu,
  X,
  Sun,
  Moon,
  Activity,
  Users,
  Pill,
  Stethoscope,
  MapPin,
  BookOpen,
  LayoutDashboard,
  LogOut,
  User,
  Shield,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const publicNav = [
  { href: "/", label: "Beranda", icon: Heart },
  { href: "/harga", label: "Harga", icon: Activity },
  { href: "/tentang", label: "Tentang Kami", icon: Users },
];

const dashboardNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/keluarga", label: "Keluarga", icon: Users },
  { href: "/reminder", label: "Pengingat", icon: Pill },
  { href: "/gejala", label: "Cek Gejala", icon: Stethoscope },
  { href: "/risiko", label: "Risiko", icon: Shield },
  { href: "/peta", label: "Peta Faskes", icon: MapPin },
  { href: "/edukasi", label: "Edukasi", icon: BookOpen },
  { href: "/laporan", label: "Laporan", icon: Activity },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDashboard = pathname?.startsWith("/dashboard") || pathname?.startsWith("/keluarga") || pathname?.startsWith("/reminder") || pathname?.startsWith("/gejala") || pathname?.startsWith("/risiko") || pathname?.startsWith("/peta") || pathname?.startsWith("/edukasi") || pathname?.startsWith("/laporan");

  const navItems = isDashboard ? dashboardNav : publicNav;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sehat-500 to-kitablue-500 flex items-center justify-center">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="bg-gradient-to-r from-sehat-600 to-kitablue-600 bg-clip-text text-transparent">
            SehatKita
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === item.href
                  ? "bg-sehat-100 text-sehat-700 dark:bg-sehat-900/30 dark:text-sehat-300"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="w-4 h-4" />
                  {user.full_name || user.email}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={signOut}
                className="text-red-500 hover:text-red-600"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Masuk
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-sehat-500 to-kitablue-500 text-white hover:from-sehat-600 hover:to-kitablue-600"
                >
                  Daftar
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-2 font-bold">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sehat-500 to-kitablue-500 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white fill-white" />
                    </div>
                    <span>SehatKita</span>
                  </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                        pathname === item.href
                          ? "bg-sehat-100 text-sehat-700 dark:bg-sehat-900/30 dark:text-sehat-300"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="p-4 border-t space-y-2">
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
                        <User className="w-4 h-4" />
                        {user.full_name || user.email}
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500"
                        onClick={() => {
                          signOut();
                          setMobileOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Keluar
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/login" onClick={() => setMobileOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Masuk
                        </Button>
                      </Link>
                      <Link href="/auth/register" onClick={() => setMobileOpen(false)}>
                        <Button className="w-full bg-gradient-to-r from-sehat-500 to-kitablue-500 text-white">
                          Daftar
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
