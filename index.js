const express = require("express")
const {connect} = require("./db");
const { userRouter } = require("./Routes/user.route");

const app = express();

require("dotenv").config()
app.use(express.json())
app.use("/api",userRouter);

app.listen(process.env.PORT,async()=>{
    try {
        await connect
        console.log("Connect To DB")
    } catch (error) {
        console.log(error.message)
    }
    console.log("Server is running at port:",process.env.PORT)
})
