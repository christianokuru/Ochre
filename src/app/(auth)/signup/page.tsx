import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = { title: "Start free" };

export default function SignupPage() {
  return (
    <AuthForm mode="signup" />
  );
}
