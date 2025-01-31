import mongoose, { Schema } from "mongoose";

/*---> Define data structure <---*/
const account = new Schema({
    id: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: Buffer || null, required: false },
    subscribe: { type: Boolean, required: false, default: false },
    admin: { type: Boolean, required: false, default: false },
});

const accountModel = mongoose.model("user", account);
export default accountModel