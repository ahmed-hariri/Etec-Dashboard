"use client"

import Title from "../../shared/title";
import { toast, Toaster } from "sonner";
import { useEffect } from "react";
import { fetchAllContacts, refreshCache, removeContact } from "@/api/contacts";
import { fetchData } from "@/util/fetchData";
import useContactsStore from "@/store/pages/contactsStore";
import ContactsTable from "./table";
import ContactsAction from "./action";

export default function ContactsComponents() {
    /*---> States (Zustand) <---*/
    const {
        contacts, setContacts,
        loading, setLoading,
        popUp, setPopUp
    } = useContactsStore()
    const tableHead: string[] = ['Contacts ID', 'FullName', 'Email', 'Description', 'Action']

    /*---> Functions <---*/
    const deleteContact = async (id: string | null): Promise<void> => {
        try {
            const response = await removeContact(id);
            if (response?.message === 'Contact deleted successfully!') {
                toast?.success(response?.message);
                setPopUp?.({ remove: false, contactId: '' });
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
    }, [setContacts, setLoading])
    return <>
        <section className="w-full lg:w-[80%] px-8 py-5 flex justify-center mb-5">
            <div className="w-full lg:max-w-[70rem] flex flex-col gap-8">
                {/* <!-- Title Page --> */}
                <Title title="Contacts" paragraphe="Welcome back, here’s an overview of your contacts." />
                {/* <!-- Table Contacts --> */}
                <ContactsTable contacts={contacts} loading={loading} tableHead={tableHead} setPopUp={setPopUp} />
            </div>
        </section>
        {/* <!-- Message --> */}
        <div className='w-full py-5 flex justify-center bottom-0 absolute'>
            <Toaster position="bottom-right" expand={true} />
        </div>
        {/* <!-- Remove Contact --> */}
        <ContactsAction popUp={popUp} setPopUp={setPopUp} methode={deleteContact} />
    </>
}