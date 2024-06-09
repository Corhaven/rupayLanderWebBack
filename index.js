const dotenv = require("dotenv")
const express = require("express")
const connect = require("./db.js")
const cors = require("cors")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const venderRouter = require("./vendor/venderRoutes.js")
const loanRouter = require("./loans")
const authRouter = require("./auth/authRoutes.js")
const app = express()
dotenv.config()
connect()
///// middleware
app.use(express.json({ limit: '100mb' }))
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(morgan("dev"));


 ////////////// routes 
app.use("/api",venderRouter)
app.use("/auth",authRouter)
app.use("/loans",loanRouter)
app.get("/",(req,res)=>{
    res.send("welcome in rupay lender website")
})
const port = process.env.PORT
app.listen(port,()=>{
    console.log("app is working",port)
})