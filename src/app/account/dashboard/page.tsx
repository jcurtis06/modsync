"use client";

import { useUser } from "@/hooks/useUser";
import { supabase } from "@/supabaseClient";

export default function Dashboard() {
  const user = useUser();

  if (!user) {
    return <b>Loading...</b>;
  }

  return (
    <div>
      <b>Welcome to the Dashboard</b>
      <button
        onClick={() => {
          supabase.auth.signOut().catch(console.error);
        }}
      >
        Log out
      </button>
    </div>
  );
}
