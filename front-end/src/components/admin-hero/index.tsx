"use client"

import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"

export default function AdminHero() {
    return <>
        <section className="w-full h-screen flex flex-col justify-center items-center gap-5">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="flex text-4xl font-[700]">!Hello,Admin</h1>
                <p className="text-lg">You need something?</p>
            </div>
            <Button className="px-[14.5px] py-[20px] text-[15px]" onClick={() => redirect("/admin/dashboard")}>
                Get Started
            </Button>
        </section>
    </>
}