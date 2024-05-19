import express, { Request, Response } from 'express';
import signup from '../controller/Signup';
import Login from '../controller/Login';
import Logout from '../controller/Logout';
import Follow from '../controller/FollowUser';
import middleware from '../middleware/middleware';
import UserUpdate from '../controller/UserUpdate';

const userRouter=express.Router();


userRouter.get('/test',(req:Request,res:Response)=>{
    res.json({message:"test route"});
})

userRouter.post('/signup',signup);
userRouter.post('/login',Login);
userRouter.post('/logout',Logout);
userRouter.post('/follow/:id',middleware,Follow);
userRouter.put('/update/:id',middleware,UserUpdate);

export {userRouter};