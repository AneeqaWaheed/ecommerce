import express from 'express'
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js';
//congigure env
dotenv.config();

//database config
connectDB();

//rest objects
const app = express()

//middlewares
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category",categoryRoute);
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/product", productRoute);
//rest api
app.get('/',(req,res)=>{
    res.send(
        "<h1>Welcomw to ecommerce app</h1>"
    )
})
//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT,()=>{
    console.log(`Server running on ${process.env.dev_mode} mode on ${PORT}`);
})
