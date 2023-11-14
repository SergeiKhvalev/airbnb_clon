import mongoose from "mongoose";
import{Schema,   InferSchemaType} from "mongoose";

// schema for our model
interface UserDocument extends Document {
    name: String;
    email: String;
    password: String;
}


const userSchema  = new Schema<UserDocument>({
    name: String,
    email:{type: String, unique: true, required: true},
    password: {type: String, required: true},

})

//type User = InferSchemaType<typeof userSchema>

// model for user schema
const userModel: UserDocument = mongoose.model("User", userSchema);

module.exports = userModel;




