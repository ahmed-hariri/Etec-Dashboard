import mongoose from "mongoose";
const { Schema } = mongoose;

/*---> Define data structure <---*/
const product = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    pictures: { type: String, required: false },
    categoryId: { type: String, required: true }
}, { timestamps: true });

const productModel = mongoose.model("product", product);
export default productModel;