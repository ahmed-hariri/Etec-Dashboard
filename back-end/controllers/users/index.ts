import { clientInformationRepository, clientSubscribeRepository, updateClientInformationRepository } from '../../repositories/clients/index';
import { accountTypes, functionControllers } from "../../dto";
import { getClientRepository } from "../../repositories/clients";

/*---> Get all clients controller <---*/
export const getClientsController: functionControllers = async (req, res, next) => {
    try {
        const { data, message } = await getClientRepository();
        if (data) {
            return res.status(200).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}

/*---> Change state subscribeCheck controller <---*/
export const clientSubscribeController: functionControllers = async (req, res, next) => {
    const { email, subscribe } = req.body;
    if (!email || subscribe === undefined) {
        return res.status(400).type("json").json({ message: `You dont have : ${!email ? "email" : ""} ${!subscribe ? "subscribe" : ""}` });
    }
    try {
        const client: Partial<accountTypes> = { email, subscribe }
        const { data, message } = await clientSubscribeRepository(client)
        if (data) {
            return res.status(200).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}

/*---> Get all client information controller <---*/
export const clientInformationController: functionControllers = async (req, res, next) => {
    const { id } = req.data;
    if (!id) {
        return res.status(400).type("json").json({ message: `You dont have : ${!id ? "clientId" : ""}` });
    }
    try {
        const client: Partial<accountTypes> = { id }
        const { data, message } = await clientInformationRepository(client)
        if (data) {
            return res.status(200).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}

/*---> Update client information controller <---*/
export const updateClientInformation: functionControllers = async (req, res, next) => {
    const { id } = req.params;
    const { fullName, email, password, profile } = req.body
    if (!id) {
        return res.status(400).type("json").json({ message: `You dont have : ${!id ? "clientId" : ""}` });
    }
    try {
        const client: Partial<accountTypes> = { id, fullName, email, password, profile }
        const { data, message } = await updateClientInformationRepository(client)
        if (data) {
            return res.status(200).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}