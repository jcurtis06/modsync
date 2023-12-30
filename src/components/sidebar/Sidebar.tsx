"use client";

import Link from "next/link";
import SideBarItem from "./SidebarItem";

export default function Sidebar() {
  return (
    <div className="h-screen sticky top-0 left-0 min-w-64 bg-darker text-white">
      <div className="p-5 flex gap-2">
        <h1 className="text-lg font-semibold">ModSync</h1>
        <p className="mt-auto text-sm text-gray-500">v1.0.0-beta</p>
      </div>
      <nav className="flex flex-col">
        <SideBarItem title="Dashboard" href="/account/dashboard" />
        <SideBarItem title="Modpacks" href="/account/dashboard/modpacks" />
        <SideBarItem title="Settings" href="/account" />
        <SideBarItem
          title="Sign out"
          href="/auth/signout"
          className="text-red-500 mt-4"
        />
      </nav>
    </div>
  );
}
