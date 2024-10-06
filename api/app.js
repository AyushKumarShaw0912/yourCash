import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path"
import ErrorMiddleware from "./middlewares/error.js"





const app=express()
dotenv.config()
//middlewares
app.use(express.json())

  app.use(cors(corsOptions));
app.use(cookieParser())

//import routes
import userRoutes from "./routes/userRoutes.js"
import expenseRoutes from "./routes/expenseRoutes.js"
import categoryRouter from "./routes/categoryRoutes.js"

app.use("/api/v1",userRoutes)
app.use("/api/v1/expense",expenseRoutes)
app.use("/api/v1/category",categoryRouter)
// const __dirname = path.resolve();


// 	app.use(express.static(path.join(__dirname, "/client/dist")));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
// 	});


export default app
app.use(ErrorMiddleware)
