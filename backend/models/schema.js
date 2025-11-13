import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		id: { type: Number, required: true, unique: true },
		account: { type: String, required: true, unique: true },
		password: { type: String, required: true, unique: false },
		status: { type: String, required: true, unique: false },
	},
	{
		collection: "UserData",
	}
);

export const userModel = mongoose.model("userModel", userSchema);
