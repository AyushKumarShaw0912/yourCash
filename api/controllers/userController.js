import {catchAsyncHandler} from "../middlewares/catchAsyncHandler.js"
import { User } from "../models/userModel.js";
import {sendToken} from "../utils/sendToken.js"
import ErrorHandler from "../utils/errorHandler.js"

export const register=catchAsyncHandler(async(req,res,next)=>{
    const {username,password}=req.body;
    if (!username  || !password)
        return next(new ErrorHandler("Please enter all fields", 400));
    let user=await User.findOne({username})
    if(user){
        return next(new ErrorHandler("User already exists",404));

    }
    user=await User.create({
        username,
        password,
    })
    sendToken(res, user, "Registration successful", 201)
})


export const login = catchAsyncHandler(async (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password)
        return next(new ErrorHandler("Please enter all field", 400));
    const user = await User.findOne({ username }).select("+password")
    if (!user) {
      return next(new ErrorHandler("Incorrect username or password",404))
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch) return next(new ErrorHandler("Incorrect username or password", 404))
    sendToken(res, user, `Welcome back ${user.username}`, 200)

})
export const logout = catchAsyncHandler(async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
    }).json({
        success: true,
        message: "Logout successful"
    })
})

export const authCheck=catchAsyncHandler(async(req,res,next)=>{
    if(!req.user){
       return next(new ErrorHandler("Authentication failed",404))
    }
    res.status(200).json({ success: true, user: req.user });
})