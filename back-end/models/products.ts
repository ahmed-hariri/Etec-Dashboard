import mongoose from "mongoose";
const { Schema } = mongoose;

/*---> Define data structure <---*/
const product = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    pictures: [
        { type: String, required: true }
    ],
    categoryId: { type: Schema.Types.ObjectId, required: true, ref: 'category' }
});

const productModel = mongoose.model("product", product);
export default productModel;