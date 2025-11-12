//import
const http = require("http");
const url = require("url");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const app = express();
import authRoutes from "./routes/auth.js";

//config
dotenv.config({ path: ".env" });
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
