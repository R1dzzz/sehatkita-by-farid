import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SehatKita - Platform Kesehatan Keluarga",
    template: "%s | SehatKita",
  },
  description:
    "Platform kesehatan keluarga yang membantu masyarakat Indonesia memantau kesehatan, reminder imunisasi & obat, cek gejala sederhana, dan menemukan fasilitas kesehatan terdekat.",
  keywords: [
    "kesehatan",
    "keluarga",
    "imunisasi",
    "faskes",
    "Indonesia",
    "sehat",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
