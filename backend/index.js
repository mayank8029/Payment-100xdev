const express = require("express");
const app = express()
const connectDatabase = require("./config/db")
const port = 5000 ;
const cors = require("cors")

app.use(cors())
app.use(express.json())
connectDatabase();

  


const userRoutes = require("./routes/userRoutes")
const paymentRoutes = require("./routes/paymentRoutes")



app.use("/api/v1/user", userRoutes)
app.use("/api/v1/user/payment" ,paymentRoutes)

app.listen(port , ()=>{
    console.log(`backend is connected at ${port}`)
})

 



