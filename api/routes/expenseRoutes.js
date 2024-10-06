import express from "express"
import {isAuthenticated} from "../middlewares/auth.js"
import { createExpense, deleteTransaction, getExpense, updateTransaction } from "../controllers/expenseController.js"



const router=express.Router()

router.route("/").post(isAuthenticated,createExpense).get(isAuthenticated,getExpense)
router.route("/delete/:id").delete(isAuthenticated,deleteTransaction)
router.put("/update/:id",isAuthenticated,updateTransaction)


export default router