import { ordersTypes } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shared/chadcn/ui/table"
import TableMessage from "../message";
import { Button } from "@/components/shared/chadcn/ui/button"
import { changeOrderState, fetchAllOrders } from "@/api/orders";
import { useEffect, useState } from "react";

export default function TableOrders(props: { tableHead: string[], ordersData: ordersTypes, fetchData: boolean }) {
    const { tableHead, ordersData, fetchData } = props;
    const [orders, setOrders] = useState<ordersTypes>(ordersData)
    const [loading, setLoading] = useState<boolean>(true)

    /*---> Functions <---*/
    const getAllOrders = async (): Promise<void> => {
        try {
            const response = fetchData ? await fetchAllOrders() : ordersData
            setOrders(response ?? []);
        } catch (error) {
            console?.error("Error get all orders : ", error)
        } finally {
            setLoading(false)
        }
    }
    const changeOrder = async (id: string | null, newStatus: { status: string }) => {
        try {
            const response = await changeOrderState(id, newStatus)
            if (response?.message) {
                console?.log(response?.message)
                await getAllOrders()
            }
        } catch (error) {
            console?.error("Error change order : ", error)
        }
    }

    /*---> Effects <---*/
    useEffect(() => {
        getAllOrders()
    }, [])
    return <>
        {loading && fetchData ? (
            <iframe src="https://lottie.host/embed/95e591bc-3837-452b-9a4b-77ec3c873cc7/fEh9CBsGi6.lottie"></iframe>
        ) : (
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
                                {/* <!-- Client information --> */}
                                <TableCell>{order?.userId?.fullName}</TableCell>
                                {/* <!-- Product information --> */}
                                <TableCell>
                                    <div className="flex justify-center gap-3">
                                        {order?.products && order?.products?.map((product, index: number) => (
                                            <h1 key={index}>{product?.productId?.name}</h1>
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
                                {/* <!-- Order status --> */}
                                <TableCell className="flex justify-center">
                                    <h1 className={`px-[12px] py-[3px] ${order?.status === "Shipped" && "bg-[#dbeafe] text-[#1e40af]"} ${order?.status === "Processing" && "bg-[#fef9c3] text-[#854d0e]"} rounded-full text-[13px]`}>
                                        {order?.status}
                                    </h1>
                                </TableCell>
                                <TableCell>{order?.createdAt ?? ''}</TableCell>
                                {/* <!-- Total Price  --> */}
                                <TableCell>{order?.totalPrice}$</TableCell>
                                {/* <!-- Order actions --> */}
                                <TableCell className="flex justify-center items-center gap-3">
                                    {['Processing', 'Shipped', 'Delivered']?.map((item, index) => (
                                        item !== order?.status && (
                                            <Button key={index} className="px-[12px] py-[6px]" onClick={() => changeOrder(order?._id ?? null, { status: item })}>
                                                {item}
                                            </Button>
                                        )
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableMessage colSpan={8} content="You dont have orders!" />
                    )}
                </TableBody>
            </Table>
        )}
    </>
}