"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-sehat-500 to-kitablue-500 rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 border-4 border-white rounded-full" />
            <div className="absolute bottom-10 right-10 w-60 h-60 border-4 border-white rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-4 border-white rounded-full" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">
              Mulai Jaga Kesehatan Keluarga Anda Hari Ini
            </h2>
            <p className="text-white/80 text-lg">
              Bergabung dengan ribuan keluarga yang telah menggunakan SehatKita
              untuk memantau kesehatan mereka. Gratis untuk memulai!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 bg-white text-sehat-600 hover:bg-white/90"
                >
                  Daftar Gratis
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/harga">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 gap-2"
                >
                  Lihat Paket
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
