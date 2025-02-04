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

/*---> Remove contact repository <---*/
export const removeContactRepository: functionRepository<contactTypes> = async (contact) => {
    const { id } = contact as contactTypes;
    try {
        const findContact = await contactModel.deleteOne({ _id: id });
        if (findContact.deletedCount === 1) {
            return { data: findContact.deletedCount, message: 'Contact deleted successfully!' }
        }
        return { data: null, message: 'Contact not found!' };
    } catch (error) {
        console.error('Error deleting contact:', error);
        return { data: null, message: 'Error deleting the contact.' };
    }
}