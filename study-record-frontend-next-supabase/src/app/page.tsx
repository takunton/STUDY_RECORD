"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login"); // リダイレクト先のパス
  }, [router]);

  return null; // このコンポーネントは何もレンダリングしない
}
