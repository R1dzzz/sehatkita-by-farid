"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const testimonials = [
  {
    name: "Dewi Susanti",
    role: "Ibu Rumah Tangga",
    content:
      "SehatKita sangat membantu saya mengingat jadwal imunisasi anak-anak. Tidak pernah terlambat lagi sejak menggunakan aplikasi ini.",
    rating: 5,
    avatar: "DS",
    color: "bg-sehat-100 text-sehat-700",
  },
  {
    name: "Budi Hartono",
    role: "Ayah dengan 2 Anak",
    content:
      "Fitur peta faskes sangat berguna saat kami traveling. Bisa langsung temukan apotek atau puskesmas terdekat dengan mudah.",
    rating: 5,
    avatar: "BH",
    color: "bg-kitablue-100 text-kitablue-700",
  },
  {
    name: "Sari Wulandari",
    role: "Pekerja Kantoran",
    content:
      "Saya suka fitur reminder obat. Dengan jadwal yang padat, SehatKita membantu saya tetap konsisten minum vitamin harian.",
    rating: 5,
    avatar: "SW",
    color: "bg-purple-100 text-purple-700",
  },
];

export function TestimonialsSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-16 md:py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Apa Kata{" "}
            <span className="bg-gradient-to-r from-sehat-500 to-kitablue-500 bg-clip-text text-transparent">
              Pengguna Kami
            </span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Ribuan keluarga Indonesia telah mempercayakan kesehatan mereka
            kepada SehatKita.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className={`relative hover:shadow-lg transition-shadow ${
                isInView ? "animate-fade-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 space-y-4">
                <Quote className="w-8 h-8 text-sehat-200" />
                <p className="text-muted-foreground leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-2 border-t">
                  <div
                    className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center font-semibold text-sm`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
