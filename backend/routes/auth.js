import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userModel } from "../models/schema.js";

//config
dotenv.config();
const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET;

//register
router.post("/register", async (req, res) => {
	try {
		const { account, pwd } = req.body;

		const checkAccCon = {
			account: account,
		};

		let result1 = await userModel.findOne(checkAccCon);
		if (result1 != null) {
			res.status(400);
			res.json({ message: "The Account has already existed." });
			return;
		}

		let result2 = await userModel.find().sort({ id: -1 });

		const newUser = new userModel({ id: result2[0].id + 1, account: account, password: pwd, status: "active" });
		await newUser.save();

		const token = jwt.sign({ id: result2[0].id + 1, name: newUser.account }, SECRET_KEY, { expiresIn: "1h" });
		res.status(201);
		res.json({ message: "Succeed.", token });
	} catch (err) {
		res.status(500);
		res.json({ message: "Server Error." });
	}
});

//login
router.post("/login", async (req, res) => {
	try {
		const { account, pwd } = req.body;

		const checkAccCon = {
			account: account,
		};
		const result1 = await userModel.findOne(checkAccCon);
		if (!result1) {
			res.status(401);
			res.json({ message: "Account is not found." });
			return;
		}

		const checkAccPwdCon = {
			account: account,
			password: pwd,
		};
		const result2 = await userModel.findOne(checkAccPwdCon);
		if (!result2) {
			res.status(401);
			res.json({ message: "Password is wrong." });
			return;
		}

		const token = jwt.sign({ id: result2.id, name: result2.account }, SECRET_KEY, { expiresIn: "1h" });
		res.status(200);
		res.json({ message: "Succeed.", token });
	} catch (err) {
		res.status(500);
		res.json({ message: "Server Error." });
	}
});

router.post("/verify", async (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader) {
		res.status(400);
		res.json({ message: "Token not found." });
		return;
	}

	const token = authHeader.split(" ")[1]; // 去掉 "Bearer"

	try {
		const tokenDecoded = jwt.verify(token, SECRET_KEY);
		res.status(200).json({
			message: "Token is ok.",
			decodedToken: tokenDecoded,
		});
	} catch (err) {
		console.log("Verify Error:", err);
		res.status(401).json({ message: "Token is invalid." });
	}
});

export default router;
