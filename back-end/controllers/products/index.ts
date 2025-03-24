import { functionControllers, productTypes } from "../../dto";
import { addProductRepository, getProductByIdRepository, getProductRepository, removeProductRepository, updateProductRepository } from "../../repositories/products";

/*---> Get all products controller <---*/
export const getProductsController: functionControllers = async (req, res, next) => {
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

/*---> Get product by productId controller <---*/
export const getProductByIdController: functionControllers = async (req, res, next) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).type("json").json({ message: "You don't have productId!" })
    }
    try {
        const { data, message } = await getProductByIdRepository({ id });
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
    const { name, description, price, pictures, categoryId } = req.body as productTypes
    if (!name || !description || !price || !pictures || !categoryId) {
        return res.status(400).type("json").json({ message: `You dont have : ${!name ? "name" : ""} ${!description ? "description" : ""} ${!price ? "price" : ""} ${!pictures ? "pictures" : ""} ${!categoryId ? "categoryId" : ""}` });
    }
    if (typeof price !== "number" || price <= 0) {
        return res.status(400).json({ message: "Price must be a positive number" });
    }
    if (pictures?.length === 0) {
        return res.status(400).json({ message: "At least one picture is required" });
    }
    try {
        const product: Partial<productTypes> = { name, description, price, pictures, categoryId }
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
        return res.status(400).type("json").json({ message: "You don't have productId!" })
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
    const { name, description, price, pictures, categoryId } = req.body as productTypes
    if (!id) {
        return res.status(400).type("json").json({ message: "You don't have productId!" })
    }
    try {
        const product: Partial<productTypes> = { id, name, description, price, pictures, categoryId }
        const { data, message } = await updateProductRepository(product);
        if (data) {
            return res.status(201).type("json").json({ data, message });
        }
        return res.status(404).type("json").json({ message });
    } catch (error) {
        next(error)
    }
}