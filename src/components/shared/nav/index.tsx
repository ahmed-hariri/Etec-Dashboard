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
    const pathname = usePathname();

    /*---> Functions <---*/
    const toggle = (): void => setShowAllContent((prevState) => !prevState);
    const logOut = (): void => {
        Cookies.remove("token");
        navigate?.push("/")
    }

    /*---> Effects <---*/
    useEffect(() => {
        const stateMapping: { [key: string]: string } = {
            "/dashboard": 'dashboard',
            "/products": 'products',
            "/categories": 'categories',
            "/purchased": 'purchased',
            "/orders": 'orders',
            "/clients": 'clients',
            "/contacts": 'contacts',
        };
        setDisplayState(stateMapping[pathname] || '');
    }, [pathname])

    return <>
        <div className="w-full lg:w-auto flex fixed sm:absolute lg:relative">
            <div className="w-full h-full relative flex justify-center lg:justify-start">
                <div className="w-full px-6 py-6 flex z-50 lg:hidden fixed bottom-0">
                    <div className="w-full px-5 py-3 text-[25px] flex justify-between items-center shadow-md shadow-[#00000050] text-black rounded-full gap-5 bg-white">
                        <button onClick={toggle}>
                            <GrMenu />
                        </button>
                        <button onClick={logOut}>
                            <CiLogout />
                        </button>
                    </div>
                </div>
                <div className={`w-full h-screen lg:h-auto py-8 px-[37px] lg:p-6 lg:pl-[35px] lg:pr-[100px] bg-white ${showAllContent ? "flex" : "hidden lg:flex"} flex-col justify-between border-r border-gray-200`}>
                    <div className="w-full flex flex-col gap-3">
                        <h1 className="text-2xl lg:text-[22px] font-[700]">Navigation</h1>
                        <ul className="w-full flex flex-col gap-1 font-[600]">
                            {links && links?.map((link, index) => (
                                <li key={index} className={`w-full flex items-center gap-[4px] lg:gap-[5px] rounded-md px-3 py-[7px] ${displayState === link?.context?.toLocaleLowerCase() && "bg-[#ececec]"}`} onClick={toggle}>
                                    <link.icon />
                                    <Link href={`/${link.href}`} className="text-lg lg:text-base">{link.context}</Link>
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