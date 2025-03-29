import { clientsStoreType } from "@/types";
import { create } from "zustand";

const useClientsStore = create<clientsStoreType>((set) => ({
    clients: { data: [] },
    setClients: (newClients) => set({ clients: newClients }),
    loading: true,
    setLoading: (newLoading) => set({ loading: newLoading })
}))

export default useClientsStore