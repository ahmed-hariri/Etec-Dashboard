import { clientInformationRepository, clientSubscribeRepository } from '../../repositories/clients/index';
import { accountTypes, functionControllers } from "../../dto";
import { getClientRepository, getClientsSubscribeRepository } from "../../repositories/clients";

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

/*---> Get all clients subscribe repository <---*/
export const getClientsSubscribeController: functionControllers = async (req, res, next) => {
    try {
        const { data, message } = await getClientsSubscribeRepository();
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
        return res.status(400).type("json").json({ message: `You dont have : ${!email ? "email" : !subscribe ? "subscribe" : ""}` });
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
        return res.status(400).type("json").json({ message: `You dont have : ${!id && "clientId"}` });
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