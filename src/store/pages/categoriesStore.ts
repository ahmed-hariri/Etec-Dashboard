import { categoriesStoreType } from "@/types";
import { create } from "zustand";

const useCategorieStore = create<categoriesStoreType>((set) => ({
    categorie: "",
    setCategorie: (newCategorie) => set({ categorie: newCategorie }),
    categories: { data: [] },
    setCategories: (newCategories) => set({ categories: newCategories }),
    loading: true,
    setLoading: (loading: boolean) => set({ loading }),
    popUp: { modify: false, remove: false, id: "" },
    setPopUp: (newPopUpValue) => set((state) => ({ popUp: { ...state?.popUp, ...newPopUpValue } }))
}))

export default useCategorieStore