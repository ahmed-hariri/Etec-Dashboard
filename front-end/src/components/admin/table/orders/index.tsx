import { ordersTypes } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/chadcn/ui/table"
import TableMessage from "../message";
import { Button } from "@/components/chadcn/ui/button"
import { changeOrderState } from "@/api/orders";

export default function TableOrders(props: { tableHead: string[], orders: ordersTypes }) {
    const { tableHead, orders } = props;

    const changeOrder = async (id: string | null, status: string) => {
        try {
            const repsonse = await changeOrderState(id, status)
            console?.log(repsonse)
        } catch (error) {
            console?.error("Error change order : ", error)
        }
    }

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
                {orders && orders?.data?.length > 0 ? (
                    orders?.data?.map((order) => (
                        <TableRow key={order?._id} className="text-center">
                            <TableCell className="font-medium">{order?._id}</TableCell>
                            <TableCell>{order?.userId?.fullName}</TableCell>
                            <TableCell>
                                <div className="flex justify-center gap-3">
                                    {order?.products && order?.products?.map((product, index: number) => (
                                        <h1 key={index}>{product?.productId}</h1>
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center gap-3">
                                    {order?.products && order?.products?.map((quantity, index: number) => (
                                        <h1 key={index}>{quantity?.quantity}</h1>
                                    ))}
                                </div>
                            </TableCell>
                            <TableCell className="flex justify-center">
                                <h1 className={`px-[12px] py-[3px] ${order?.status === "Shipped" && "bg-[#dbeafe] text-[#1e40af]"} ${order?.status === "Processing" && "bg-[#fef9c3] text-[#854d0e]"} rounded-full text-[13px]`}>
                                    {order?.status}
                                </h1>
                            </TableCell>
                            <TableCell>{order?.createdAt ?? ''}</TableCell>
                            <TableCell>${order?.totalPrice}.00</TableCell>
                            <TableCell className="flex justify-center items-center gap-3">
                                {['Processing', 'Shipped', 'Delivered']?.map((item, index) => (
                                    <Button key={index} className="px-[12px] py-[6px]" onClick={() => changeOrder(order?._id ?? null, item)}>
                                        {item}
                                    </Button>
                                ))}
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableMessage colSpan={8} content="You dont have orders!" />
                )}
            </TableBody>
        </Table>
    </>
}