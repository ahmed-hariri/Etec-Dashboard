import mongoose from "mongoose";
import { functionRepository, orderTypes, productTypes } from "../../dto";
import orderModel from "../../models/order";
import productModel from "../../models/product";
import accountModel from "../../models/user";

/*---> Get all orders repository <---*/
export const getOrdersRepository: functionRepository<orderTypes> = async () => {
    try {
        const orders = await orderModel.find().populate("userId");
        if (orders.length > 0) {
            return { data: orders, message: 'Get All orders!' }
        }
        return { data: [], message: 'You dont have any orders' }
    } catch (error) {
        console.error("Error get orders:", error);
        return { data: [], message: "Error get orders!" }
    }
}

/*---> Add newOrder repository <---*/
export const addOrderRepository: functionRepository<orderTypes> = async (order) => {
    const { userId, products, status, totalPrice } = order as orderTypes;
    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return { data: null, message: "Invalid userId format!" };
        }
        const userIdObject = new mongoose.Types.ObjectId(userId);
        /*---> Check if the user exists in the database <---*/
        const findUser = await accountModel.findOne({ _id: userIdObject });
        if (!findUser) {
            return { data: null, message: "User not found!" }
        }
        /*---> Check if the order already exists <---*/
        const findOrder = await orderModel.findOne({ userId: userIdObject, status: status });
        if (findOrder) {
            return { data: null, message: "This order already exists!" }
        }
        /*---> Extract product IDs from the order <---*/
        const productIds: string[] = products.map((item) => item.productId);
        /*---> Check if the products exist in the database and store them in a variable (returns an array) <---*/
        const findProducts = await productModel.find({ _id: { $in: productIds } });
        if (findProducts.length !== products.length) {
            return { data: null, message: "One or more products were not found!" };
        }
        /*---> Calculate the total price <---*/
        const validateTotalPrice = products.reduce((total: number, item) => {
            const product = findProducts.find((p) => p.id === item.productId);
            return total + (product ? product.price * item.quantity : 0)
        }, 0)
        if (validateTotalPrice !== totalPrice) {
            return { data: null, message: "Total price calculation is incorrect!" };
        }
        /*---> Check if the status exist in the table <---*/
        if (!["Processing", "Shipped", "Delivered"].includes(status)) {
            return { data: null, message: "This state not valide!" };
        }
        const newOrder = new orderModel(order);
        await newOrder.save();
        return { data: newOrder.id, message: "Order has been created successfully!" };
    } catch (error) {
        console.error("Error creating order:", error);
        return { data: null, message: "Error creating order!" }
    }
}

/*---> Change status order repository <---*/
export const statusOrderRepository: functionRepository<orderTypes> = async (order) => {
    const { id, status } = order as orderTypes
    try {
        const findOrder = await orderModel.findOne({ _id: id });
        if (findOrder) {
            findOrder.status = status
            await findOrder.save();
            return { data: findOrder._id, message: "Order state changed!" }
        }
        return { data: null, message: "Order not found!" }
    } catch (error) {
        console.error("Error changed order state:", error);
        return { data: null, message: "Error changed order state" }
    }
}