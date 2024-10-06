import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";





const app=express()
dotenv.config()
//middlewares
app.use(express.json())
const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
  };
  app.use(cors(corsOptions));
app.use(cookieParser())

//import routes
import userRoutes from "./routes/userRoutes.js"
import expenseRoutes from "./routes/expenseRoutes.js"
import categoryRouter from "./routes/categoryRoutes.js"

app.use("/api/v1",userRoutes)
app.use("/api/v1/expense",expenseRoutes)
app.use("/api/v1/category",categoryRouter)


export default app
