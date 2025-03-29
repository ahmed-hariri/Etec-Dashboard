import { Input } from "@/components/shared/chadcn/ui/input"
import { Label } from "@/components/shared/chadcn/ui/label"
import { Button } from "@/components/shared/chadcn/ui/button"
import Image from "next/image"
import { IoMdRemoveCircle } from "react-icons/io"
import { inputs } from "@/data"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/shared/chadcn/ui/select"
import { productComponentsTypes } from "@/types"
import { Textarea } from "@/components/shared/chadcn/ui/textarea"

export default function ProductAction(props: Partial<productComponentsTypes>) {
    const {
        type, popUp, setPopUp, product, setProduct,
        onChange, pictureAction, pictureMethod,
        categories, loading
    } = props

    return <>
        {/* <!-- Remove product --> */}
        {type === "remove" && popUp?.remove && (
            <div className="w-full h-screen backdrop-blur-sm fixed flex justify-center items-center z-50">
                <div className="p-4 rounded-lg bg-[#f9f9f9] flex flex-col gap-5 text-black shadow-lg">
                    <h1 className="text-lg font-[600]">You want remove this products!</h1>
                    <div className="ml-40 flex gap-3">
                        {['Remove', 'Cancel']?.map((item, index) => (
                            <Button key={index} className="text-[17px]" onClick={() => {
                                if (item === 'Cancel') {
                                    setPopUp?.({ remove: false, productId: null })
                                } else {
                                    pictureMethod?.(popUp?.productId ?? null)
                                }
                            }}>
                                {item}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        )}
        {/* <!-- Modify product --> */}
        {type === "modify" && popUp?.modify && (
            <div className="w-full h-screen backdrop-blur-sm fixed flex justify-center items-center px-5 lg:px-0 z-50">
                <div className="w-full lg:max-w-[900px]">
                    <div className="w-full p-5 rounded-lg bg-[#f9f9f9] flex flex-col gap-5 text-black shadow-lg">
                        <h1 className="text-xl font-[600]">You want update this products!</h1>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-3">
                                {inputs && inputs?.slice(0, 3)?.map((input, index) => (
                                    /* <!-- Condition rendring --> */
                                    input?.inputName === "pictures" ? (
                                        <div key={index} className="w-full flex flex-col gap-2">
                                            <Label htmlFor={input?.inputName} className="text-[16px]">{input?.inputLabel}</Label>
                                            <div className="w-full flex gap-4">
                                                <div className="w-1/2 flex flex-col gap-4">
                                                    {/* <!-- Add new picture --> */}
                                                    <Input type={input?.type} id={input?.inputName} placeholder={input?.placeHolder} name={input?.inputName} onChange={onChange} />
                                                    <Button className="w-full py-[24px] text-[15px]" onClick={() => pictureAction?.("addNewPicture")}>
                                                        Add new picture
                                                    </Button>
                                                </div>
                                                {/* <!-- All pictures --> */}
                                                <div className={`w-1/2 flex items-center gap-2 ${product?.pictures?.length === 0 && "justify-center border border-dashed border-gray-400 rounded-md"}`}>
                                                    {(product?.pictures ?? [])?.length > 0 ? (
                                                        product?.pictures?.map((picture, index) => (
                                                            <div key={index} className="w-[120px] h-[115px] flex justify-end p-2 rounded-md bg-white shadow-md relative">
                                                                <Image src={picture} width={140} height={130} alt="newPicture" />
                                                                <IoMdRemoveCircle className="text-[22px] cursor-pointer absolute" onClick={() => pictureAction?.("removePicture", index)} />
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <h1 className="font-[600] text-lg">You dont have any pictures</h1>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div key={index} className="w-full flex flex-col gap-2">
                                            <Label htmlFor={input?.inputName} className="text-[16px]">{input?.inputLabel}</Label>
                                            <Input type={input?.type} id={input?.inputName} placeholder={input?.placeHolder} name={input?.inputName} onChange={onChange} value={product?.[input?.inputName] ?? ""} />
                                        </div>
                                    )
                                ))}
                            </div>
                            <div className="flex flex-col lg:flex-row gap-3">
                                {/* <!-- Inputs --> */}
                                {inputs && inputs?.slice(3, 6)?.map((item, index) => (
                                    <div key={index} className="w-full lg:w-1/2 flex flex-col gap-2">
                                        <Label htmlFor={item?.inputName} className="text-[16px]">{item?.inputLabel}</Label>
                                        {item?.inputName !== 'description' && <Input type={item?.type} id={item?.inputName} placeholder={item?.placeHolder} name={item?.inputName} onChange={onChange} value={product?.[item?.inputName] ?? ""} />}
                                        {item?.inputName === 'description' && <Textarea placeholder="Type your description here." rows={4} className="resize-none" name="description" onChange={onChange} value={product?.[item?.inputName] ?? ""} />}
                                    </div>
                                ))}
                                {/* <!-- Options --> */}
                                <div className="w-full lg:w-1/2 flex flex-col justify-between gap-3 lg:gap-0">
                                    <div className="w-full flex flex-col gap-2">
                                        <Label htmlFor="categorys" className="text-[16px]">Category</Label>
                                        <Select disabled={loading?.showProducts || categories?.data?.length === 0} name="categorys" onValueChange={(value) => setProduct?.((prevState) => ({ ...prevState, categoryId: value }))}>
                                            <SelectTrigger className="w-full">
                                                {loading?.showProducts ? (
                                                    <SelectValue placeholder="Loading Categories..." />
                                                ) : (
                                                    <SelectValue placeholder={categories?.data?.length ? "Select a Category" : "No Categories Available"} />
                                                )}
                                            </SelectTrigger>
                                            <SelectContent aria-disabled>
                                                <SelectGroup>
                                                    {categories?.data?.map((category, index) => (
                                                        <SelectItem key={index} value={`${category?._id}`}>
                                                            {category?.categoryName}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {/* <!-- Button --> */}
                                    <div className="w-full flex flex-col lg:flex-row justify-between gap-2">
                                        {['Modify', 'Cancel']?.map((item, index) => (
                                            <Button key={index} className="w-full lg:w-1/2 py-[24px] text-[17px] hover:text-white" onClick={() => {
                                                if (item === 'Cancel') {
                                                    setPopUp?.({ modify: false, productId: null })
                                                } else {
                                                    pictureMethod?.(popUp?.productId ?? null)
                                                }
                                            }}>
                                                {item}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
        }
    </>
};