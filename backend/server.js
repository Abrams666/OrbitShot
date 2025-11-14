//import
import http from "http";
import url from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import orderRoutes from "./routes/order.js";

//config
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

//run;
mongoose
	.connect(process.env.DATABASE_CONNECTION_STRING)
	.then((con) => {
		console.log("Connected to MongoDB");
		//console.log(con.Connection);
	})
	.catch((err) => {
		console.error("Database connection error:", err.message);
	});

//listen
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
