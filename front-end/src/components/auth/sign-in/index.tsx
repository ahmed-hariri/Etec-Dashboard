'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import Link from "next/link"


export default function SignInComponents() {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return <>
        <section className="w-full h-screen flex justify-center items-center px-3">
            <div className='w-full lg:max-w-[540px] flex flex-col gap-6 border border-gray-200 rounded-lg p-6'>
                <h1 className='text-3xl font-bold'>Sign In</h1>
                <div className="w-full flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="text-[16px]">Email</Label>
                        <Input type="email" id="email" placeholder="Email" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password" className="text-[16px]">Password</Label>
                        <Input type={`${showPassword ? "text" : "password"}`} id="password" placeholder="Password" />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" onClick={() => setShowPassword((prevState) => !prevState)} />
                    <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Show Password
                    </label>
                </div>
                <Button className="py-[23px] text-[17px]">
                    Sign Up
                </Button>
                <div className="flex items-start gap-[5.8px] text-sm">
                    <h1 className="text-gray-700">Don't have an account?</h1>
                    <Link href="/auth/sign-up" className="font-[600] underline">Sign Up</Link>
                </div>
            </div>
        </section>
    </>
}