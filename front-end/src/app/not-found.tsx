'use client'

import { Button } from "@/components/chadcn/ui/button"
import { redirect } from "next/navigation"

export default function NotFound() {
    return <>
        <section className="w-full h-screen flex flex-col justify-center items-center gap-7">
            <div className="flex flex-col gap-2 text-center">
                <h1 className="text-[68px] font-[700]">Oops... This page does not exist</h1>
                <p className="text-[20px] text-gray-600 font-[600]">
                    We apologize for the inconvenience. Go to our home page
                </p>
            </div>
            <Button className="px-[17px] py-[22px] text-[19px]" onClick={() => redirect("/")}>
                Home page
            </Button>
        </section>
    </>
}