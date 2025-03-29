import { authenticationStoreType } from "@/types";
import { create } from "zustand";

const useSignInStore = create<authenticationStoreType>((set) => ({
    account: { email: '', password: '' },
    setAccount: (newAccount) => set((state) => ({ account: { ...state?.account, ...newAccount } })),
    loading: false,
    setLoading: (newLoading) => set({ loading: newLoading }),
    showPassword: false,
    setShowPassword: (newValue) => set({ showPassword: newValue })
}))

export default useSignInStore