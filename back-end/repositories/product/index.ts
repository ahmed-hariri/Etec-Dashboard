import { productRepository, productTypes } from "../../dto/auth";
import productModel from "../../models/product";

/*---> Get All Products Repository <---*/
export const getProductRepository: productRepository = async () => {
    try {
        const products = await productModel.find();
        if (products.length > 0) {
            return { data: products, message: 'Get All products' }
        }
        return { data: [], message: 'You dont have any products' }
    } catch (error) {
        console.error("Error get products:", error);
        return { data: [], message: "Error get products!" }
    }
}

/*---> Add Product Repository <---*/
export const addProductRepository: productRepository = async (product) => {
    const { name, description, price, categoryId } = product as productTypes;
    if (!name || !description || !price || !categoryId) {
        return { data: null, message: "You don't have all information" }
    }
    try {
        const newProduct = new productModel(product);
        await newProduct.save();
        return { data: newProduct.id, message: "Product has been created!" }
    } catch (error) {
        console.error("Error creating product:", error);
        return { data: null, message: "Error creating product!" }
    }
}

/*---> Remove Product Repository <---*/
export const removeProductRepository: productRepository = async (productId) => {
    if (!productId) {
        return { data: null, message: 'You don\'t have a product id!' };
    }
    try {
        const removeProduct = await productModel.deleteOne({ id: productId.id });
        if (removeProduct.deletedCount === 1) {
            return { data: productId.id, message: 'Product deleted successfully!' }
        }
        return { data: null, message: 'Product not found!' };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { data: null, message: 'An error occurred while deleting the product.' };
    }
}

/*---> Update Product Repository <---*/
export const updateProductRepository: productRepository = async (product) => {
    const { id, name, description, price, categoryId } = product as productTypes
    if (!name || !description || !price || !categoryId) {
        return { data: null, message: "You don't have all information" }
    }
    try {
        const findProduct: any = await productModel.findOne({ id });
        if (findProduct) {
            findProduct.name = name
            findProduct.description = description
            findProduct.price = price
            findProduct.categoryId = categoryId
            await findProduct.save();
            return { data: findProduct.id, message: 'Product Update!' }
        }
        return { data: null, message: "Product not found!" }
    } catch (error) {
        console.error("Error updating task:", error);
        return { data: null, message: "Error updating product" }
    }
}