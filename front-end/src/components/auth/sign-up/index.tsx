'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import Link from "next/link"


export default function SignUpComponents() {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return <>
        <section className="w-full h-screen flex justify-center items-center px-3">
            <div className='w-full lg:max-w-[540px] flex flex-col gap-6 border border-gray-200 rounded-lg p-6'>
                <h1 className='text-3xl font-bold'>Sign Up</h1>
                <div className="w-full flex flex-col gap-3">
                    <div className="w-full flex flex-wrap lg:flex-nowrap gap-3">
                        <div className="w-full lg:w-1/2 flex flex-col gap-2">
                            <Label htmlFor="firstName" className="text-[16px]">First</Label>
                            <Input type="text" id="firstName" placeholder="First Name" />
                        </div>
                        <div className="w-full lg:w-1/2 flex flex-col gap-2">
                            <Label htmlFor="lastName" className="text-[16px]">Last</Label>
                            <Input type="text" id="lastName" placeholder="Last Name" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="text-[16px]">Email</Label>
                        <Input type="email" id="email" placeholder="Email" />
                    </div>
                    <div className="w-full flex flex-wrap lg:flex-nowrap gap-3">
                        <div className="w-full lg:w-1/2 flex flex-col gap-2">
                            <Label htmlFor="password" className="text-[16px]">Password</Label>
                            <Input type={`${showPassword ? "text" : "password"}`} id="password" placeholder="Password" />
                        </div>
                        <div className="w-full lg:w-1/2 flex flex-col gap-2">
                            <Label htmlFor="passwordConfirmation" className="text-[16px]">Password Confirmation</Label>
                            <Input type={`${showPassword ? "text" : "password"}`} id="passwordConfirmation" placeholder="Password Confirmation" />
                        </div>
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
                    <h1 className="text-gray-700">Already have an account?</h1>
                    <Link href="/auth/sign-in" className="font-[600] underline">Sign In</Link>
                </div>
            </div>
        </section>
    </>
}