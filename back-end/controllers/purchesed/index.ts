import { functionControllers } from "../../dto";
import { purchesedRepository, removePurchesedRepository } from "../../repositories/purchesed";

/*---> Get all purchesed product controller <---*/
export const getAllPurchesedController: functionControllers = async (req, res, next) => {
    try {
        const { data, message } = await purchesedRepository();
        if (data) {
            return res.status(200).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}

/*---> Remove purchesed product controller <---*/
export const removePurchesedController: functionControllers = async (req, res, next) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).type("json").json({ message: "You don't have productId!" })
    }
    try {
        const { data, message } = await removePurchesedRepository({ id });
        if (data) {
            return res.status(200).type("json").json({ data, message });
        }
        return res.status(404).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}