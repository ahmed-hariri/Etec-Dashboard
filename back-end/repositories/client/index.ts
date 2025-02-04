import { accountTypes, functionRepository } from "../../dto";
import accountModel from "../../models/user"

/*---> Get all clients repository <---*/
export const getClientRepository: functionRepository<accountTypes> = async () => {
    try {
        const clients = await accountModel.find({ admin: false });
        if (clients.length > 0) {
            return { data: clients, message: "Gel all clients!" }
        }
        return { data: [], message: "You don't have clients" }
    } catch (error) {
        console.error("Error get clients:", error);
        return { data: [], message: "Error get clients!" }
    }
}

/*---> Get all clients subscribe repository <---*/
export const getClientsSubscribeRepository: functionRepository<accountTypes> = async () => {
    try {
        const clientsSubscribe = await accountModel.find({ subscribe: true });
        if (clientsSubscribe.length > 0) {
            return { data: clientsSubscribe, message: "Gel all clients subscribe!" }
        }
        return { data: [], message: "You don't have clients subscribe" }
    } catch (error) {
        console.error("Error get clients subscribe:", error);
        return { data: [], message: "Error get clients subscribe!" }
    }
}

/*---> Client subscribe repository <---*/
export const clientSubscribeRepository: functionRepository<accountTypes> = async (client) => {
    const { email, subscribe } = client as accountTypes
    try {
        const findClient = await accountModel.findOne({ email: email });
        if (findClient) {
            findClient.subscribe = subscribe
            await findClient.save();
            return { data: findClient._id, message: `Client ${findClient.subscribe ? "subscribe" : "unsubscribe"} successfully!` }
        }
        return { data: null, message: "Email not found" }
    } catch (error) {
        console.error("Error client subscribe:", error);
        return { data: [], message: "Error client subscribe!" }
    }
}