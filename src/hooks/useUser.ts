import { supabase } from "@/supabaseClient";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useUser(reRoute = false) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  async function getUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      if (reRoute) {
        router.push("/auth/login");
      } else {
        setUser(null);
      }
    } else {
      setUser(data.user);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return user;
}
