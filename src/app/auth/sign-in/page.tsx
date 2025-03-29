import type { Metadata } from "next";
import SignInComponents from "@/components/auth/sign-in";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Access your account to enjoy personalized services and features.",
};

export default function SignIn() {
    return <>
        <SignInComponents />
    </>
}