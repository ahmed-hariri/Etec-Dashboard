import mongoose, { Schema } from "mongoose";

/*---> Define data structure <---*/
const category = new Schema({
    id: { type: String, required: true },
    categoryName: { type: String, required: true }
});

const categoryModel = mongoose.model("category", category);
export default categoryModel