import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
import nodemailer from 'nodemailer';
//registration
export const registerController =async(req,res) =>{
    try{
        const {firstName,lastName, dob, gender, email, password} = req.body;
        if(!firstName){
            return res.send({message:'FirstName is Required'})
        }
        if(!lastName){
            return res.send({message:'lastName is Required'})
        }
        if(!dob){
            return res.send({message:'dob is Required'})
        }
        if(!gender){
            return res.send({message:'gender is Required'})
        }
        if(!email){
            return res.send({message:'email is Required'})
        }
        if(!password){
            return res.send({message:'password is Required'})
        }
        //check user
        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success: false,
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
//login

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
                role: user.role,
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
//test controller
export const testController = (req,res) =>{
    res.send('Protected routes');
}

//forget password
export const forgotPasswordController =async(req,res)=>{
    const {email} = req.body;
    try{
        const oldUser = await userModel.findOne({email})
        if(!oldUser){
            return res.send("User Not Exists!!");
        }
    const secret = process.env.JWT_SECRET + oldUser.password;
    const token = JWT.sign({email: oldUser.email, id: oldUser._id}, secret, {
        expiresIn: "5m",
    });
    const link = `http://localhost:8080/api/v1/auth/reset-password/${oldUser._id}/${token}`;
    console.log(link);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
      });
      
      var mailOptions = {
        from: 'test@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: link,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
    res.status(200).send({
        success:true,
        message: "Forgot Password",
        link,
    })
    }
    catch(error){
        console.log(error);

    }
}
// reset password
export const resetPasswordController = async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await userModel.findOne({ _id: id });
    if (!oldUser) {
        return res.send({
            status: true,
            message: "User not Exists",
        });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
        const verify = JWT.verify(token, secret);
        return res.send("Verified");
        
    } catch (error) {
        console.log(error);
        return res.send({
            success: "False",
            error,
            message: "Not Verified",
        });
    }
};

// Update password
export const updatePasswordController = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    console.log(req.params);
    const oldUser = await userModel.findOne({ _id: id });
    if (!oldUser) {
        return res.send({
            status: true,
            message: "User not Exists",
        });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
        const verify = JWT.verify(token, secret);
        const encryptedPassword = await hashPassword(password);
        await userModel.updateOne(
            {
                _id: id,
            },
            {
                $set:{
                    password: encryptedPassword,
                }
            }
        )
        res.send("Updated");
        
    } catch (error) {
        console.log(error);
        res.send({
            success: "False",
            error,
            message: "Something went Wrong",
        });
    }
};

//update profile

export const updateProfileController = async (req, res) => {
    try {
        const { firstName, lastName, dob, gender, email, password } = req.body;
        const user = await userModel.findById(req.params.id);

        // Password
        if (password && password.length < 6) {
            return res.json({ error: 'Password must be at least 6 characters long' });
        }

        const hashedPassword = password ? await hashPassword(password) : undefined;

        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, {
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            dob: dob || user.dob,
            gender: gender || user.gender,
            email: email || user.email,
            password: hashedPassword || user.password,
        }, { new: true });

        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updatedUser
        });
    } catch (error) {
        console.log(error);
        res.send({
            success: false,
            error,
            message: "Error while updating profile",
        });
    }
};
