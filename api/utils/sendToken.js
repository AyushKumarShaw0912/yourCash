export const sendToken=(res,user,message,status=200)=>{
    const token=user.getJWTToken()
    const options={
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    secure: true,  // Ensure Secure is set, especially for HTTPS
    sameSite: 'None',
    domain:".https://yourcash-api.onrender.com" 
    }
    res.status(status).cookie("token",token,options).json({
        success: true,
        message,
        user,
        token
    })
    }