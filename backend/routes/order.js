import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { orderModel } from "../models/schema.js";

//config
dotenv.config();
const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

//creat
router.post("/creat", async (req, res) => {
	try {
		const { ownerId, long, lat, status } = req.body;
		const result1 = await orderModel.find().sort({ id: -1 });
		const newOrder = new orderModel({ id: result1[0].id + 1, ownerId: ownerId, longtitude: long, latitude: lat, status: 1 });
		await newOrder.save();
		res.status(200);
		res.json({ message: "Order created." });
	} catch (err) {
		res.status(500);
		res.json({ message: "Server Error." });
	}
});

//getcart
router.post("/getcart", async (req, res) => {
	try {
		const { ownerId } = req.body;

		const findItemCon = {
			ownerId: ownerId,
			status: 1,
		};
		const result1 = await orderModel.find(findItemCon);
		console.log(result1);
		res.status(200);
		res.json({ data: result1 });
	} catch (err) {
		res.status(500);
		res.json({ message: "Server Error." });
	}
});

export default router;
