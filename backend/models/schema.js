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

const orderSchema = new mongoose.Schema(
	{
		id: { type: Number, required: true, unique: true },
		ownerId: { type: Number, required: true, unique: false },
		longtitude: { type: String, required: true, unique: false },
		latitude: { type: String, required: true, unique: false },
		status: { type: Number, required: true, unique: false },
	},
	{
		collection: "OrderData",
	}
);

export const userModel = mongoose.model("userModel", userSchema);
export const orderModel = mongoose.model("orderModel", orderSchema);
