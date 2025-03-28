import { accountTypes, functionRepository } from "../../dto";
import orderModel from "../../models/orders";
import purchesedModel from "../../models/purchesed";
import accountModel from "../../models/users"
import bcrypt from 'bcrypt';

/*---> Get all clients repository <---*/
export const getClientRepository: functionRepository<accountTypes> = async () => {
    try {
        const clients = await accountModel.find({ role: "client" });
        if (clients.length > 0) {
            return { data: clients, message: "Gel all clients!" }
        }
        return { data: [], message: "You don't have any clients" }
    } catch (error) {
        console.error("Error get clients:", error);
        return { data: [], message: "Error get clients!" }
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

/*---> Get all client information repository <---*/
export const clientInformationRepository: functionRepository<accountTypes> = async (clientId) => {
    const { id } = clientId as accountTypes;
    try {
        const findUser = await accountModel.findOne({ _id: id })
        if (!findUser) {
            return { data: null, message: "Client not found" }
        }
        const findOrder = await orderModel.find({ userId: id });
        const findPurchesedProduct = await purchesedModel.find({ userId: id });
        return {
            data: { user: findUser, orders: findOrder, purchesed: findPurchesedProduct },
            message: "Get all information Success!"
        }
    } catch (error) {
        console.error("Error client information:", error);
        return { data: [], message: "Error client information!" }
    }
}

/*---> Update client information controller <---*/
export const updateClientInformationRepository: functionRepository<accountTypes> = async (clientInformation) => {
    const { id, fullName, email, password, profile } = clientInformation as accountTypes;
    try {
        const findUser = await accountModel.findById(id);
        if (!findUser) {
            return { data: null, message: "Client not found" };
        }
        const updateData: Partial<accountTypes> = { fullName, email, profile };
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const updateClientInformation = await accountModel?.findByIdAndUpdate(id, { $set: updateData }, { new: true })
        if (!updateClientInformation) {
            return { data: null, message: "Client not found!" };
        }
        return { data: updateClientInformation?.id, message: "Client information updated successfully!" };
    } catch (error) {
        console.error("Error client information:", error);
        return { data: null, message: "Error client information!" };
    }
};