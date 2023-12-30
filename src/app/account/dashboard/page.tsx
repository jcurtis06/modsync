"use client";

import Sidebar from "@/components/sidebar/Sidebar";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/supabaseClient";
import QuickStart from "./components/QuickStart";
import { Divider } from "@nextui-org/react";
import PopularPacks from "./components/PopularPacks";

export default function Dashboard() {
  const user = useUser();

  if (!user) {
    return <b>Loading...</b>;
  }

  return (
    <div className="p-4 w-full">
      <QuickStart />
      <Divider />
      <PopularPacks />
    </div>
  );
}
