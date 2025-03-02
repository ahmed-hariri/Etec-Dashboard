import mongoose from "mongoose";
const { Schema } = mongoose;

/*---> Define data structure <---*/
const order = new Schema({
    userId: { type: String, required: true, ref: "user" },
    products: [{
        productId: { type: String, required: true, ref: "product" },
        quantity: { type: Number, required: true },
    }],
    status: {
        type: String, required: true,
        enum: ["Processing", "Shipped", "Delivered"]
    },
    totalPrice: { type: Number, required: true }
}, { timestamps: true });

const orderModel = mongoose.model("order", order);
export default orderModel