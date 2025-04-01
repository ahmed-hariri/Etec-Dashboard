import { accountTypes, popUpTypes } from "@/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shared/chadcn/ui/table"
import TableMessage from "@/components/shared/table/message"
import { FaUser } from "react-icons/fa6"
import Image from "next/image"
import { Button } from "../shared/chadcn/ui/button"

export default function ClientsTable(props: {
    clients: accountTypes,
    loading: boolean,
    tableHead: string[],
    setPopUp?: (popUp: popUpTypes) => void,
}) {
    const { clients, loading, tableHead, setPopUp } = props

    return <>
        {loading ? (
            <iframe src="https://lottie.host/embed/95e591bc-3837-452b-9a4b-77ec3c873cc7/fEh9CBsGi6.lottie"></iframe>
        ) : (
            <Table className="rounded-lg overflow-hidden">
                <TableHeader className="bg-gray-100">
                    <TableRow className="border-b border-gray-300">
                        {tableHead && tableHead?.map((head, index) => (
                            <TableHead key={index} className="text-center">{head}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {clients && clients?.data?.length > 0 ? (
                        clients?.data?.map((client) => (
                            <TableRow key={client?._id} className="text-center">
                                <TableCell className="font-medium">{client?._id}</TableCell>
                                <TableCell>{client?.fullName}</TableCell>
                                <TableCell>{client?.email}</TableCell>
                                <TableCell className="flex justify-center">
                                    {client?.profile ? (
                                        <Image src={client?.profile} property="true" alt="profile-picture" />
                                    ) : (
                                        <div className="p-2 border border-black rounded-full">
                                            <FaUser className="text-[13px]" />
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell className="font-bold">{client?.subscribe ? "Subsribed" : "UnSubscribed"}</TableCell>
                                <TableCell className="text-center gap-3">
                                    <Button className="px-[12px] py-[6px]" onClick={() => {
                                        setPopUp?.({ remove: true, id: client?._id ?? null })
                                    }}>
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
        )}
    </>
}