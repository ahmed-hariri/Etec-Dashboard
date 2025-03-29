import { authenticationStoreType } from "@/types";
import { create } from "zustand";

const useSignUpStore = create<authenticationStoreType>((set) => ({
    account: { fullName: '', email: '', password: '', passwordConfirmation: '', profile: null, subsribe: false },
    setAccount: (newAccount) => set((state) => ({ account: { ...state?.account, ...newAccount } })),
    loading: false,
    setLoading: (newLoading) => set({ loading: newLoading }),
    showPassword: false,
    setShowPassword: (newValue) => set({ showPassword: newValue })
}))

export default useSignUpStore