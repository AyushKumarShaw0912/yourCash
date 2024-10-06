import express from "express"
import {isAuthenticated} from "../middlewares/auth.js"
import { createCategory, getAllCategories } from "../controllers/categoryController.js"

const router=express.Router()
router.route("/").post(createCategory).get(getAllCategories)


export default router