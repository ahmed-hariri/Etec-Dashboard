import mongoose from "mongoose";
const { Schema } = mongoose;

/*---> Define data structure <---*/
const account = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: String, required: false },
    subscribe: { type: Boolean, required: false, default: false },
    role: { type: String, enum: ["admin", "client"], required: false, default: "client" },
});

const accountModel = mongoose.model("user", account);
export default accountModel