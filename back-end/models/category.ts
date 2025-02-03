import mongoose from "mongoose";
const { Schema } = mongoose;

/*---> Define data structure <---*/
const category = new Schema({
    id: { type: String, required: true, unique: true },
    categoryName: { type: String, required: true, unique: true }
});

const categoryModel = mongoose.model("category", category);
export default categoryModel