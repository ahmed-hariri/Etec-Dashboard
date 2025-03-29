'use client'

import { Input } from "@/components/shared/chadcn/ui/input"
import { Label } from "@/components/shared/chadcn/ui/label"
import { Button } from "@/components/shared/chadcn/ui/button"
import { Checkbox } from "@/components/shared/chadcn/ui/checkbox"
import { useCallback } from "react"
import Link from "next/link"
import { authenticationTypes } from "@/types"
import { Toaster, toast } from 'sonner';
import { accountSignIn } from "@/api/authentication"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { setAuthToken } from "@/util/authCookies"
import useSignInStore from "@/store/auth/signInStore"

export default function SignInComponents() {
    /*---> States <---*/
    const {
        account, setAccount,
        loading, setLoading,
        showPassword, setShowPassword
    } = useSignInStore()
    const navigate = useRouter();

    /*---> Functions <---*/
    const handleChanges = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e?.target;
        setAccount({ [name]: value });
    }, [setAccount])
    const isValidSignIn = useCallback((account: Partial<authenticationTypes>) => {
        return account?.email?.trim() && account?.password?.trim()
    }, [])
    const handleSubmit = useCallback(async (): Promise<void> => {
        /*---> Verification <---*/
        if (!isValidSignIn(account)) {
            toast?.warning("Please fill in all the fields.");
            return
        }
        /*---> Login account <---*/
        await loginAccount()
    }, [account, isValidSignIn])
    const loginAccount = async (): Promise<void> => {
        setLoading(true)
        try {
            const response = await accountSignIn(account);
            if (response?.message === "Login successful!") {
                setAuthToken(response?.token ?? "")
                toast.success(response?.message)
                navigate.push("/dashboard");
                setAccount({ email: '', password: '' });
                return
            }
            else {
                toast.error(response?.message ?? "Something went wrong, please try again later.")
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
                        <Input type="email" id="email" placeholder="Email" name="email" value={account.email} onChange={handleChanges} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="password" className="text-[16px]">Password</Label>
                        <Input type={`${showPassword ? "text" : "password"}`} id="password" name="password" placeholder="Password" value={account.password} onChange={handleChanges} />
                    </div>
                </div>
                {/* <!-- Checkbox --> */}
                <div className="flex items-center space-x-2">
                    <Checkbox id="terms" onClick={() => setShowPassword?.(!showPassword)} />
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
                    <h1 className="text-gray-700">Dont have an account?</h1>
                    <Link href="/auth/sign-up" className="font-[600] underline">Sign Up</Link>
                </div>
            </div>
            {/* <!-- Message --> */}
            <div className='w-full flex justify-center bottom-0 absolute'>
                <Toaster position="bottom-right" expand={true} />
            </div>
        </section>
    </>
}