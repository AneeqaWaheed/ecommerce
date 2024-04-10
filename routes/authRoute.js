import express from 'express';
import {registerController, LoginController, testController} from '../controllers/authController.js';
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


export default router