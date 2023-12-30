import { supabase } from "@/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  async function getUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      router.push("/");
    } else {
      setUser(data.user);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return user;
}
