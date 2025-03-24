import mongoose from "mongoose";
import { functionRepository, productTypes } from "../../dto";
import categoryModel from "../../models/categorys";
import productModel from "../../models/products";

/*---> Get all products repository <---*/
export const getProductRepository: functionRepository<productTypes> = async () => {
    try {
        const products = await productModel.find().populate("categoryId");
        if (products.length > 0) {
            return { data: products, message: 'Get all products' }
        }
        return { data: [], message: 'Not found any products' }
    } catch (error) {
        console.error("Error get products:", error);
        return { data: [], message: "Error get products!" }
    }
}

/*---> Get product by productId repository <---*/
export const getProductByIdRepository: functionRepository<productTypes> = async (productId) => {
    const { id } = productId as productTypes
    try {
        const findProduct = await productModel.findOne({ _id: id }).populate("categoryId");
        if (findProduct) {
            return { data: findProduct, message: 'Get product successfully!' }
        }
        return { data: null, message: 'Not found this product' }
    } catch (error) {
        console.error("Error get product:", error);
        return { data: [], message: "Error get product!" }
    }
}

/*---> Add product repository <---*/
export const addProductRepository: functionRepository<productTypes> = async (product) => {
    const { categoryId } = product as productTypes;
    try {
        const findCategory = await categoryModel.findOne({ _id: categoryId });
        if (!findCategory) {
            return { data: null, message: "Category not found!" }
        }
        const newProduct = new productModel(product);
        await newProduct.save();
        return { data: newProduct.id, message: "Product has been created!" }
    } catch (error) {
        console.error("Error creating product:", error);
        return { data: null, message: "Error creating product!" }
    }
}

/*---> Remove product repository <---*/
export const removeProductRepository: functionRepository<productTypes> = async (productId) => {
    const { id } = productId as productTypes
    try {
        const removeProduct = await productModel.deleteOne({ _id: id });
        if (removeProduct.deletedCount === 1) {
            return { data: removeProduct.deletedCount, message: 'Product deleted successfully!' }
        }
        return { data: null, message: 'Product not found!' };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { data: null, message: 'An error occurred while deleting the product.' };
    }
}

/*---> Update product repository <---*/
export const updateProductRepository: functionRepository<productTypes> = async (product) => {
    const { id, name, description, price, pictures, categoryId } = product as productTypes
    try {
        const findCategory = await categoryModel.findOne({ _id: categoryId });
        if (!findCategory) {
            return { data: null, message: "Category not found!" }
        }
        const updatedProduct = await productModel?.findByIdAndUpdate(id, { id, name, description, price, pictures, categoryId }, { new: true })
        if (!updatedProduct) {
            return { data: null, message: "Product not found!" };
        }
        return { data: updatedProduct?.id, message: "Product updated successfully!" };
    } catch (error) {
        console.error("Error updating task:", error);
        return { data: null, message: "Error updating product" }
    }
}