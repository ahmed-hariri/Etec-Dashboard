import { Button } from "@/components/chadcn/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/chadcn/ui/table"

export default function TableAdmin(props: { tableHead: string[], contents?: any[], type: string }) {
    const { tableHead, contents, type } = props

    return <>
        <Table className="rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-100">
                <TableRow className="border-b border-gray-300">
                    {tableHead && tableHead?.map((head, index) => (
                        <TableHead key={index} className="text-center">{head}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {type === "dashboard" && contents?.map((content) => (
                    <TableRow key={content?._id} className="text-center">
                        <TableCell className="font-medium">{content?._id}</TableCell>
                        <TableCell>{content?.userId?.fullName}</TableCell>
                        <TableCell>
                            <div className="flex justify-center gap-3">
                                {content?.products && content?.products?.map((product: any, index: number) => (
                                    <h1 key={index}>{product?.productId}</h1>
                                ))}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex justify-center gap-3">
                                {content?.products && content?.products?.map((quantity: any, index: number) => (
                                    <h1 key={index}>{quantity?.quantity}</h1>
                                ))}
                            </div>
                        </TableCell>
                        <TableCell className="flex justify-center">
                            <h1 className={`px-[12px] py-[3px] ${content?.status === "Shipped" && "bg-[#dbeafe] text-[#1e40af]"} ${content?.status === "Processing" && "bg-[#fef9c3] text-[#854d0e]"} rounded-full text-[13px]`}>
                                {content?.status}
                            </h1>
                        </TableCell>
                        <TableCell>{content?.createdAt ?? ''}</TableCell>
                        <TableCell>${content?.totalPrice}.00</TableCell>
                    </TableRow>
                ))}
                {type === "products" && contents?.map((content) => (
                    <TableRow key={content?._id} className="text-center">
                        <TableCell className="font-medium">{content?._id}</TableCell>
                        <TableCell>{content?.name}</TableCell>
                        <TableCell>{content?.description}</TableCell>
                        <TableCell>${content?.price}.00</TableCell>
                        <TableCell>{content?.picture}</TableCell>
                        <TableCell>{content?.categoryId?.categoryName}</TableCell>
                        <TableCell className="flex justify-center gap-3">
                            <Button className="bg-green-500 px-[12px] py-[6px]">
                                Modify
                            </Button>
                            <Button className="bg-red-500 px-[12px] py-[6px]">
                                Remove
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
                {type === "categorie" && contents?.map((content) => (
                    <TableRow key={content?._id} className="text-center">
                        <TableCell className="font-medium">{content?._id}</TableCell>
                        <TableCell>{content?.categoryName}</TableCell>
                        <TableCell className="flex justify-center gap-3">
                            <Button className="bg-green-500 px-[12px] py-[6px]">
                                Modify
                            </Button>
                            <Button className="bg-red-500 px-[12px] py-[6px]">
                                Remove
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </>
}