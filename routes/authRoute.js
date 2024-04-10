import express from 'express';
import {registerController, LoginController} from '../controllers/authController.js';
//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post('/register', registerController);

//LOGIN || METHOD POST
router.post('/login', LoginController);


export default router