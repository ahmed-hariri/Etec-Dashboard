import { ordersStoreType } from "@/types";
import { create } from "zustand";

const useOrdersStore = create<ordersStoreType>((set) => ({
    orders: { data: [] },
    setOrders: (newOrders) => set({ orders: newOrders }),
}))

export default useOrdersStore