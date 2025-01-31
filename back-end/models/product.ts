import mongoose, { Schema } from "mongoose";

const product = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    pictures: { type: Buffer || null, require: false },
    categoryId: { type: String, require: true }
});

const productModel = mongoose.model("product", product);
export default productModel;