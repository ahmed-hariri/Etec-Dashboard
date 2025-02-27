import TableAdmin from "../table";
import Title from "../title";
import { ordersTypes } from "@/types";
import { Toaster } from "sonner";

export default function OrdersComponents() {
    /*---> States <---*/
    const orders: ordersTypes[] = [
        { _id: "0", userId: { fullName: "Ahmed Hariri", email: "Ahmedhariri58@gmail.com" }, products: [{ productId: "0", quantity: 5 }], status: 'Processing', createdAt: '2025-10-30', totalPrice: 23 },
        { _id: "1", userId: { fullName: "Ahmed Hariri", email: "Ahmedhariri58@gmail.com" }, products: [{ productId: "1", quantity: 5 }], status: 'Processing', createdAt: '2025-04-03', totalPrice: 45 },
        { _id: "2", userId: { fullName: "Ahmed Hariri", email: "Ahmedhariri58@gmail.com" }, products: [{ productId: "2", quantity: 5 }], status: 'Shipped', createdAt: '2025-01-28', totalPrice: 203 }
    ];

    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Orders" paragraphe="Welcome back, here’s an overview of your orders." />
                {/* <!-- Table Products --> */}
                <TableAdmin
                    tableHead={['Order ID', 'Customer', 'Products', 'Quantity', 'Status', 'Date', "Total", 'Action']}
                    contents={orders}
                    type="orders"
                />
            </div>
        </section>
        <div className='w-full py-5 flex justify-center bottom-0 absolute'>
            <Toaster position="bottom-right" expand={true} />
        </div>
    </>
}