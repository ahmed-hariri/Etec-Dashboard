"use client"

import { toast, Toaster } from "sonner";
import { useEffect } from "react";
import { fetchAllPurchased, refreshCache, removePurchasedProduct } from "@/api/purchased";
import { fetchData } from "@/util/fetchData";
import usePurchasedStore from "@/store/pages/purchasedStore";
import PuchasedCards from "./cards";
import RemoveAction from "@/components/shared/remove";
import Title from "../shared/title";

export default function PurchasedComponents() {
    /*---> States (Zustand) <---*/
    const {
        purchaseds, setPurchaseds,
        loading, setLoading,
        popUp, setPopUp
    } = usePurchasedStore()

    /*---> Functions <---*/
    const deleteProduct = async (id: string | null): Promise<void> => {
        try {
            const response = await removePurchasedProduct(id);
            if (response?.message === 'Purchesed product deleted successfully!') {
                toast?.success(response?.message);
                setPopUp?.({ remove: false, id: '' });
                refreshCache() // Clears the cache to fetch new data.
                await fetchData(fetchAllPurchased, setPurchaseds, "Error get all products :");
            }
        } catch (error) {
            console?.error("Error remove purchased product : ", error)
        }
    }

    /*---> Effects <---*/
    useEffect(() => {
        fetchData(fetchAllPurchased, setPurchaseds, "Error get all products :")
        setLoading(false)
    }, [setPurchaseds, setLoading])
    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                {/* <!-- Title/Description of the page --> */}
                <Title title="Purchased" description="Welcome back, here’s an overview of your purchased products." />
                {/* <!-- Product cards --> */}
                <PuchasedCards purchaseds={purchaseds} loading={loading} setPopUp={setPopUp} />
            </div>
        </section>
        {/* <!-- Message --> */}
        <div className='w-full py-5 flex justify-center bottom-0 absolute'>
            <Toaster position="bottom-right" expand={true} />
        </div>
        {/* <!-- Remove Purchased Product --> */}
        <RemoveAction title="purchased" popUp={popUp} setPopUp={setPopUp} method={deleteProduct} />
    </>
}