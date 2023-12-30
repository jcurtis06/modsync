import { useState } from "react";
import { supabase } from "@/supabaseClient";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    if (isLogin) {
      login();
    } else {
      signup();
    }
  };

  const login = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log("Logged in!");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const signup = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log("Check email for confirmation!");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-xs shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="mb-6 text-lg font-bold text-center">
          {isLogin ? "Log In" : "Sign Up"}
        </h2>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mb-3"
          onClick={handleAuth}
        >
          {isLogin ? "Log In" : "Sign Up"}
        </button>
        <button
          className="text-blue-500 hover:text-blue-800 text-sm"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Need an account? Sign Up"
            : "Already have an account? Log In"}
        </button>
      </div>
    </div>
  );
}
