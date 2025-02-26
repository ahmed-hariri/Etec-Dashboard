import { PiPackageBold } from "react-icons/pi";
import { GrDeliver } from "react-icons/gr";
import { FaStore } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { PiTreeStructureBold } from "react-icons/pi";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { GoListUnordered } from "react-icons/go";
import { FaUsersLine } from "react-icons/fa6";
import { RiContactsFill } from "react-icons/ri";
import { ordersTypes } from "@/types";

export const cards = [
    { title: "Orders", number: 12, icon: PiPackageBold },
    { title: "Progress", number: 8, icon: GrDeliver },
    { title: "Delivered", number: 45, icon: FaStore },
    { title: "Clients", number: 2, icon: FaUsersLine }
]
export const chartData = [
    { month: "January", order: 100 },
    { month: "February", order: 305 },
    { month: "March", order: 237 },
    { month: "April", order: 73 },
    { month: "May", order: 209 },
    { month: "June", order: 214 }
]
export const orders: ordersTypes[] = [
    { _id: "0", userId: { fullName: "Ahmed Hariri", email: "Ahmedhariri58@gmail.com" }, products: [{ productId: "0", quantity: 5 }], status: "Processing", createdAt: '2025-10-30', totalPrice: 23 },
    { _id: "1", userId: { fullName: "Ahmed Hariri", email: "Ahmedhariri58@gmail.com" }, products: [{ productId: "1", quantity: 5 }], status: "Processing", createdAt: '2025-04-03', totalPrice: 45 },
    { _id: "2", userId: { fullName: "Ahmed Hariri", email: "Ahmedhariri58@gmail.com" }, products: [{ productId: "2", quantity: 5 }], status: "Shipped", createdAt: '2025-01-28', totalPrice: 203 }
];
export const links = [
    { href: "dashboard", context: "Dashboard", icon: MdOutlineDashboard },
    { href: "products", context: "Products", icon: MdOutlineProductionQuantityLimits },
    { href: "categories", context: "Categories", icon: PiTreeStructureBold },
    { href: "purchased", context: "Purchased", icon: BiSolidPurchaseTag },
    { href: "orders", context: "Orders", icon: GoListUnordered },
    { href: "users", context: "Users", icon: FaUsersLine },
    { href: "contact", context: "Contact", icon: RiContactsFill }
];
export const inputs = [
    { type: "text", inputName: "name", inputLabel: "Name", placeHolder: "name" },
    { type: "number", inputName: "price", inputLabel: "Price", placeHolder: "price" },
    { type: "text", inputName: "picture", inputLabel: "Picture", placeHolder: "picture" },
    { type: "text", inputName: "description", inputLabel: "Description", placeHolder: "description" }
]