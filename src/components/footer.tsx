import Link from "next/link";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sehat-500 to-kitablue-500 flex items-center justify-center">
                <Heart className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="bg-gradient-to-r from-sehat-600 to-kitablue-600 bg-clip-text text-transparent">
                SehatKita
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Platform kesehatan keluarga yang membantu masyarakat Indonesia
              memantau kesehatan keluarga dengan lebih baik.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Menu Cepat</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/keluarga" className="hover:text-foreground transition-colors">
                  Profil Keluarga
                </Link>
              </li>
              <li>
                <Link href="/gejala" className="hover:text-foreground transition-colors">
                  Cek Gejala
                </Link>
              </li>
              <li>
                <Link href="/peta" className="hover:text-foreground transition-colors">
                  Peta Faskes
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Sumber Daya</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/edukasi" className="hover:text-foreground transition-colors">
                  Edukasi Kesehatan
                </Link>
              </li>
              <li>
                <Link href="/harga" className="hover:text-foreground transition-colors">
                  Harga
                </Link>
              </li>
              <li>
                <Link href="/tentang" className="hover:text-foreground transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/laporan" className="hover:text-foreground transition-colors">
                  Laporan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                support@sehatkita.id
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                0800-1234-5678
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} SehatKita. Dibuat dengan untuk kesehatan keluarga Indonesia.
        </div>
      </div>
    </footer>
  );
}
