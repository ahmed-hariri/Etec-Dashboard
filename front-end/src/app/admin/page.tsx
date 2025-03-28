import { Button } from "@/components/shared/chadcn/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Admin",
    description: "Access your admin panel to manage and monitor system activities efficiently.",
  };

export default function Admin() {
    return <>
        <section className="w-full h-screen flex justify-center items-center">
            <div className="flex flex-col items-center gap-7 text-center">
                <div className="flex flex-col items-center gap-2">
                    <h1 className="text-4xl font-bold">Hello,Amin!</h1>
                    <p className="w-4/5">Manage your store and track sales in real time.</p>
                </div>
                <Link href="/admin/dashboard">
                    <Button>
                        Get Started
                    </Button>
                </Link>
            </div>
        </section>
    </>
}