import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/chadcn/ui/table"

export default function TableAdmin(props: { tableHead: string[], contents: any[] }) {
    const { tableHead, contents } = props

    return <>
        <Table className="rounded-lg overflow-hidden">
            <TableHeader className="bg-gray-100">
                <TableRow className="border-b border-gray-300">
                    {tableHead && tableHead?.map((head, index) => (
                        <TableHead key={index} className={`${head === "Total" ? "text-right" : ""}`}>{head}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {contents && contents?.map((content) => (
                    <TableRow key={content?._id}>
                        <TableCell className="font-medium">{content?._id}</TableCell>
                        <TableCell>{content?.userId?.fullName}</TableCell>
                        <TableCell>
                            <div className="flex gap-3">
                                {content?.products && content?.products?.map((product: any, index: number) => (
                                    <h1 key={index}>{product?.productId}</h1>
                                ))}
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex gap-3">
                                {content?.products && content?.products?.map((quantity: any, index: number) => (
                                    <h1 key={index}>{quantity?.quantity}</h1>
                                ))}
                            </div>
                        </TableCell>
                        <TableCell className="flex justify-start">
                            <h1 className={`px-[12px] py-[3px] ${content?.status === "Shipped" && "bg-[#dbeafe] text-[#1e40af]"} ${content?.status === "Processing" && "bg-[#fef9c3] text-[#854d0e]"} rounded-full text-[13px]`}>
                                {content?.status}
                            </h1>
                        </TableCell>
                        <TableCell>{content?.createdAt ?? ''}</TableCell>
                        <TableCell className="text-right">${content?.totalPrice}.00</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </>
}