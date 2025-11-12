import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

//config
dotenv.config();
const router = express.Router();

//register
router.post("/register", async (req, res) => {
	try {
		const { id, pwd } = req.body;
		const exist = await User.findOne({ id });
		if (exist) {
			res.status(400);
			res.json({ message: "The Account has already existed." });
			return;
		}

		const user = await User.create({ id, pwd });
		res.status(200);
		res.json({ message: "Succeed." });
	} catch (err) {
		res.status(500);
		res.json({ message: "Server Error:(" });
	}
});

//login
router.post("/login", async (req, res) => {
	try {
		const { id, pwd } = req.body;
		const user = await User.findOne({ id });
		if (!user || !(await user.matchPassword(password))) {
			res.status(401);
			res.json({ message: "Account or password is wrong." });
			return;
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
		res.json({ message: "Succeed.", token, id: user._id });
	} catch (err) {
		res.status(500);
		res.json({ message: "Server Error:(" });
	}
});

export default router;
