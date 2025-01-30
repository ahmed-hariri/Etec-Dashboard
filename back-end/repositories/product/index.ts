import { productRepository, productTypes } from "../../dto/auth";
import productModel from "../../models/product";

// Add new product
export const addProductRepository: productRepository = async (product) => {
    const { name, description, price, categoryId } = product as productTypes;
    if (!name || !description || !price || !categoryId) {
        return { productId: null, message: "You don't have all information" }
    }
    try {
        const newProduct = new productModel(product);
        await newProduct.save();
        return { productId: newProduct.id, message: "Product has been created!" }
    } catch (error) {
        console.error("Error creating product:", error);
        return { productId: null, message: "Error creating product!" }
    }
}

// get all products
export const getProductRepository: productRepository = async () => {
    try {
        const products = await productModel.find();
        if (products.length > 0) {
            return { data: products, message: 'Get All products' }
        } else {
            return { data: [], message: 'You dont have any products' }
        }
    } catch (error) {
        console.error("Error get products:", error);
        return { data: [], message: "Error get products!" }
    }
}