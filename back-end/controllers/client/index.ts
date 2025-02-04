import { functionControllers } from "../../dto";
import { getClientRepository, getClientsSubscribeRepository } from "../../repositories/client";

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