import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from 'bcryptjs';

export default async function UserUpdate(req:Request,res:Response){
    try{
        const{name,username,email,password,profilepic,bio}=req.body;
        
        if(req.headers["userId"] && !Array.isArray(req.headers["userId"])){
            


            const currentUser=JSON.parse(req.headers["userId"]);
            if(req.params.id!=(currentUser._id).toString()){
               return res.json({message:"you cannot update other person's profile"});
            }
            const currentUserId=currentUser._id;
            let user=await User.findById(currentUserId);
            if(!user){
               return res.json({message:"user not found"});

            }
            if(password && user){
                const salt=await bcrypt.genSalt(10);
                const hashedPassword=await bcrypt.hash(password,salt);
                user.password=hashedPassword;

            }
            if(user){

                user.name=name || user.name;
                user.email=email || user.email;
                user.username=username || user.username;
                user.profilePicture=profilepic || user.profilePicture;
                user.bio=bio || user.bio;
                user=await user.save();
             return   res.json({message:"profile successfully updated",user});

            }


        }

    }catch(e){
       return res.json({message:"error in updating the user"})
    }
}