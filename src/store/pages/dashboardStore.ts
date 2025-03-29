import { create } from "zustand";
import { dashboardStoreType } from "@/types";


const useDashboardStore = create<dashboardStoreType>((set) => ({
    products: { data: [] },
    setProducts: (newProducts) => set({ products: newProducts }),
    orders: { data: [] },
    setOrders: (newOrders) => set({ orders: newOrders }),
    purchased: { data: [] },
    setPurchased: (newPurchased) => set({ purchased: newPurchased }),
    clients: { data: [] },
    setClients: (newClients) => set({ clients: newClients }),
    loading: true,
    setLoading: (newLoading) => set({ loading: newLoading }),
}))

export default useDashboardStore