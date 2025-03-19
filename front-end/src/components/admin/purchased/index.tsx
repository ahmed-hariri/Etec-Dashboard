"use client"

import Title from "../../shared/title";
import { toast, Toaster } from "sonner";
import { Button } from "@/components/shared/chadcn/ui/button"
import { useEffect, useState } from "react";
import Image from "next/image";
import { fetchAllPurchased, refreshCache, removePurchasedProduct } from "@/api/purchased";
import { ordersTypes } from "@/types";
import { FaUser } from "react-icons/fa";

export default function PurchasedComponents() {
    /*---> States <---*/
    const [purchaseds, setPurchaseds] = useState<ordersTypes>({ data: [] })
    const [loading, setLoading] = useState<boolean>(true)
    const [popUp, setPopUp] = useState<{ remove: boolean, productId: string | null }>({ remove: false, productId: null })

    /*---> Functions <---*/
    const getAllProducts = async (): Promise<void> => {
        try {
            const response = await fetchAllPurchased();
            setPurchaseds(response ?? []);
        } catch (error) {
            console?.error("Error get all purchased products : ", error)
        } finally {
            setLoading(false)
        }
    }
    const deleteProduct = async (id: string | null): Promise<void> => {
        try {
            const response = await removePurchasedProduct(id);
            if (response?.message === 'Purchesed product deleted successfully!') {
                toast?.success(response?.message);
                setPopUp({ remove: false, productId: '' });
                refreshCache()
                await getAllProducts();
            }
        } catch (error) {
            console?.error("Error remove purchased product : ", error)
        }
    }

    /*---> Effects <---*/
    useEffect(() => {
        getAllProducts()
    }, [])
    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Purchased" paragraphe="Welcome back, here’s an overview of your purchased products." />
                {/* <!-- Product cards --> */}
                {loading ? (
                    <iframe src="https://lottie.host/embed/95e591bc-3837-452b-9a4b-77ec3c873cc7/fEh9CBsGi6.lottie"></iframe>
                ) : (
                    <div className="w-full flex flex-wrap justify-between sm:gap-5 lg:gap-4">
                        {purchaseds && purchaseds?.data?.length > 0 ? (
                            purchaseds?.data?.map((product) => (
                                <div key={product?._id} className="w-full sm:w-[48.5%] md:max-w-[550px] lg:w-full xl:w-[49%] flex flex-col lg:flex-row bg-white rounded-lg shadow-lg">
                                    <div className="w-full lg:w-[45%] h-96 lg:h-full">
                                        {product?.products?.map((item, index: number) => (
                                            <Image key={index} width={500} height={500} src={`${item?.productId?.picture ?? ""}`} alt="product-picture" className="w-full h-full object-cover" />
                                        ))}
                                    </div>
                                    <div className="w-full lg:w-[55%] h-full p-4 flex flex-col justify-between">
                                        <div className="flex flex-col gap-3">
                                            {/* <!-- Categorie / Remove product --> */}
                                            <div className="w-full flex justify-between items-center gap-2">
                                                {product?.products?.map((item, index: number) => (
                                                    <h1 key={index} className="px-3 py-[3px] border border-black rounded-full text-sm">
                                                        {item?.productId?.categoryId?.categoryName ?? "not found"}
                                                    </h1>
                                                ))}
                                                <Button className="h-auto px-[10px] py-[5px] text-[13px]" onClick={() => {
                                                    setPopUp(() => ({ remove: true, productId: product?._id ?? null }))
                                                }}>
                                                    Remove
                                                </Button>
                                            </div>
                                            {/* <!-- Client information --> */}
                                            <div className="flex gap-2 items-center font-bold">
                                                <div className="p-2 border border-black rounded-full">
                                                    <FaUser className="text-[13px]" />
                                                </div>
                                                <h1>{product?.userId?.email}</h1>
                                            </div>
                                            {/* <!-- Product information --> */}
                                            <div className="flex flex-col gap-2">
                                                <div className="w-full flex justify-between items-center mt-1">
                                                    {product?.products?.map((item, index: number) => (
                                                        <h1 key={index} className="text-lg font-bold">{item?.productId?.name}</h1>
                                                    ))}
                                                    <div className="text-[13.8px]">{product?.products?.map((item, index: number) => (
                                                        <h1 key={index}>{item?.productId?.price} $</h1>
                                                    ))}
                                                    </div>
                                                </div>
                                                <div className="w-full overflow-scroll" style={{ scrollbarWidth: "none" }}>
                                                    <div className="text-[13.8px]">{product?.products?.map((item, index: number) => (
                                                        <p key={index}>{item?.productId?.description}</p>
                                                    ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <!-- Total Price / Quantity --> */}
                                        <div className="flex justify-between items-center font-bold">
                                            <h1>Total : {product?.totalPrice} $</h1>
                                            <div>{product?.products?.map((item, index: number) => (
                                                <h1 key={index}>Quantity: {item?.quantity}</h1>
                                            ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full text-center py-5 text-[20px] font-bold">
                                <h1>You dont hav purchased products</h1>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
        <div className='w-full py-5 flex justify-center bottom-0 absolute'>
            <Toaster position="bottom-right" expand={true} />
        </div>
        {popUp?.remove && (
            <div className="w-full h-screen backdrop-blur-sm fixed flex justify-center items-center">
                <div className="p-4 rounded-lg bg-black flex flex-col gap-5 text-white shadow-lg">
                    <h1 className="text-lg font-[600]">You want remove this products!</h1>
                    <div className="ml-40 flex gap-3">
                        {[
                            { name: 'Remove', style: 'text-[17px] bg-red-500 text-white' },
                            { name: 'Cancel', style: 'text-[17px] bg-white text-black hover:text-white' }
                        ]?.map((item, index) => (
                            <Button key={index} className={`${item?.style}`} onClick={() => {
                                if (item?.name === 'Cancel') {
                                    setPopUp(() => ({ remove: false, productId: null }))
                                } else {
                                    deleteProduct(popUp?.productId ?? null)
                                }
                            }}>
                                {item?.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </>
}