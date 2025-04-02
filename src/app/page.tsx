import type { Metadata } from "next";
import SignInComponents from "@/components/auth/sign-in";

/*---> Added metadata for SEO and better page information <---*/
export const metadata: Metadata = {
    title: "Sign In || E-commerce",
    description: "Access your account to enjoy personalized services and features.",
};

export default function SignIn() {
    return <>
        <SignInComponents />
    </>
}