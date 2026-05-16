"use client";

import { ThemeProvider } from "next-themes";

// suppressHydrationWarning on <html> in layout.tsx handles the theme class
// hydration mismatch — no need to gate with visibility:hidden here.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
