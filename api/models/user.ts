import mongoose from "mongoose";
import{Schema} from "mongoose";

// schema for our model
const userSchema = new Schema({
    name: String,
    email:{type: String, unique: true},
    password: String,

})

// model for user schema
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;




