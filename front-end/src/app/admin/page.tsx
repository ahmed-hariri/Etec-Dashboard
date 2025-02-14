import { Button } from "@/components/chadcn/ui/button";
import Link from "next/link";

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