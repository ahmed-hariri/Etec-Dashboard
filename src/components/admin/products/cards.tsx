import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import { productCardsComponentsTypes } from '@/types';
import { Button } from '@/components/shared/chadcn/ui/button';

export default function ProductCards(props: productCardsComponentsTypes) {
    const {
        loading, products,
        handelProduct, setPopUp,
        isUrl
    } = props
    
    return <>
        {loading?.showProducts ? (
            <iframe src="https://lottie.host/embed/95e591bc-3837-452b-9a4b-77ec3c873cc7/fEh9CBsGi6.lottie"></iframe>
        ) : (
            <div className="w-full flex flex-wrap justify-between sm:gap-5 lg:gap-4 -z-10 lg:z-auto">
                {products && products?.data?.length > 0 ? (
                    products?.data?.map((product) => (
                        <div key={product?._id} className="w-full sm:w-[48.5%] md:max-w-[550px] lg:w-full lg:h-[280px] xl:w-[49%] overflow-hidden flex flex-col lg:flex-row bg-white rounded-lg shadow-lg">
                            <div className="w-full lg:w-[45%] h-96 sm:h-64 lg:h-full">
                                <Swiper
                                    modules={[Autoplay]}
                                    slidesPerView={1}
                                    autoplay={{ delay: 3000 }}
                                    speed={500}>
                                    {product?.pictures?.map((picture, index: number) => (
                                        <SwiperSlide key={index} className="w-full h-full pr-2">
                                            {/* priority={true} ensures the image loads first, improving page speed for images above the fold */}
                                            <Image width={500} height={100} priority={true} src={`${isUrl(picture)}`} alt="product-picture" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            <div className="w-full lg:w-[55%] h-full p-4 flex flex-col gap-3">
                                <div className="w-full flex justify-between items-center">
                                    <h1 className="px-3 py-[3px] border border-black rounded-full text-sm">{product?.categoryId?.categoryName ?? "not found"}</h1>
                                    <div className="flex items-center gap-2">
                                        {['Modify', 'Remove']?.map((item, index) => (
                                            <Button key={index} className="h-auto px-[10px] py-[5px] text-[13px]" onClick={() => {
                                                if (item === 'Modify') {
                                                    handelProduct(product?._id ?? null)
                                                } else {
                                                    setPopUp?.({ remove: true, productId: product?._id ?? null })
                                                }
                                            }}>
                                                {item}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                                <div className="w-full flex justify-between items-center mt-3">
                                    <h1 className="text-lg font-bold">{product?.name}</h1>
                                    <h1>{product?.price} $</h1>
                                </div>
                                <div className="w-full overflow-scroll" style={{ scrollbarWidth: "none" }}>
                                    <p className="text-[13.8px]">{product?.description}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full text-center py-4 text-[25px] font-bold">
                        <h1>You dont have any products</h1>
                    </div>
                )}
            </div>
        )}
    </>
}