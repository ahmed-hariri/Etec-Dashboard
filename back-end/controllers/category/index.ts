import { categoryTypes, functionControllers } from "../../dto/auth";
import { addCategoryRepository, getCategoryRepository } from "../../repositories/category"

/*---> Get all categorys controller <---*/
export const getCategoryController: functionControllers = async (req, res, next) => {
    try {
        const { data, message } = await getCategoryRepository();
        if (data) {
            return res.status(200).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error);
    }
}

/*---> Add newCategory controller <---*/
export const addCategoryController: functionControllers = async (req, res, next) => {
    const { id, categoryName } = req.body;
    if (!id || !categoryName) {
        return { data: null, message: "You don't have all information" }
    }
    try {
        const newCategory: categoryTypes = { id, categoryName }
        const { data, message } = await addCategoryRepository(newCategory);
        if (data) {
            return res.status(201).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error);
    }
}
