import { functionControllers, productTypes } from "../../dto/auth";
import { addProductRepository, getProductRepository, removeProductRepository, updateProductRepository } from "../../repositories/product";

/*---> Get all products controller <---*/
export const getProductController: functionControllers = async (req, res, next) => {
    try {
        const { data, message } = await getProductRepository();
        if (data) {
            return res.status(200).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}

/*---> Add newProduct controller <---*/
export const addProductController: functionControllers = async (req, res, next) => {
    const { id, name, description, price, categoryId } = req.body as productTypes
    if (!name || !description || !price || !categoryId) {
        return res.status(400).type("json").json({ data: null, message: "You don't have all information" })
    }
    if (typeof price !== "number" || price <= 0) {
        return res.status(400).json({ message: "Price must be a positive number" });
    }
    try {
        const product: Partial<productTypes> = { id, name, description, price, categoryId }
        const { data, message } = await addProductRepository(product);
        if (data) {
            return res.status(201).type("json").json({ data, message });
        }
        return res.status(400).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}

/*---> Remove product controller <---*/
export const removeProductController: functionControllers = async (req, res, next) => {
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
        next(error)
    }
}

/*---> Update product controller <---*/
export const updateProductController: functionControllers = async (req, res, next) => {
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
        return res.status(404).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}