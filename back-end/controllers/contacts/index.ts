import { addContactRepository, getContactRepository, removeContactRepository } from '../../repositories/contacts';
import { contactTypes, functionControllers } from './../../dto/index';

/*---> Get all contacts controller <---*/
export const getContactsController: functionControllers = async (req, res, next) => {
    try {
        const { data, message } = await getContactRepository();
        if (data) {
            return res.status(200).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}

/*---> Add newContact controller <---*/
export const addContactController: functionControllers = async (req, res, next) => {
    const { name, email, description } = req.body as contactTypes;
    if (!name || !email || !description) {
        return res.status(400).type("json").json({ message: `You dont have : ${!name ? "name" : ""} ${!email ? "email" : ""} ${!description ? "description" : ""}` });
    }
    try {
        const contact: contactTypes = { name, email, description }
        const { data, message } = await addContactRepository(contact);
        if (data) {
            return res.status(201).type("json").json({ data, message })
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}

/*---> Remove contact controller <---*/
export const removeContactController: functionControllers = async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).type("json").json({ message: `You dont have : ${!id ? "contactId" : ""}` });
    }
    try {
        const contact: Partial<contactTypes> = { id }
        const { data, message } = await removeContactRepository(contact);
        if (data) {
            return res.status(201).type("json").json({ data, message })
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}