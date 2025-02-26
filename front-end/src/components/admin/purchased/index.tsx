import TableAdmin from "../table";
import Title from "../title";
import { purchasedTypes } from "@/types";
import { Toaster } from "sonner";

export default function PurchasedComponents() {
    /*---> States <---*/
    const purchasedProducts: purchasedTypes[] = [
        { _id: '0', name: "phone", description: "nice phone!", price: 100, picture: "http...", categoryId: { _id: '123444', categoryName: "mobile" }, date: '2025-02-22' }
    ];

    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Purchased" paragraphe="Welcome back, here’s an overview of your purchased products." />
                {/* <!-- Table Products --> */}
                <TableAdmin
                    tableHead={['Product ID', 'Name', 'Description', 'Price', 'Picture', 'Category', 'Date', 'Action']}
                    contents={purchasedProducts}
                    type="purchased"
                />
            </div>
        </section>
        <div className='w-full py-5 flex justify-center bottom-0 absolute'>
            <Toaster position="bottom-right" expand={true} />
        </div>
    </>
}