import { clientsStoreType } from "@/types";
import { create } from "zustand";

const useClientsStore = create<clientsStoreType>((set) => ({
    clients: { data: [] },
    setClients: (newClients) => set({ clients: newClients }),
    loading: true,
    setLoading: (newLoading) => set({ loading: newLoading }),
    popUp: { modify: false, remove: false, id: "" },
    setPopUp: (newPopUp) => set({ popUp: newPopUp }),
}))

export default useClientsStore