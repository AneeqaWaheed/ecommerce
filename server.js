import express from 'express'
import dotenv from 'dotenv';

//congigure env
dotenv.config();

//rest objects
const app = express()

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
    console.log(`Server running on ${process.env.dev_mode}${PORT}`);
})
