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