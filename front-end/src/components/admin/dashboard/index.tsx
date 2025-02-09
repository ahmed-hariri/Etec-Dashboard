'use client'

import { useState } from "react";
import Title from "../title";
import { FaUsersLine } from "react-icons/fa6";
import { PiPackageBold } from "react-icons/pi";
import { GrDeliver } from "react-icons/gr";
import { FaStore } from "react-icons/fa";
import { Component } from "@/components/chadcn/chart";

export default function DashboardComponents() {
    const [cards] = useState<{ title: string, number: number, icon: React.ElementType }[]>([
        { title: "Orders", number: 12, icon: PiPackageBold },
        { title: "Progress", number: 8, icon: GrDeliver },
        { title: "Delivered", number: 45, icon: FaStore },
        { title: "Clients", number: 2, icon: FaUsersLine }
    ])
    const chartData = [
        { month: "January", order: 100 },
        { month: "February", order: 305 },
        { month: "March", order: 237},
        { month: "April", order: 73},
        { month: "May", order: 209},
        { month: "June", order: 214},
    ]
    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-10">
                <Title title="Dashboard" paragraphe="Welcome back, here's your order overview." />
                <div className="w-full flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap justify-between items-center gap-3 lg:gap-5">
                    {cards?.map((item, index) => (
                        <div key={index} className="w-full sm:w-[49%] lg:w-[25%] flex justify-between items-center cursor-pointer gap-[135px] py-[21px] px-[24px] rounded-xl hover:shadow-xl duration-500 border border-[#e3e2e2]">
                            <div className="flex flex-col justify-center gap-1">
                                <h1 className="text-gray-600 text-[15px] font-[600]">{item?.title}</h1>
                                <h1 className="text-[25px] font-[700]">{item?.number}</h1>
                            </div>
                            <item.icon className="text-2xl text-gray-600" />
                        </div>
                    ))}
                </div>
                <div className="w-full flex flex-wrap sm:flex-nowrap gap-5">
                    <Component chartTitle="Oders" chartData={chartData} />
                    <Component chartTitle="Clients"  chartData={chartData}/>
                </div>
            </div>
        </section>
    </>
}