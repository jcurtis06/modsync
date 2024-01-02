"use client";

import { useUser } from "@/hooks/useUser";
import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";

export default function YourPacks() {
  const user = useUser();
  const [modpacks, setModpacks] = useState([] as Modpack[]);

  useEffect(() => {
    if (!user) return;

    // get the user's modpacks
    fetchModpacks();
  }, [user]);

  const fetchModpacks = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("modpacks")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.error(error);
    }

    if (data) {
      setModpacks(data);
    }

    console.log(data);
  };

  return (
    <div className="p-4">
      <p className="text-lg font-bold mb-2">Your Packs</p>
      {modpacks.map((modpack, index) => (
        <div key={index}>{modpack.name}</div>
      ))}
    </div>
  );
}
