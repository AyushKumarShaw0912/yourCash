import mongoose, { Schema } from "mongoose";

const expenseSchema=new mongoose.Schema({
    amount:{
        type:Number,
        required:[true,"Amount is required"]
    },
    userId:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["Expense","Income"],
        required:true,
    },
    description:{
        type:String,
    },
    category:{
        type:String,
        required:[true,"category is required"]
    },
    subcategory:{
        type:String
    },
    paymentType:{
        type:String,
        enum:["Cash","Card","UPI","Cheque","Bank Transfer"],
        required:true,
    },
    Date:{
        type:Date,
        required:true
    }
})

export const Expense=mongoose.model("Expense",expenseSchema)