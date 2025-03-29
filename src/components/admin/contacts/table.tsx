import { contactsTypes, popUpTypes } from "@/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shared/chadcn/ui/table"
import { Button } from "@/components/shared/chadcn/ui/button"
import TableMessage from "@/components/shared/table/message"

export default function ContactsTable(props: {
    contacts: contactsTypes
    loading: boolean
    tableHead: string[]
    setPopUp?: (popUp: popUpTypes) => void,
}) {
    const { contacts, loading, tableHead, setPopUp } = props

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
                    {contacts && contacts?.data?.length > 0 ? (
                        contacts?.data?.map((client) => (
                            <TableRow key={client?._id} className="text-center">
                                <TableCell className="font-medium">{client?._id}</TableCell>
                                <TableCell>{client?.name}</TableCell>
                                <TableCell>{client?.email}</TableCell>
                                <TableCell>{client?.description}</TableCell>
                                <TableCell className="text-center gap-3">
                                    <Button className="px-[12px] py-[6px]" onClick={() => {
                                        setPopUp?.({ remove: true, contactId: client?._id ?? null })
                                    }}>
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
        )}
    </>
}