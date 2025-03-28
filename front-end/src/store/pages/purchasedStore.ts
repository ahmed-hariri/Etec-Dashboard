import { create } from "zustand";
import { purchasedStoreType } from "@/types";

const usePurchasedStore = create<purchasedStoreType>((set) => ({
    purchaseds: { data: [] },
    setPurchaseds: (newProducts) => set({ purchaseds: newProducts }),
    loading: true,
    setLoading: (newLoading) => set({ loading: newLoading }),
    popUp: { modify: false, remove: false, productId: "" },
    setPopUp: (newPopUpValue) => set((state) => ({ popUp: { ...state?.popUp, ...newPopUpValue } }))
}))

export default usePurchasedStore