import {catchAsyncHandler} from "../middlewares/catchAsyncHandler.js"
import ErrorHandler from "../utils/errorHandler.js"
import { User } from "../models/userModel.js";
import {Expense} from "../models/expenseModel.js"


export const createExpense=catchAsyncHandler(async(req,res,next)=>{
    const {amount,type,category,description,paymentType,subcategory,date}=req.body
    if(!amount||!type||!category||!paymentType||!date) return next(new ErrorHandler("Please fill all fields",404))
    const expense=await Expense.create({
        amount,
        type,
        description,
        category,
        paymentType,
        subcategory,
        Date:new Date(date),
        userId:req.user._id
    })
    res.status(201).json({
        success:true,
        expense
    })
})
export const getExpense=catchAsyncHandler(async(req,res,next)=>{
    const userId=req.user._id
    let transactions=[]
    let income=0;
    let expenditure=0;
    transactions=await Expense.find({userId})
    if(transactions.length>0){
        for( let i=0;i<transactions.length;i++){
            if(transactions[i].type==="Expense") expenditure+=transactions[i].amount
            else income+=transactions[i].amount

        }
    }
    const user=await User.findById(userId)
    user.balance=income-expenditure
    await user.save()
    res.status(200).json({
        success:true,
        transactions,
        balance:user.balance
    })

})
export const deleteTransaction=catchAsyncHandler(async(req,res,next)=>{
    const {id}=req.params
    const transaction=await Expense.findById(id)
    if(!transaction) return next(new ErrorHandler("Invalid id",404))
    const user=await User.findById(req.user._id)
    const userId=req.user._id
    if(transaction.userId==userId){
        if(transaction.type==="Income") user.balance-=transaction.amount
        else user.balance+=transaction.amount
        await transaction.deleteOne()
       await user.save()

    }else{
        return next(new ErrorHandler("Bad request",404))
    }
    res.status(200).json({
        success:true,
        message:"Deleted successfully",
       balance:user.balance
    })
})
export const updateTransaction=catchAsyncHandler(async(req,res,next)=>{
    const transaction=await Expense.findById(req.params.id)
    const userId=req.user._id
    if(transaction?.userId==userId){
        await transaction.updateOne({$set:req.body}) 
        await transaction.save()
    res.status(200).json({
        success:true,
        message:"Updated successfully" ,

    }) 
}else{
    next(new ErrorHandler("Bad request",404))
}
})