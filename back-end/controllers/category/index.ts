import { functionControllers } from "../../dto/auth";
import { getCategoryRepository } from "../../repositories/category"

/*---> Get all categorys controller <---*/
export const getCategoryController: functionControllers = async (req, res) => {
    try {
        const { data, message } = await getCategoryRepository();
        if (data) {
            return res.status(200).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        console.error(error);
        return res.status(500).type("json").json({ message: "Error geting categorys" });
    }
}