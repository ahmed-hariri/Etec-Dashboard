"use client"

import Link from "next/link";
import Cookies from 'js-cookie';

import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { PiTreeStructureBold } from "react-icons/pi";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { GoListUnordered } from "react-icons/go";
import { FaUsersLine } from "react-icons/fa6";
import { RiContactsFill } from "react-icons/ri";
import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { GrMenu } from "react-icons/gr";

export default function Navbar() {
    const [links] = useState<{ href: string, context: string, icon: React.ElementType }[]>([
        { href: "dashboard", context: "Dashboard", icon: MdOutlineDashboard },
        { href: "products", context: "Products", icon: MdOutlineProductionQuantityLimits },
        { href: "categories", context: "Categories", icon: PiTreeStructureBold },
        { href: "purchased", context: "Purchased", icon: BiSolidPurchaseTag },
        { href: "orders", context: "Orders", icon: GoListUnordered },
        { href: "users", context: "Users", icon: FaUsersLine },
        { href: "contact", context: "Contact", icon: RiContactsFill }
    ]);
    const [showAllContent, setShowAllContent] = useState<boolean>(false)
    const navigate = useRouter();

    const toggle = () => setShowAllContent((prevState) => !prevState)
    const logOut = () => { Cookies.remove("token"); navigate.push("/") }

    return <>
        <div className="w-full lg:w-auto flex fixed sm:absolute lg:relative">
            <div className="w-full h-full relative flex justify-center lg:justify-start">
                <div className="w-auto flex lg:hidden absolute justify-between items-center px-[18px] py-[13px] bottom-0 mb-7 text-[25px] shadow-[#00000050] shadow-md text-black rounded-full bg-white gap-5 z-50">
                    <button onClick={logOut}>
                        <CiLogout />
                    </button>
                    <button onClick={toggle}>
                        <GrMenu />
                    </button>
                </div>
                <div className={`w-full h-screen lg:h-auto py-8 px-[37px] lg:p-6 lg:pl-[35px] lg:pr-[120px] bg-white ${showAllContent ? "flex" : "hidden lg:flex"} flex-col justify-between border-r border-gray-200`}>
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl lg:text-[22px] font-[700]">Navigation</h1>
                        <ul className="flex flex-col gap-3 font-[600]">
                            {links && links?.map((link, index) => (
                                <li key={index} className="flex items-center gap-[4px] lg:gap-[5px]">
                                    <link.icon />
                                    <Link href={`/admin/${link.href}`} className="text-lg lg:text-base">{link.context}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='lg:flex hidden fixed bottom-0 mb-8'>
                        <button className='p-[11px] text-[25px] rounded-full shadow-[#00000050] shadow-md text-black' onClick={logOut}>
                            <CiLogout />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}