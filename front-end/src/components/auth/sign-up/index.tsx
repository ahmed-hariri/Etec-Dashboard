'use client'

import { Input } from "@/components/shared/chadcn/ui/input"
import { Label } from "@/components/shared/chadcn/ui/label"
import { Button } from "@/components/shared/chadcn/ui/button"
import { Checkbox } from "@/components/shared/chadcn/ui/checkbox"
import { useCallback, useState } from "react"
import Link from "next/link"
import { Toaster, toast } from 'sonner';
import { authenticationTypes } from "@/types"
import { accountSignUp } from "@/api/authentication"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { setAuthToken } from "@/util/authCookies"

export default function SignUpComponents() {
    /*---> States <---*/
    const [account, setAccount] = useState<authenticationTypes>({ fullName: '', email: '', password: '', passwordConfirmation: '', profile: null, subsribe: false });
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useRouter();

    /*---> Functions <---*/
    const handleChanges = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e?.target;
        setAccount((prevState) => ({ ...prevState, [name]: value }));
    }, [])
    const isValidSignUp = useCallback((account: Partial<authenticationTypes>) => {
        return account?.fullName?.trim() && account?.email?.trim() && account?.password?.trim() && account?.passwordConfirmation?.trim();
    }, []);
    const handleSubmit = useCallback(async () => {
        if (!isValidSignUp(account)) {
            toast.warning("Please fill in all the fields.");
            return;
        }
        if (account?.password !== account?.passwordConfirmation) {
            toast.warning("Password and password confirmation do not match.");
            return;
        }
        await createAccount();
    }, [account, isValidSignUp]);
    const createAccount = async (): Promise<void> => {
        setLoading(true)
        try {
            const response = await accountSignUp(account);
            if (response?.message === "Account has been created!") {
                setAuthToken(response?.token ?? "")
                toast.success(response?.message)
                navigate.push("/admin")
                setAccount({ fullName: '', email: '', password: '', passwordConfirmation: '' });
                return
            }
            toast?.error(response?.message ?? "Something went wrong, please try again later.")
            return
        }
        catch (error) { console.error("Error Register:", error) }
        finally { setLoading(false) }
    }
    return <>
        <section className="w-full h-screen flex justify-center items-center px-3 relative">
            <div className='w-full lg:max-w-[540px] flex flex-col gap-6 border border-gray-200 rounded-lg p-6'>
                <h1 className='text-3xl font-bold'>Sign Up</h1>
                {/* <!-- Inputs --> */}
                <div className="w-full flex flex-col gap-3">
                    <div className="w-full flex flex-col gap-2">
                        <Label htmlFor="fullName" className="text-[16px]">Full Name</Label>
                        <Input type="text" id="fullName" placeholder="Full Name" name="fullName" value={account.fullName} onChange={handleChanges} />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Label htmlFor="email" className="text-[16px]">Email</Label>
                        <Input type="email" id="email" placeholder="Email" name="email" value={account.email} onChange={handleChanges} />
                    </div>
                    <div className="w-full flex flex-wrap lg:flex-nowrap gap-3">
                        <div className="w-full lg:w-1/2 flex flex-col gap-2">
                            <Label htmlFor="password" className="text-[16px]">Password</Label>
                            <Input type={`${showPassword ? "text" : "password"}`} id="password" placeholder="Password" name="password" value={account.password} onChange={handleChanges} />
                        </div>
                        <div className="w-full lg:w-1/2 flex flex-col gap-2">
                            <Label htmlFor="passwordConfirmation" className="text-[16px]">Password Confirmation</Label>
                            <Input type={`${showPassword ? "text" : "password"}`} id="passwordConfirmation" placeholder="Password Confirmation" name="passwordConfirmation" value={account.passwordConfirmation} onChange={handleChanges} />
                        </div>
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
                    Sign Up
                    <Loader2 className={`animate-spin ${loading ? "flex" : "hidden"}`} />
                </Button>
                <div className="flex items-start gap-[5.8px] text-sm">
                    <h1 className="text-gray-700">Already have an account?</h1>
                    <Link href="/auth/sign-in" className="font-[600] underline">Sign In</Link>
                </div>
            </div>
            {/* <!-- Message --> */}
            <div className='w-full flex justify-center bottom-0 absolute bg-yellow-600'>
                <Toaster position="bottom-right" expand={true} />
            </div>
        </section>
    </>
}