import { functionControllers, productTypes } from "../../dto/auth";
import { addProductRepository, getProductRepository, removeProductRepository, updateProductRepository } from "../../repositories/product";

/*---> Get all products controller <---*/
export const getProductController: functionControllers = async (req, res) => {
    try {
        const { data, message } = await getProductRepository();
        if (data) {
            return res.status(200).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        console.error(error);
        return res.status(500).type("json").json({ message: "Error geting products" });
    }
}

/*---> Add newProduct controller <---*/
export const addProductController: functionControllers = async (req, res) => {
    const { id, name, description, price, categoryId } = req.body as productTypes
    if (!name || !description || !price || !categoryId) {
        return res.status(400).type("json").json({ data: null, message: "You don't have all information" })
    }
    if (isNaN(price)) {
        return res.status(400).type("json").json({ data: null, message: "Price must be a valid number" })
    }
    try {
        const product: Partial<productTypes> = { id, name, description, price, categoryId }
        const { data, message } = await addProductRepository(product);
        if (data) {
            return res.status(201).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        console.error(error);
        return res.status(500).type("json").json({ message: "Error creating product" });
    }
}

/*---> Remove product controller <---*/
export const removeProductController: functionControllers = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).type("json").json({ data: null, message: "You don't have Id!" })
    }
    try {
        const { data, message } = await removeProductRepository({ id });
        if (data) {
            return res.status(200).type("json").json({ data, message });
        }
        return res.status(404).type("json").json({ message });
    } catch (error) {
        console.error(error);
        return res.status(500).type("json").json({ message: "Error removing product" });
    }
}

/*---> Update product controller <---*/
export const updateProductController: functionControllers = async (req, res) => {
    const { id } = req.params
    const { name, description, price, categoryId } = req.body as productTypes
    if (!id) {
        return res.status(400).type("json").json({ data: null, message: "You don't have Id!" })
    }
    try {
        const product: Partial<productTypes> = { id, name, description, price, categoryId }
        const { data, message } = await updateProductRepository(product);
        if (data) {
            return res.status(201).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        console.error(error);
        return res.status(500).type("json").json({ message: "Error updating product" });
    }
}