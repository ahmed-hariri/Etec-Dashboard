import { contactTypes, functionRepository } from './../../dto/index';
import contactModel from "../../models/contact";

/*---> Add newContact repository <---*/
export const addContactRepository: functionRepository<contactTypes> = async (contact) => {
    const { name, email, description } = contact as contactTypes;
    try {
        const newContact = new contactModel({ name, email, description });
        await newContact.save();
        return { data: newContact.email, message: 'Your message has been created!' }
    } catch (error) {
        console.error("Error add contact:", error);
        return { data: [], message: "Error add conatct!" }
    }
}