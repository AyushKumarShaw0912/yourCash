import {catchAsyncHandler} from "../middlewares/catchAsyncHandler.js"
import { Category } from "../models/categoryModel.js"
import ErrorHandler from "../utils/errorHandler.js"

export const createCategory=catchAsyncHandler(async(req,res,next)=>{
    const {name,subcategories}=req.body
    if(!name) return next(new ErrorHandler("Please fill out all fields",404))
    let category=await Category.findOne({name})
if(category) return next(new ErrorHandler("Category already exists",404))
     category=await Category.create({
        name,
        subcategories:subcategories||[]
    })
    res.status(201).json({
        success:true,
        category
    })
})
export const getAllCategories=catchAsyncHandler(async(req,res,next)=>{

    const categories=await Category.find({})
    res.status(200).json({
        success:true,
        categories
    })
})
// export const getSubCategories=catchAsyncHandler(async(req,res,next)=>{
//     const {category}=req.params
//     if(!category) return next(new ErrorHandler("Query is empty",404))
    
    
// })