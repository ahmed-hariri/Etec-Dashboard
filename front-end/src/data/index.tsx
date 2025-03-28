import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { PiTreeStructureBold } from "react-icons/pi";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { GoListUnordered } from "react-icons/go";
import { FaUsersLine } from "react-icons/fa6";
import { RiContactsFill } from "react-icons/ri";

export const chartData = [
    { month: "January", order: 100 },
    { month: "February", order: 305 },
    { month: "March", order: 237 },
    { month: "April", order: 73 },
    { month: "May", order: 209 },
    { month: "June", order: 214 }
]

export const links = [
    { href: "dashboard", context: "Dashboard", icon: MdOutlineDashboard },
    { href: "products", context: "Products", icon: MdOutlineProductionQuantityLimits },
    { href: "categories", context: "Categories", icon: PiTreeStructureBold },
    { href: "purchased", context: "Purchased", icon: BiSolidPurchaseTag },
    { href: "orders", context: "Orders", icon: GoListUnordered },
    { href: "clients", context: "Clients", icon: FaUsersLine },
    { href: "contacts", context: "Contacts", icon: RiContactsFill }
];

export const inputs = [
    { type: "text", inputName: "name", inputLabel: "Name", placeHolder: "name" },
    { type: "number", inputName: "price", inputLabel: "Price", placeHolder: "price" },
    { type: "text", inputName: "pictures", inputLabel: "Pictures", placeHolder: "pictures" },
    { type: "text", inputName: "description", inputLabel: "Description", placeHolder: "description" }
]