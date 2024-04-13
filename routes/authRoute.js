import express from 'express';
import {registerController, LoginController, testController, forgotPasswordController, resetPasswordController, updatePasswordController, updateProfileController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
//router object
const router = express.Router();


//routing
//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || METHOD POST
router.post('/login', LoginController);

//test routes
router.get('/test',requireSignIn, isAdmin, testController);

//protected  User route auth
router.get('/user-auth', requireSignIn, (req,res)=>{
    res.status(200).send({ok:true});
});

//forgot password 
router.post('/forgot-password', forgotPasswordController);

//reset password 
router.get('/reset-password/:id/:token', resetPasswordController);

//reset password || Method POST
router.post('/update-password/:id/:token', updatePasswordController);

//protected Admin route auth
router.get('/admin-auth', requireSignIn, isAdmin, (req,res)=>{
    res.status(200).send({ok:true});
});

//update profile

router.put('/update-profile/:id',requireSignIn, updateProfileController);

export default router;