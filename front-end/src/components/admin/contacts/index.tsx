import Title from "../title";
import { accountTypes } from "@/types";
import { Toaster } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/chadcn/ui/table"
import { Button } from "@/components/chadcn/ui/button"
import TableMessage from "../table/message";

export default function ContactsComponents() {
    /*---> States <---*/
    const contacts: Partial<Partial<accountTypes>[]> = [
        { _id: '0', fullName: 'Ahmed Hariri', email: "AhmedHariri@gmail", description: '---' },
        { _id: '1', fullName: 'Ahmed Hrr', email: "AhmedHariri90@gmail", description: '---' },
        { _id: '2', fullName: 'Ahmed Harrr', email: "AhmedHariri123@gmail", description: '---' }
    ];
    const tableHead: string[] = ['Contacts ID', 'FullName', 'Email', 'Description', 'Action']

    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Contacts" paragraphe="Welcome back, here’s an overview of your contacts." />
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
                        {contacts && contacts?.length > 0 ? (
                            contacts?.map((client) => (
                                <TableRow key={client?._id} className="text-center">
                                    <TableCell className="font-medium">{client?._id}</TableCell>
                                    <TableCell>{client?.fullName}</TableCell>
                                    <TableCell>{client?.email}</TableCell>
                                    <TableCell>{client?.description}</TableCell>
                                    <TableCell className="text-center gap-3">
                                        <Button className="px-[12px] py-[6px]">
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableMessage colSpan={8} content="You dont have contacts!" />
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