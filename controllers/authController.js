import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
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
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error in Registeration',
            error
        })
    }
};

export const LoginController = async(req,res) => {
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message: 'Invalid email or password'
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Email is not registered '
            })
        }
        const match = await comparePassword(password, user.password )
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password"
            })
        }
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET,{
            expiresIn: "7d",
        });
        res.status(200).send({
            success:true,
            message: "Login Sucessfully",
            user:{
                firstName: user.firstName,
                lastName: user.lastName,
                dob: user.dob,
                email: user.email,
                gender: user.gender,
                },
                token,
        })

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Login failed",
            error
        })
    }
};

export const testController = (req,res) =>{
    res.send('Protected routes');
}