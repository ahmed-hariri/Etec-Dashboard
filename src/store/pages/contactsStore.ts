import { contactsStoreType } from "@/types";
import { create } from "zustand";

const useContactsStore = create<contactsStoreType>((set) => ({
    contacts: { data: [] },
    setContacts: (newContacts) => set({ contacts: newContacts }),
    loading: true,
    setLoading: (newLoading) => set({ loading: newLoading }),
    popUp: { remove: false, contactId: "" },
    setPopUp: (newPopUpValue) => set((state) => ({ popUp: { ...state?.popUp, ...newPopUpValue } }))
}))

export default useContactsStore