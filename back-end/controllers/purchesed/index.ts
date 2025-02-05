import { functionControllers } from "../../dto";
import { purchesedRepository } from "../../repositories/purchesed";

/*---> Get all purchesed product controller <---*/
export const purchesedController: functionControllers = async (req, res, next) => {
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