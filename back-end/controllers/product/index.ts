import { Request, Response } from "express";
import { functionControllers, productTypes } from "../../dto/auth";
import { addProductRepository, getProductRepository } from "../../repositories/product";

// get information and send to repository
export const addProductController: functionControllers = async (req, res) => {
    const { id, name, description, price, categoryId } = req.body as productTypes
    if (!name || !description || !price || !categoryId) {
        return res.status(400).type("json").json({ productId: null, message: "You don't have all information" })
    }
    if (isNaN(price)) {
        return res.status(400).type("json").json({ productId: null, message: "Price must be a valid number" })
    }
    try {
        const product: Partial<productTypes> = { id, name, description, price, categoryId }
        const { productId, message } = await addProductRepository(product);
        if (productId) {
            return res.status(201).type("json").json({ productId, message });

        } else {
            return res.status(400).type("json").json({ message });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).type("json").json({ message: "Error creating products" });
    }
}

// get information and send to repository
export const getProductController: functionControllers = async (req: Request, res: Response) => {
    try {
        const { data, message } = await getProductRepository();
        if (data) {
            return res.status(200).type("json").json({ data, message });
        } else {
            return res.status(400).type("json").json({ message });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).type("json").json({ message: "Error get products" });
    }
}