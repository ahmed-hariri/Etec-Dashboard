import mongoose from "mongoose";
const { Schema } = mongoose;

/*---> Define data structure <---*/
const category = new Schema({
    categoryName: { type: String, required: true, unique: true }
});

const categoryModel = mongoose.model("category", category);
export default categoryModel