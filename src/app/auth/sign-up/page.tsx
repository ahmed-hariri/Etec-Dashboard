import type { Metadata } from "next";
import SignUpComponents from "@/components/auth/sign-up";

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Register a new account to access exclusive features and services."
};

export default function SignUp() {
    return <>
        <SignUpComponents />
    </>
}