import { productRepository, productTypes } from "../../dto/auth";
import productModel from "../../models/product";

export const addProductRepository: productRepository = async (product) => {
    const { name, description, price, pictures, categoryId } = product;
    if (!name || !description || !price || !pictures || !categoryId) {
        return { productId: null, message: "You don't have all information" }
    }
    try {
        const newProduct = new productModel(product);
        await newProduct.save();
        return { productId: newProduct.id, message: "Product has been created!" }
    } catch (error) {
        console.error("Error creating task:", error);
        return { productId: null, message: "Error creating product!" }
    }
}