import mongoose from "mongoose";
import { categoryTypes, functionRepository } from "../../dto";
import categoryModel from "../../models/categorys"

/*---> Get all categorys repository <---*/
export const getCategoryRepository: functionRepository<categoryTypes> = async () => {
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
export const addCategoryRepository: functionRepository<categoryTypes> = async (category) => {
    const { categoryName } = category as categoryTypes;
    try {
        const findCategory = await categoryModel.findOne({ categoryName });
        if (findCategory) {
            return { data: null, message: "Category already exists" }
        }
        const newCategory = new categoryModel(category);
        await newCategory.save();
        return { data: newCategory._id, message: "Category has been created!" }
    } catch (error) {
        console.error("Error creating product:", error);
        return { data: null, message: "Error creating category!" }
    }
}

/*---> Update category repository <---*/
export const updateCategoryRepository: functionRepository<categoryTypes> = async (newCategory) => {
    const { id, categoryName } = newCategory as categoryTypes;
    try {
        const existingCategory = await categoryModel.findOne({ categoryName: categoryName });
        if (existingCategory) {
            return { data: null, message: "Category already exists" }
        }
        const updatedCategory = await categoryModel?.findByIdAndUpdate(id, { categoryName }, { new: true })
        if (!updatedCategory) {
            return { data: null, message: "Category not found!" };
        }
        return { data: updatedCategory?.id, message: "Categorie updated successfully!" };
    } catch (error) {
        console.error("Error updating category:", error);
        return { data: null, message: "Error updating category!" }
    }
}

/*---> Remove category repository <---*/
export const removeCategoryRepository: functionRepository<categoryTypes> = async (categoryId) => {
    const { id } = categoryId as categoryTypes
    try {
        const findCategory = await categoryModel.deleteOne({ _id: id });
        if (findCategory.deletedCount === 1) {
            return { data: findCategory.deletedCount, message: 'Category deleted successfully!' }
        }
        return { data: null, message: "Category not found!" }
    } catch (error) {
        console.error("Error deleting category:", error);
        return { data: null, message: "An error occurred while deleting the category." }
    }
}
