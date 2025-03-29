"use client"

import Title from "../../shared/title";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { fetchAllClients } from "@/api/clients";
import { fetchData } from "@/util/fetchData";
import useClientsStore from "@/store/pages/clientsStore";
import ClientsTable from "./table";

export default function ClientsComponents() {
    /*---> States (Zustand) <---*/
    const { clients, setClients, loading, setLoading } = useClientsStore()
    const tableHead: string[] = ['Clients ID', 'FullName', 'Email', 'profile', 'subscribe']

    /*---> Effects <---*/
    useEffect(() => {
        fetchData(fetchAllClients, setClients, "Error get all clients :")
        setLoading(false)
    }, [setClients, setLoading])
    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                <Title title="Clients" paragraphe="Welcome back, here’s an overview of your clients." />
                {/* <!-- Table Clients --> */}
                <ClientsTable clients={clients} loading={loading} tableHead={tableHead} />
            </div>
        </section>
        {/* <!-- Message --> */}
        <div className='w-full py-5 flex justify-center bottom-0 absolute'>
            <Toaster position="bottom-right" expand={true} />
        </div>
    </>
}