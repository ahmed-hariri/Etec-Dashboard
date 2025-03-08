import { functionRepository, contactTypes } from '../../dto/index';
import contactModel from "../../models/contacts";

/*---> Get all contacts repository <---*/
export const getContactRepository: functionRepository<contactTypes> = async () => {
    try {
        const contacts = await contactModel.find({})
        if (contacts.length > 0) {
            return { data: contacts, message: 'Get all contacts' }
        }
        return { data: [], message: 'You dont have any contacts' }
    } catch (error) {
        console.error("Error get contacts:", error);
        return { data: [], message: "Error get contacts!" }
    }
}

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