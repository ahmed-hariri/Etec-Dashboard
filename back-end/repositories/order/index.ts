import { functionRepository, orderTypes, productTypes } from "../../dto";
import orderModel from "../../models/order";
import productModel from "../../models/product";
import accountModel from "../../models/user";

/*---> Get all orders repository <---*/
export const getOrdersRepository: functionRepository<orderTypes> = async () => {
    try {
        const orders = await orderModel.find();
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
    const { id, userId, products, status, totalPrice } = order as orderTypes;
    if (!id || !userId || !products || products.length < 1 || !status || !totalPrice) {
        return { data: null, message: "You dont have all information!" }
    }
    try {
        /*---> Check if the order already exists <---*/
        const findOrder = await orderModel.findOne({ id: id });
        if (findOrder) {
            return { data: null, message: "This order already exists!" }
        }
        /*---> Check if the user exists in the database <---*/
        const findUser = await accountModel.find({ id: userId });
        if (!findUser) {
            return { data: null, message: "User not found!" }
        }
        /*---> Extract product IDs from the order <---*/
        const productIds: string[] = products.map((item) => item.productId);
        /*---> Check if the products exist in the database and store them in a variable (returns an array) <---*/
        const findProducts = await productModel.find({ id: { $in: productIds } });
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
        const newOrder = new orderModel(order);
        await newOrder.save();
        return { data: newOrder.id, message: "Order has been created successfully!" };
    } catch (error) {
        console.error("Error creating order:", error);
        return { data: null, message: "Error creating order!" }
    }
}