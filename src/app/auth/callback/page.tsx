"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function CallbackPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const handleCallback = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/auth/onboarding");
      } else {
        router.push("/auth/login");
      }
    };
    handleCallback();
  }, [router, supabase]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sehat-50/50 to-background">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-sehat-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Memproses login...</p>
      </div>
    </div>
  );
}
