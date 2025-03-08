import mongoose from "mongoose";
const { Schema } = mongoose;

/*---> Define data structure <---*/
const contact = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    description: { type: String, required: true }
})

const contactModel = mongoose.model("contact", contact);
export default contactModel