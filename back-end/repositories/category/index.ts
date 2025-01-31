import { functionRepository } from "../../dto/auth";
import categoryModel from "../../models/category"

/*---> Get all categorys repository <---*/
export const getCategoryRepository: functionRepository = async () => {
    try {
        const categorys = await categoryModel.find();
        if (categorys.length > 0) {
            return { data: categorys, message: 'Get All categorys' }
        }
        return { data: [], message: 'Get All categorys' }
    } catch (error) {
        console.error("Error get categorys:", error);
        return { data: [], message: "Error get categorys!" }
    }
}