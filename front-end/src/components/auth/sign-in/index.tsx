'use client'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import Link from "next/link"
import { accountTypes } from "@/types"
import { Toaster, toast } from 'sonner';
import { accountSignIn } from "@/api/authentication"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Cookies from 'js-cookie';

export default function SignInComponents() {
    /*---> States <---*/
    const [account, setAccount] = useState<Partial<accountTypes>>({ email: '', password: '' });
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useRouter();


    /*---> Functions <---*/
    const handelChanges = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setAccount((prevState) => ({ ...prevState, [name]: value }));
    }
    const handleSubmit = async () => {
        /*---> Verification <---*/
        const validationEmail: boolean = account.email?.trim() !== "";
        const validationPassword: boolean = account.password?.trim() !== "";
        if (!validationEmail || !validationPassword) {
            toast.warning("Please fill in all the fields.");
            return
        }
        /*---> Login account <---*/
        await loginAccount()
    }
    const loginAccount = async (): Promise<void> => {
        setLoading(true)
        try {
            const response = await accountSignIn(account);
            if (response?.message === "Login successful!") {
                Cookies.set("Token", response?.token);
                toast.success(response?.message)
                setAccount({ email: '', password: '' });
                if (response?.data?.admin) {
                    navigate.push("/admin/dashboard")
                } else {
                    navigate.push("/")
                }
                return
            }
            else {
                toast.error(response?.message)
                return
            }
        }
        catch (error) { console.error("Error Register:", error) }
        finally { setLoading(false) }
    }

    return <>
        <section className="w-full h-screen flex justify-center items-center px-3 relative">
            <div className='w-full lg:max-w-[540px] flex flex-col gap-6 border border-gray-200 rounded-lg p-6'>
                <h1 className='text-3xl font-bold'>Sign In</h1>
                {/* <!-- Inputs --> */}
                <div className="w-full flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="text-[16px]">Email</Label>
                        <Input type="email" id="email" placeholder="Email" name="email" value={account.email} onChange={handelChanges} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password" className="text-[16px]">Password</Label>
                        <Input type={`${showPassword ? "text" : "password"}`} id="password" name="password" placeholder="Password" value={account.password} onChange={handelChanges} />
                    </div>
                </div>
                {/* <!-- Checkbox --> */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" onClick={() => setShowPassword((prevState) => !prevState)} />
                    <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Show Password
                    </label>
                </div>
                {/* <!-- Button --> */}
                <Button className="py-[23px] text-[17px]" disabled={loading} onClick={handleSubmit}>
                    Sign In
                    <Loader2 className={`animate-spin ${loading ? "flex" : "hidden"}`} />
                </Button>
                <div className="flex items-start gap-[5.8px] text-sm">
                    <h1 className="text-gray-700">Don't have an account?</h1>
                    <Link href="/auth/sign-up" className="font-[600] underline">Sign Up</Link>
                </div>
            </div>
            <div className='w-full flex justify-center bottom-0 absolute bg-yellow-600'>
                <Toaster position="bottom-right" expand={true} />
            </div>
        </section>
    </>
}