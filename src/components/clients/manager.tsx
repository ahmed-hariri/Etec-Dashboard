"use client"

import { toast, Toaster } from "sonner";
import { useEffect } from "react";
import { fetchAllClients, refreshCache, removeClient } from "@/api/clients";
import { fetchData } from "@/util/fetchData";
import useClientsStore from "@/store/pages/clientsStore";
import ClientsTable from "./table";
import RemoveAction from "@/components/shared/remove";
import Title from "../shared/title";

export default function ClientsComponents() {
    /*---> States (Zustand) <---*/
    const {
        clients, setClients,
        loading, setLoading,
        popUp, setPopUp
    } = useClientsStore()
    const tableHead: string[] = ['Clients ID', 'FullName', 'Email', 'profile', 'subscribe', 'Action']

    /*---> Functions <---*/
    const deleteClient = async (id: string | null): Promise<void> => {
        try {
            const response = await removeClient(id);
            console?.log("Response remove client : ", response)
            if (response?.message === 'Client removed successfully!') {
                toast?.success(response?.message);
                setPopUp?.({ remove: false, id: '' });
                refreshCache()
                await fetchData(fetchAllClients, setClients)
            }
        } catch (error) {
            console?.error("Error remove a client : ", error)
        }
    }

    /*---> Effects <---*/
    useEffect(() => {
        fetchData(fetchAllClients, setClients, "Error get all clients :")
        setLoading(false)
    }, [setClients, setLoading])
    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                {/* <!-- Title/Description of the page --> */}
                <Title title="Clients" description="Welcome back, here’s an overview of your clients." />
                {/* <!-- Table Clients --> */}
                <ClientsTable clients={clients} loading={loading} tableHead={tableHead} setPopUp={setPopUp} />
            </div>
        </section>
        {/* <!-- Message --> */}
        <div className='w-full py-5 flex justify-center bottom-0 absolute'>
            <Toaster position="bottom-right" expand={true} />
        </div>
        {/* <!-- Remove Client --> */}
        <RemoveAction title="client" popUp={popUp} setPopUp={setPopUp} method={deleteClient} />
    </>
}