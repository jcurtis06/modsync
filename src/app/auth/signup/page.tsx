"use client";

import { supabase } from "@/supabaseClient";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /** Handles when an input field is changed */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError("");
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  /** Handles when the form is submitted */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    handleSignUp();
    setError("");
  };

  /** Handles signing up via Supabase */
  const handleSignUp = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="mb-8 text-2xl">Welcome to ModSync</h1>

      {error && (
        <Card className="mb-4 border-red-500 border-1 bg-transparent w-96">
          <CardBody className="text-center text-red-500">{error}</CardBody>
        </Card>
      )}

      {/* SIGN UP */}
      <Card className="min-w-96">
        <CardBody>
          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <p className="m-1">Enter your email address</p>
            <Input
              className="mb-6"
              size="sm"
              type="email"
              name="email"
              required
              onChange={handleChange}
            />

            {/* PASSWORD */}
            <p className="m-1">Create a password</p>
            <Input
              className="mb-6"
              size="sm"
              required
              type="password"
              name="password"
              onChange={handleChange}
            />

            {/* USERNAME */}
            <p className="m-1">Enter a username</p>
            <Input
              className="mb-6"
              size="sm"
              type="text"
              name="username"
              required
              onChange={handleChange}
            />

            <Button
              color="primary"
              className="mt-4 w-full"
              type="submit"
              isLoading={loading}
            >
              Sign up
            </Button>

            <p className="text-center text-gray-400 mt-2">
              By signing up, you agree to our{" "}
              <Link href="#" className="text-blue-500">
                Terms of Use
              </Link>{" "}
            </p>
          </form>
        </CardBody>
      </Card>

      {/* SIGN UP LINK */}
      <Card className="min-w-96 mt-4">
        <CardBody className="text-center">
          <p>
            Already have an account?{" "}
            <Link href={"/auth/login"} className="text-blue-500">
              Click to log in
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
}
