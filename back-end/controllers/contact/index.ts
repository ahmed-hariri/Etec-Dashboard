import { addContactRepository } from '../../repositories/contact';
import { contactTypes, functionControllers } from './../../dto/index';

/*---> Add newContact controller <---*/
export const addContactController: functionControllers = async (req, res, next) => {
    const { name, email, description } = req.body as contactTypes;
    if (!name || !email || !description) {
        return res.status(400).type("json").json({ message: `You dont have : ${!name ? "name" : ''}${!email ? "email" : ''}${!description ? "description" : ''}` });
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