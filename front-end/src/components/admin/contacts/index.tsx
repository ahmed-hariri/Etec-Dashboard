"use client"

import Title from "../../shared/title";
import { contactsTypes } from "@/types";
import { toast, Toaster } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shared/chadcn/ui/table"
import { Button } from "@/components/shared/chadcn/ui/button"
import TableMessage from "../../shared/table/message";
import { useEffect, useState } from "react";
import { fetchAllContacts, refreshCache, removeContact } from "@/api/contacts";
import { fetchData } from "@/util/fetchData";

export default function ContactsComponents() {
    /*---> States <---*/
    const [contacts, setContacts] = useState<contactsTypes>({ data: [] })
    const [loading, setLoading] = useState<boolean>(true)
    const tableHead: string[] = ['Contacts ID', 'FullName', 'Email', 'Description', 'Action']
    const [popUp, setPopUp] = useState<{ remove: boolean, contactId: string | null }>({ remove: false, contactId: "" })

    /*---> Functions <---*/
    const deleteContact = async (id: string | null): Promise<void> => {
        try {
            const response = await removeContact(id);
            if (response?.message === 'Contact deleted successfully!') {
                toast?.success(response?.message);
                setPopUp({ remove: false, contactId: '' });
                refreshCache()
                await fetchData(fetchAllContacts, setContacts)
            }
        } catch (error) {
            console?.error("Error remove contact : ", error)
        }
    }

    /*---> Effects <---*/
    useEffect(() => {
        fetchData(fetchAllContacts, setContacts, "Error get all contacts :")
        setLoading(false)
    }, [])
    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Contacts" paragraphe="Welcome back, here’s an overview of your contacts." />
                {/* <!-- Table contacts */}
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
                                                setPopUp(() => ({ remove: true, contactId: client?._id ?? null }))
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
            </div>
        </section>
        {/* <!-- Message --> */}
        <div className='w-full py-5 flex justify-center bottom-0 absolute'>
            <Toaster position="bottom-right" expand={true} />
        </div>
        {popUp?.remove && (
            <div className="w-full h-screen backdrop-blur-sm fixed flex justify-center items-center">
                <div className="p-4 rounded-lg bg-black flex flex-col gap-5 text-white shadow-lg">
                    <h1 className="text-lg font-[600]">You want remove this products!</h1>
                    <div className="ml-40 flex gap-3">
                        {['Remove', 'Cancel']?.map((item, index) => (
                            <Button key={index} className="text-[17px]" onClick={() => {
                                if (item === 'Cancel') {
                                    setPopUp((prevState) => ({ ...prevState, remove: false, productId: null }))
                                } else {
                                    deleteContact(popUp?.contactId ?? null)
                                }
                            }}>
                                {item}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </>
}