"use client";

import { useState, useEffect } from "react";
import { Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { supabase } from "@/supabaseClient";

interface Modpack {
  name: string;
  description: string;
  user_id: string;
}

export default function ModpackBrowser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([] as Modpack[]);

  const handleSearch = async (query: string) => {
    let { data, error } = await supabase
      .from("modpacks")
      .select("name")
      .ilike("name", `%${query}%`);

    if (error) {
      console.error(error);
      setSearchResults([]);
    } else {
      const modpacks = data as Modpack[];

      setSearchResults(modpacks);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <Card>
      <CardHeader>Browse Modpacks</CardHeader>
      <CardBody>
        <Input
          placeholder="Search for modpacks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Display search results */}
        <div className="mt-4">
          {searchResults.map((modpack, index) => (
            <div key={index}>{modpack.name}</div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
