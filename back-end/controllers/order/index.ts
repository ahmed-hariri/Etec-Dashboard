import { functionControllers, orderTypes } from "../../dto";
import { addOrderRepository, getOrdersRepository, statusOrderRepository } from "../../repositories/order";

/*---> Get all orders controller <---*/
export const getOrdersController: functionControllers = async (req, res, next) => {
    try {
        const { data, message } = await getOrdersRepository();
        if (data) {
            return res.status(200).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}

/*---> Add order controller <---*/
export const addOrderController: functionControllers = async (req, res, next) => {
    const { userId, products, status, totalPrice } = req.body as orderTypes;
    if (!userId || !products || products.length < 1 || !status || !totalPrice) {
        return res.status(400).type("json").json({ message: `You dont have : ${!userId ? "userId" : ''}${!products ? "products" : ''}${!status ? "status" : ''}${!totalPrice ? "totalPrice" : ''}` });
    }
    try {
        const newOrder: orderTypes = { userId, products, status, totalPrice };
        const { data, message } = await addOrderRepository(newOrder);
        if (data) {
            return res.status(201).type("json").json({ data, message })
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error);
    }
}

export const statusOrderController: functionControllers = async (req, res, next) => {
    const { id } = req.params
    const { status } = req.body
    if (!id || !status) {
        return res.status(400).type("json").json({ message: `You dont have : ${!id ? "id" : ''}${!status ? "status" : ''}` });
    }
    if (!["Processing", "Shipped", "Delivered"].includes(status)) {
        return res.status(400).type("json").json({ message: `This status not respect Processing or Shipped or Delivered` });
    }
    try {
        const orderStatus = { id, status };
        const { data, message } = await statusOrderRepository(orderStatus);
        if (data) {
            return res.status(201).type("json").json({ data, message })
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error);
    }
}