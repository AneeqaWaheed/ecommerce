import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
export const registerController =async(req,res) =>{
    try{
        const {firstName,lastName, dob, gender, email, password} = req.body;
        if(!firstName){
            return res.send({error:'FirstName is Required'})
        }
        if(!lastName){
            return res.send({error:'lastName is Required'})
        }
        if(!dob){
            return res.send({error:'dob is Required'})
        }
        if(!gender){
            return res.send({error:'gender is Required'})
        }
        if(!email){
            return res.send({error:'email is Required'})
        }
        if(!password){
            return res.send({error:'password is Required'})
        }
        //check user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success: true,
                message:'Already Register Please login'
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save 
        const user = await new userModel({firstName,lastName, dob, gender, email, password:hashedPassword}).save()
        res.status(201).send({
            success:true,
            message: 'User Register Sucessfully',
            user

        })

    }
    catch(error){
        console.log(eror)
        res.status(500).send({
            success: false,
            message:'Error in Registeration',
            error
        })
    }
};

