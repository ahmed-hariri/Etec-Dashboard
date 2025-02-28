import Title from "../title";
import { purchasedTypes } from "@/types";
import { Toaster } from "sonner";
import { Button } from "@/components/chadcn/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/chadcn/ui/table"
import TableMessage from "../table/message";


export default function PurchasedComponents() {
    /*---> States <---*/
    const purchasedProducts: purchasedTypes[] = [
        { _id: '0', name: "phone", description: "nice phone!", price: 100, picture: "http...", categoryId: { _id: '123444', categoryName: "mobile" }, date: '2025-02-22' }
    ];
    const tableHead: string[] = ['Product ID', 'Name', 'Description', 'Price', 'Picture', 'Category', 'Date', 'Action']

    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Purchased" paragraphe="Welcome back, here’s an overview of your purchased products." />
                {/* <!-- Table Products --> */}
                <Table className="rounded-lg overflow-hidden">
                    <TableHeader className="bg-gray-100">
                        <TableRow className="border-b border-gray-300">
                            {tableHead && tableHead?.map((head, index) => (
                                <TableHead key={index} className="text-center">{head}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {purchasedProducts && purchasedProducts?.length > 0 ? (
                            purchasedProducts?.map((content) => (
                                <TableRow key={content?._id} className="text-center">
                                    <TableCell className="font-medium">{content?._id}</TableCell>
                                    <TableCell>{content?.name}</TableCell>
                                    <TableCell>{content?.description}</TableCell>
                                    <TableCell>${content?.price}.00</TableCell>
                                    <TableCell>{content?.picture}</TableCell>
                                    <TableCell>{content?.categoryId?.categoryName}</TableCell>
                                    <TableCell>{content?.date}</TableCell>
                                    <TableCell className="flex justify-center gap-3">
                                        <Button className="px-[12px] py-[6px]">
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableMessage colSpan={8} content="You dont have purchased products!" />
                        )}
                    </TableBody>
                </Table>
            </div>
        </section>
        <div className='w-full py-5 flex justify-center bottom-0 absolute'>
            <Toaster position="bottom-right" expand={true} />
        </div>
    </>
}