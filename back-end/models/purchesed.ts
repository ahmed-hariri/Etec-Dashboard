import mongoose from "mongoose";
const { Schema } = mongoose;

/*---> Define data structure <---*/
const purchesed = new Schema({
    userId: { type: String, required: true, ref: "user" },
    products: [{
        productId: { type: String, required: true },
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true }
}, { timestamps: true });

const purchesedModel = mongoose.model("purchesed", purchesed);
export default purchesedModel