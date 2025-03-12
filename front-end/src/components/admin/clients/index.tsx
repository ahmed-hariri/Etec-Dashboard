import Title from "../../shared/title";
import { Toaster } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shared/chadcn/ui/table"
import { Button } from "@/components/shared/chadcn/ui/button"
import TableMessage from "../../shared/table/message";

export default function ClientsComponents() {
    /*---> States <---*/
    const clients = [
        { _id: '0', fullName: 'Ahmed Hariri', email: "AhmedHariri@gmail", profile: '---', subsribe: true },
        { _id: '1', fullName: 'Ahmed Hrr', email: "AhmedHariri90@gmail", profile: '---', subsribe: false },
        { _id: '2', fullName: 'Ahmed Harrr', email: "AhmedHariri123@gmail", profile: '---', subsribe: true }
    ]
    const tableHead: string[] = ['Clients ID', 'FullName', 'Email', 'profile', 'subscribe', 'Action']

    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Clients" paragraphe="Welcome back, here’s an overview of your clients." />
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
                        {clients && clients?.length > 0 ? (
                            clients?.map((client) => (
                                <TableRow key={client?._id} className="text-center">
                                    <TableCell className="font-medium">{client?._id}</TableCell>
                                    <TableCell>{client?.fullName}</TableCell>
                                    <TableCell>{client?.email}</TableCell>
                                    <TableCell>{client?.profile}</TableCell>
                                    <TableCell className="font-bold">{client?.subsribe ? "Subsribed" : "UnSubscribed"}</TableCell>
                                    <TableCell className="text-center gap-3">
                                        <Button className="px-[12px] py-[6px]">
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableMessage colSpan={8} content="You dont have clients!" />
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