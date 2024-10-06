export const sendToken=(res,user,message,status=200)=>{
    const token=user.getJWTToken()
    const options={
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
       
    }
    res.status(status).cookie("token",token,options).json({
        success: true,
        message,
        user,
        token
    })
    }