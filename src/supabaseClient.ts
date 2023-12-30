import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://crchqqzvmlncxlgospzm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyY2hxcXp2bWxuY3hsZ29zcHptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM5NDc5MjAsImV4cCI6MjAxOTUyMzkyMH0.ZP1d53v2oErsThm1ydNGHCXq79Y0kQeWoh9NLew2iXM";

export const supabase = createClient(supabaseUrl, supabaseKey);
