"use client";
import Auth from "@/components/Auth";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      <p className="text-4xl font-bold tracking-tighter mb-2">
        Welcome to <span className="text-green-400">ModSync</span>
      </p>
      <p className="text-gray-700 italic">A new way to share modpacks</p>

      <Auth />

      <Link href="/account/dashboard">Create a modpack</Link>
    </div>
  );
}
