import express from 'express'
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

//congigure env
dotenv.config();

//database config
connectDB();

//rest objects
const app = express()

//middlewares
app.use(express.json())
app.use(morgan('dev'))

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
