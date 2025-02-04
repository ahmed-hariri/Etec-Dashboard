import accountModel from "../../models/user"

/*---> Get all clients repository <---*/
export const getClientRepository = async () => {
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
export const getClientsSubscribeRepository = async () => {
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