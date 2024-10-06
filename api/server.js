import app from "./app.js"
import {connectDb} from "./config/db.js"
import ErrorMiddleware from "./middlewares/error.js"


connectDb()


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`)
})
app.use(ErrorMiddleware)