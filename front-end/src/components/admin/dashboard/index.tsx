"use client"

import Title from "../../shared/title";
import { Component } from "@/components/shared/chadcn/chart";
import { chartData } from "@/data";
import Link from "next/link";
import TableOrders from "../../shared/table/orders";
import { PiPackageBold } from "react-icons/pi";
import { GrDeliver } from "react-icons/gr";
import { FaStore } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import React, { useEffect } from "react";
import { fetchAllProducts } from "@/api/product";
import { fetchAllOrders } from "@/api/orders";
import { fetchAllPurchased } from "@/api/purchased";
import { fetchAllClients } from "@/api/clients";
import { fetchData } from "@/util/fetchData";
import useDashboardStore from "@/store/pages/dashboardStore";

export default function DashboardComponents() {
    /*---> States (Zustand) <---*/
    const {
        products, setProducts,
        orders, setOrders,
        purchased, setPurchased,
        clients, setClients,
        loading, setLoading
    } = useDashboardStore()
    const cards: { title: string, number: number, icon: React.ElementType }[] = [
        { title: "Products", number: products?.data?.length, icon: PiPackageBold },
        { title: "Orders", number: orders?.data?.length, icon: GrDeliver },
        { title: "Purchased", number: purchased?.data?.length, icon: FaStore },
        { title: "Clients", number: clients?.data?.length, icon: FaUsersLine }
    ]

    /*---> Effects <---*/
    useEffect(() => {
        Promise?.allSettled([
            fetchData(fetchAllProducts, setProducts, "Error get all products : "),
            fetchData(fetchAllOrders, setOrders, "Error get all orders : "),
            fetchData(fetchAllPurchased, setPurchased, "Error get all products : "),
            fetchData(fetchAllClients, setClients, "Error get all clients : "),
        ]).finally(() => setLoading(false))
    }, [setProducts, setOrders, setPurchased, setClients, setLoading])
    return <>
        <section className="w-full lg:w-[80%] px-8 pt-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Dashboard" paragraphe="Welcome back, here's your order overview." />
                {/* <!-- Table Information (Porducts / Orders / Puchased s/ Clients) */}
                <div className="w-full flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-between items-center gap-3 lg:gap-5">
                    {loading ? (
                        new Array(4)?.fill(0)?.map((v, index) => (
                            <div key={index} className="w-full sm:w-[49%] lg:w-[25%] animate-pulse flex justify-between items-center gap-[80px] sm:gap-0 py-[21px] px-[24px] rounded-xl border border-[#ddd]">
                                <div className="flex flex-col justify-center items-start gap-[32px]">
                                    <div className="px-14 lg:px-9 xl:px-14 py-2 rounded-full bg-[#ddd]"></div>
                                    <div className="px-4 py-2 rounded-full bg-[#ddd]"></div>
                                </div>
                                <div className="p-4 rounded-full bg-[#ddd]"></div>
                            </div>
                        ))
                    ) : (
                        cards?.map((card, index) => (
                            <Link href={`/admin/${card?.title?.toLocaleLowerCase()}`} key={index} className="w-full sm:w-[49%] lg:w-[25%] flex justify-between items-center cursor-pointer gap-[135px] sm:gap-0 py-[21px] px-[24px] rounded-xl hover:shadow-xl duration-500 border border-[#e3e2e2]">
                                <div className="flex flex-col justify-center gap-1">
                                    <h1 className="text-gray-600 text-[15px] font-[600]">{card?.title}</h1>
                                    <h1 className="text-[25px] font-[700]">{card?.number}</h1>
                                </div>
                                <div>
                                    <card.icon className="text-[27px] text-gray-600" />
                                </div>
                            </Link>
                        ))
                    )}
                </div>
                {/* <!-- Chart Data --> */}
                <div className="w-full flex flex-wrap sm:flex-nowrap gap-5">
                    <Component chartTitle="Oders" chartData={chartData} />
                    <Component chartTitle="Clients" chartData={chartData} />
                </div>
                {/* <!-- Table Orders --> */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-2xl font-[600]">Recent Orders</h1>
                    {loading ? (
                        <iframe src="https://lottie.host/embed/95e591bc-3837-452b-9a4b-77ec3c873cc7/fEh9CBsGi6.lottie"></iframe>
                    ) : (
                        <TableOrders
                            tableHead={['Order ID', 'Customer', 'Products', 'Quantity', 'Status', 'Date', "Total", 'Action']}
                            ordersData={orders}
                            fetchData={false}
                        />
                    )}
                </div>
            </div>
        </section>
    </>
}