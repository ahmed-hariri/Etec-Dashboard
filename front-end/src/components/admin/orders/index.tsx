"use client"

import Title from "../../shared/title";
import { ordersTypes } from "@/types";
import { Toaster } from "sonner";
import TableOrders from "../../shared/table/orders";
import { fetchAllOrders } from "@/api/orders";
import { useEffect, useState } from "react";

export default function OrdersComponents() {
    /*---> States <---*/
    const [orders, setOrders] = useState<ordersTypes>({ data: [] });

    /*---> Functions <---*/
    const getAllOrders = async (): Promise<void> => {
        try {
            const response = await fetchAllOrders();
            setOrders(response ?? []);
        } catch (error) {
            console?.error("Error get all orders : ", error)
        }
    }

    /*---> Effects <---*/
    useEffect(() => {
        getAllOrders()
    }, [])
    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Orders" paragraphe="Welcome back, here’s an overview of your orders." />
                {/* <!-- Table Products --> */}
                <TableOrders
                    tableHead={['Order ID', 'Customer', 'Products', 'Quantity', 'Status', 'Date', "Total", 'Action']}
                    ordersData={orders}
                    fetchData={true}
                />
            </div>
        </section>
        <div className='w-full py-5 flex justify-center bottom-0 absolute'>
            <Toaster position="bottom-right" expand={true} />
        </div>
    </>
}