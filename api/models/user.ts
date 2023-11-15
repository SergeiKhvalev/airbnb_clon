import mongoose, { Schema, Document, Model } from "mongoose";
import { UserDocument, UserModel} from "../interfaces";

// // Interface for user document
// interface UserDocument extends Document {
//     name: string;
//     email: string;
//     password: string;
// }
//
// // Interface for user model (extends the UserDocument interface)
// interface UserModel extends Model<UserDocument> {}

// Define the user schema
const userSchema = new Schema<UserDocument>({
    name: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

// Define the user model using the schema
export const userModel = mongoose.model<UserDocument, UserModel>("User", userSchema);

// Export the user model
//export default userModel;

//=======================================

// import mongoose, { Schema, Document, Model } from "mongoose";
// import { UserDocument} from "../interfaces";
//
// // // Interface for user document
// // interface UserDocument extends Document {
// //     name: string;
// //     email: string;
// //     password: string;
// // }
// //
// // // Interface for user model (extends the UserDocument interface)
// // interface UserModel extends Model<UserDocument> {}
//
// // Define the user schema
// // const userSchema = new Schema<UserDocument>({
// //     name: String,
// //     email: { type: String, unique: true, required: true },
// //     password: { type: String, required: true },
// // });
//
// // Define the user model using the schema
// export const userModel = mongoose.model("User",  new Schema<UserDocument>({
//     name: String,
//     email: { type: String, unique: true, required: true },
//     password: { type: String, required: true },
// }));
//
// //Export the user model
// //export default userModel
// //module.exports = userModel;