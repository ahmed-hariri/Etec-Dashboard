import { functionControllers, orderTypes } from "../../dto";
import { addOrderRepository } from "../../repositories/order";

/*---> Add order controller <---*/
export const addOrderController: functionControllers = async (req, res, next) => {
    const { id, userId, products, status, totalPrice } = req.body as orderTypes;
    if (!id || !userId || !products || products.length < 1 || !status || !totalPrice) {
        return res.status(201).type("json").json({ message: "You dont have all information!" })
    }
    try {
        const newOrder: orderTypes = { id, userId, products, status, totalPrice };
        const { data, message } = await addOrderRepository(newOrder);
        if (data) {
            return res.status(201).type("json").json({ data, message })
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error);
    }
} 