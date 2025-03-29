import { Input } from "@/components/shared/chadcn/ui/input"
import { Label } from "@/components/shared/chadcn/ui/label"
import { Button } from "@/components/shared/chadcn/ui/button"
import Image from "next/image"
import { IoMdRemoveCircle } from "react-icons/io"
import { inputs } from "@/data"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from "@/components/shared/chadcn/ui/select"
import { productComponentsTypes } from "@/types"
import { Textarea } from "@/components/shared/chadcn/ui/textarea"

export default function ProductForm(props: Partial<productComponentsTypes>) {
    const {
        product, setProduct,
        pictureValue, onChange,
        pictureAction, onCreateProduct,
        categories, loading
    } = props

    return <>
        <div className="w-full flex flex-col gap-3">
            {/* <!-- Inputs (Name / Price / Pictures) --> */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                {inputs && inputs?.slice(0, 3)?.map((input, index) => (
                    /* <!-- Condition rendring --> */
                    input?.inputName === "pictures" ? (
                        <div key={index} className="w-full flex flex-col gap-2">
                            <Label htmlFor={input?.inputName} className="text-[16px]">{input?.inputLabel}</Label>
                            <div className="w-full flex flex-col lg:flex-row gap-4">
                                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                                    {/* <!-- Add new picture --> */}
                                    <Input type={input?.type} id={input?.inputName} placeholder={input?.placeHolder} name={input?.inputName} onChange={onChange} value={pictureValue} />
                                    <Button className="w-full py-[24px] text-[15px]" onClick={() => pictureAction?.("addNewPicture")}>
                                        Add new picture
                                    </Button>
                                </div>
                                {/* <!-- All pictures --> */}
                                <div className={`w-full lg:w-1/2 flex items-center gap-5 ${product?.pictures?.length === 0 && "h-24 justify-center border border-dashed border-gray-400 rounded-md"}`}>
                                    {(product?.pictures ?? [])?.length > 0 ? (
                                        product?.pictures?.map((picture, index) => (
                                            <div key={index} className="w-[125px] h-[120px] flex justify-end p-2 rounded-md bg-white shadow-md relative">
                                                <Image src={picture} width={140} height={130} alt="newPicture" />
                                                <IoMdRemoveCircle className="text-[22px] cursor-pointer absolute" onClick={() => pictureAction?.("removePicture", index)} />
                                            </div>
                                        ))
                                    ) : (
                                        <h1 className="font-[600] text-xl lg:text-lg">You dont have any pictures</h1>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div key={index} className="w-full lg:w-[49%] flex flex-col gap-2">
                            <Label htmlFor={input?.inputName} className="text-[16px]">{input?.inputLabel}</Label>
                            <Input type={input?.type} id={input?.inputName} placeholder={input?.placeHolder} name={input?.inputName} onChange={onChange} value={product?.[input?.inputName] ?? ""} />
                        </div>
                    )
                ))}
            </div>
            {/* <!-- Inputs (Description / Categorie) --> */}
            <div className="flex flex-col sm:flex-row gap-3">
                {inputs && inputs?.slice(3, 6)?.map((input, index) => (
                    <div key={index} className="w-full lg:w-1/2 flex flex-col gap-2">
                        <Label htmlFor={input?.inputName} className="text-[16px]">{input?.inputLabel}</Label>
                        {input?.inputName !== 'description' && <Input type={input?.type} id={input?.inputName} placeholder={input?.placeHolder} name={input?.inputName} onChange={onChange} value={product?.[input?.inputName] ?? ""} />}
                        {input?.inputName === 'description' && <Textarea placeholder="Type your description here." rows={4} className="resize-none" name="description" onChange={onChange} value={product?.[input?.inputName] ?? ""} />}
                    </div>
                ))}
                <div className="w-full lg:w-1/2 flex flex-col justify-between gap-3 lg:gap-0">
                    {/* <!-- Options --> */}
                    <div className="w-full flex flex-col gap-2">
                        <Label htmlFor="categorys" className="text-[16px]">Category</Label>
                        <Select disabled={loading?.showProducts || categories?.data?.length === 0} name="categorys" onValueChange={(value) => setProduct?.({categoryId: value })}>
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
                    <div className="w-full flex flex-col gap-2">
                        <Button className="py-[24px] text-[15px]" onClick={onCreateProduct} disabled={loading?.newProduct}>
                            {loading?.newProduct ? (
                                <div className="w-5 h-5 border-l rounded-full duration-700 animate-spin"></div>
                            ) : (
                                "Create Product"
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </>
};