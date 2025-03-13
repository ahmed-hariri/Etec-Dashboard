import mongoose from "mongoose";
const { Schema } = mongoose;

/*---> Define data structure <---*/
const purchesed = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
    products: [{
        productId: { type: Schema.Types.ObjectId, required: true, ref: "product" },
        quantity: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true }
}, { timestamps: true });

const purchesedModel = mongoose.model("purchesed", purchesed);
export default purchesedModel