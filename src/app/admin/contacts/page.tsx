import ContactsComponents from "@/components/contacts/manager";
import { Metadata } from "next";

/*---> Added metadata for SEO and better page information <---*/
export const metadata: Metadata = {
    title: "Contacts",
    description: "Access your admin panel to manage and monitor system activities efficiently.",
};

export default function Contacts() {
    return <>
        <ContactsComponents />
    </>
}