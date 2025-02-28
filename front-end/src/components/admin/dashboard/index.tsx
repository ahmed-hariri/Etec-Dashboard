import Title from "../title";
import { Component } from "@/components/chadcn/chart";
import { ordersTypes } from "@/types";
import { cards, chartData } from "@/data";
import Link from "next/link";
import TableOrders from "../table/orders";

export default function DashboardComponents() {
    /*---> States <---*/
    const orders: ordersTypes[] = [
        { _id: "0", userId: { fullName: "Ahmed Hariri", email: "Ahmedhariri58@gmail.com" }, products: [{ productId: "0", quantity: 5 }], status: 'Processing', createdAt: '2025-10-30', totalPrice: 23 },
        { _id: "1", userId: { fullName: "Ahmed Hariri", email: "Ahmedhariri58@gmail.com" }, products: [{ productId: "1", quantity: 5 }], status: 'Processing', createdAt: '2025-04-03', totalPrice: 45 },
        { _id: "2", userId: { fullName: "Ahmed Hariri", email: "Ahmedhariri58@gmail.com" }, products: [{ productId: "2", quantity: 5 }], status: 'Shipped', createdAt: '2025-01-28', totalPrice: 203 }
    ];

    return <>
        <section className="w-full lg:w-[80%] px-8 pt-5 flex justify-center">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Dashboard" paragraphe="Welcome back, here's your order overview." />
                <div className="w-full flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-between items-center gap-3 lg:gap-5">
                    {cards && cards?.map((card, index) => (
                        <Link href={`/admin/${card?.title?.toLocaleLowerCase()}`} key={index} className="w-full sm:w-[49%] lg:w-[25%] flex justify-between items-center cursor-pointer gap-[135px] py-[21px] px-[24px] rounded-xl hover:shadow-xl duration-500 border border-[#e3e2e2]">
                            <div className="flex flex-col justify-center gap-1">
                                <h1 className="text-gray-600 text-[15px] font-[600]">{card?.title}</h1>
                                <h1 className="text-[25px] font-[700]">{card?.number}</h1>
                            </div>
                            <card.icon className="text-2xl text-gray-600" />
                        </Link>
                    ))}
                </div>
                <div className="w-full flex flex-wrap sm:flex-nowrap gap-5">
                    <Component chartTitle="Oders" chartData={chartData} />
                    <Component chartTitle="Clients" chartData={chartData} />
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-2xl font-[600]">Recent Orders</h1>
                    <TableOrders
                        tableHead={['Order ID', 'Customer', 'Products', 'Quantity', 'Status', 'Date', "Total", 'Action']}
                        orders={orders}
                    />
                </div>
            </div>
        </section>
    </>
}