import { Button } from "@/components/shared/chadcn/ui/button"
import { FaUser } from "react-icons/fa6"
import { ordersTypes, popUpTypes } from "@/types"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';

export default function PuchasedCards(props: {
    purchaseds: ordersTypes
    loading: boolean
    setPopUp?: (popUp: popUpTypes) => void,
}) {
    const { purchaseds, loading, setPopUp } = props

    return <>
        {loading ? (
            <iframe src="https://lottie.host/embed/95e591bc-3837-452b-9a4b-77ec3c873cc7/fEh9CBsGi6.lottie"></iframe>
        ) : (
            <div className="w-full flex flex-wrap justify-between sm:gap-5 lg:gap-4">
                {purchaseds && purchaseds?.data?.length > 0 ? (
                    purchaseds?.data?.map((product) => (
                        <div key={product?._id} className="w-full sm:w-[48.5%] md:max-w-[550px] lg:w-full xl:w-[49%] flex flex-col lg:flex-row bg-white rounded-lg shadow-lg">
                            <div className="w-full lg:w-[45%] h-96 sm:h-64 lg:h-full">
                                <Swiper
                                    modules={[Autoplay]}
                                    slidesPerView={1}
                                    autoplay={{ delay: 3000 }}
                                    speed={500}>
                                    {product?.products?.map((productInfo) =>
                                        productInfo?.productId?.pictures?.map((img, index: number) => (
                                            <SwiperSlide key={index} className="w-full h-full relative">
                                                 <Image width={500} height={100} priority={true} src={img} alt="product-picture" />
                                            </SwiperSlide>
                                        ))
                                    )}
                                </Swiper>
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
                                            setPopUp?.({ remove: true, id: product?._id ?? null })
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
    </>
}