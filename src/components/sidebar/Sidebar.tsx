"use client";

import SideBarItem from "./SidebarItem";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/supabaseClient";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useUser(false);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error.message);
      return;
    }

    setIsLoggedIn(false);
    console.log("Signed out", isLoggedIn);
  };

  return (
    <div className="h-screen sticky top-0 left-0 min-w-64 bg-darker text-white">
      <div className="p-5 flex gap-2">
        <h1 className="text-lg font-semibold">ModSync</h1>
        <p className="mt-auto text-sm text-gray-500">v1.0.0-beta</p>
      </div>
      <nav className="flex flex-col">
        <SideBarItem title="Dashboard" href="/dashboard" />
        <SideBarItem title="Modpacks" href="/dashboard/modpacks" />
        <SideBarItem title="Settings" href="/dashboard" />
        <SideBarItem
          title={isLoggedIn ? "Sign Out" : "Sign In"}
          // if we are logged in, sign out, otherwise go to sign in page
          action={
            isLoggedIn ? signOut : () => (window.location.href = "/auth/login")
          }
          className={`${isLoggedIn ? "text-warning" : "text-primary"} mt-4`}
        />
      </nav>
    </div>
  );
}
