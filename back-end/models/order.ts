import mongoose from "mongoose";
const { Schema } = mongoose;

/*---> Define data structure <---*/
const order = new Schema({
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    products: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
    }],
    status: {
        type: String, required: true,
        enum: ["Processing", "Shipped", "Delivered"]
    },
    totalPrice: { type: Number, required: true }
});

const orderModel = mongoose.model("order", order);
export default orderModel