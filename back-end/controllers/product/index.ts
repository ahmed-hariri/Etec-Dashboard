import { functionControllers, productTypes } from "../../dto/auth";
import { addProductRepository } from "../../repositories/product";

export const addProductController: functionControllers = async (req, res) => {
    const { id, name, description, price, pictures, categoryId } = req.body as productTypes
    if (!name || !description || !price || !pictures || !categoryId) {
        res.status(400).type("json").json({ productId: null, message: "You don't have all information" })
        return
    }
    if (isNaN(price)) {
        res.status(400).type("json").json({ productId: null, message: "Price must be a valid number" })
        return
    }
    try {
        const product: productTypes = { id, name, description, price, pictures, categoryId }
        const { productId, message } = await addProductRepository(product);
        if (productId) {
            res.status(201).type("json").json({ productId, message });
        } else {
            res.status(400).type("json").json({ message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).type("json").json({ message: "Error creating products" });
    }
}