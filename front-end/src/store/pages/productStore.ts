import { create } from "zustand";
import { productsStoreType } from "@/types";

const useProductsStore = create<productsStoreType>((set) => ({
    product: { name: '', description: '', price: null, pictures: [], categoryId: '' },
    setProduct: (newProduct) => set((state) => ({ product: { ...state.product, ...newProduct } })),
    products: { data: [] },
    setProducts: (newProducts) => set({ products: newProducts }),
    categories: { data: [] },
    setCategories: (newCategories) => set({ categories: newCategories }),
    orders: { data: [] },
    setOrders: (newOrders) => set({ orders: newOrders }),
    picture: "",
    setPicture: (newPicture) => set({ picture: newPicture }),
    loading: { newProduct: false, showProducts: true },
    setLoading: (newLoading) => set((state) => ({ loading: { ...state?.loading, ...newLoading } })),
    popUp: { modify: false, remove: false, productId: "" },
    setPopUp: (newPopUpValue) => set((state) => ({ popUp: { ...state?.popUp, ...newPopUpValue } }))
}))

export default useProductsStore