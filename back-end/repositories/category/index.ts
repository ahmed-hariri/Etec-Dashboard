import { categoryRepository, categoryTypes, functionRepository } from "../../dto/auth";
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

/*---> Add newCategory repository <---*/
export const addCategoryRepository: functionRepository = async (category) => {
    const { id, categoryName } = category as categoryTypes;
    if (!id || !categoryName) {
        return { data: null, message: "You don't have all information" }
    }
    try {
        const findCategory = await categoryModel.findOne({ categoryName });
        if (findCategory) {
            return { data: null, message: "Category already exists" }
        }
        const newCategory = new categoryModel(category);
        await newCategory.save();
        return { data: newCategory.id, message: "Category has been created!" }
    } catch (error) {
        console.error("Error creating product:", error);
        return { data: null, message: "Error creating category!" }
    }
}

/*---> Update category repository <---*/
export const updateCategoryRepository: functionRepository = async (newCategory) => {
    const { id, categoryName } = newCategory as categoryTypes;
    if (!id || !categoryName) {
        return { data: null, message: "You don't have all information" }
    }
    try {
        const findCategory = await categoryModel.findOne({ id });
        if (findCategory) {
            findCategory.categoryName = categoryName;
            await findCategory.save();
            return { data: findCategory.id, message: 'Category Update!' }
        }
        return { data: null, message: "Category not found!" }
    } catch (error) {
        console.error("Error updating category:", error);
        return { data: null, message: "Error updating category!" }
    }
}