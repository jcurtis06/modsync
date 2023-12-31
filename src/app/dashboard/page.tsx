"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/supabaseClient";
import QuickStart from "./components/QuickStart";
import { Divider } from "@nextui-org/react";
import PopularPacks from "./components/PopularPacks";
import LoadingPage from "@/components/LoadingPage";

export default function Dashboard() {
  return (
    <div className="p-4 w-full">
      <QuickStart />
      <Divider />
      <PopularPacks />
    </div>
  );
}
