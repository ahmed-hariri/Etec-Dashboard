"use client"

import Title from "../../shared/title";
import { Toaster } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shared/chadcn/ui/table"
import TableMessage from "../../shared/table/message";
import { useEffect, useState } from "react";
import { accountTypes } from "@/types";
import { fetchAllClients } from "@/api/clients";
import { FaUser } from "react-icons/fa6";
import { fetchData } from "@/util/fetchData";

export default function ClientsComponents() {
    /*---> States <---*/
    const [clients, setClients] = useState<accountTypes>({ data: [] })
    const [loading, setLoading] = useState<boolean>(true)
    const tableHead: string[] = ['Clients ID', 'FullName', 'Email', 'profile', 'subscribe']

    /*---> Effects <---*/
    useEffect(() => {
        fetchData(fetchAllClients, setClients, "Error get all clients :")
        setLoading(false)
    }, [])
    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Clients" paragraphe="Welcome back, here’s an overview of your clients." />
                {/* <!-- Table clients --> */}
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
                                                client?.profile
                                            ) : (
                                                <div className="p-2 border border-black rounded-full">
                                                    <FaUser className="text-[13px]" />
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="font-bold">{client?.subsribe ? "Subsribed" : "UnSubscribed"}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableMessage colSpan={8} content="You dont have clients!" />
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
    </>
}