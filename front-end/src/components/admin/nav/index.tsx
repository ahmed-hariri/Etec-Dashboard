"use client"

import Link from "next/link";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { usePathname, useRouter } from "next/navigation";
import { GrMenu } from "react-icons/gr";
import { links } from "@/data";


export default function Navbar() {
    /*---> States <---*/
    const [showAllContent, setShowAllContent] = useState<boolean>(false);
    const [displayState, setDisplayState] = useState<string>('')
    const navigate = useRouter();
    const pathName = usePathname();

    /*---> Functions <---*/
    const toggle = (): void => setShowAllContent((prevState) => !prevState);
    const logOut = (): void => { Cookies.remove("token"); navigate?.push("/") }

    /*---> Effects <---*/
    useEffect(() => {
        switch (pathName) {
            case "/admin/dashboard":
                setDisplayState('dashboard')
                break;
            case "/admin/products":
                setDisplayState('products')
                break;
            case "/admin/categories":
                setDisplayState('categories')
                break;
            case "/admin/purchased":
                setDisplayState('purchased')
                break;
            case "/admin/orders":
                setDisplayState('orders')
                break;
            case "/admin/clients":
                setDisplayState('clients')
                break;
            case "/admin/contacts":
                setDisplayState('contacts')
                break;
            default:
                return;
        }
    }, [pathName])

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
                <div className={`w-full h-screen lg:h-auto py-8 px-[37px] lg:p-6 lg:pl-[35px] lg:pr-[100px] bg-white ${showAllContent ? "flex" : "hidden lg:flex"} flex-col justify-between border-r border-gray-200`}>
                    <div className="w-full flex flex-col gap-3">
                        <h1 className="text-2xl lg:text-[22px] font-[700]">Navigation</h1>
                        <ul className="w-full flex flex-col gap-1 font-[600]">
                            {links && links?.map((link, index) => (
                                <li key={index} className={`w-full flex items-center gap-[4px] lg:gap-[5px] rounded-md px-3 py-[7px] ${displayState === link?.context.toLocaleLowerCase() && "bg-[#ececec]"}`}>
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