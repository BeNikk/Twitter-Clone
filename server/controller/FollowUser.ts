import { Request,Response } from "express";
import User from "../models/userModel";
export default async function Follow(req:Request,res:Response){
    try{
        const {id}=req.params;
        if(req.headers["userId"] && !Array.isArray(req.headers["userId"])){
            //console.log(req.headers["userId"]);
            const userToModify=await User.findById(id);


            const currentUserInfo=JSON.parse(req.headers["userId"]);
            
            const currentUser=await User.findById(currentUserInfo._id);
            
            if(id==currentUserInfo._id){//objects needed to be equated using _.isequal, (simply equated they will give false)
             res.json({message:"you cannot follow unfollow yourself"});
                
    
            }
            else{

                if(currentUser && userToModify){
                    const alreadyFollowing=currentUser.following.includes(id);
                    if(alreadyFollowing){
                        //unfollow
                        await User.findByIdAndUpdate(currentUserInfo._id,{ $pull:{following:id}});
                        await User.findByIdAndUpdate(userToModify._id,{$pull:{followers:currentUserInfo._id}});

                        res.json({message:"user successfully unfollowed"});
                    }
                    else{
                        await User.findByIdAndUpdate(currentUserInfo._id,{$push:{following:userToModify._id}});
                        await User.findByIdAndUpdate(userToModify._id,{$push:{followers:currentUserInfo._id}});
                        res.json({message:"user successfully followed"});
                    }
                }

            }
        }
        else{
            res.json({message:"unauthorized/invalid user header"});
        }

        //const currentUser=await User.findById(id);

    }catch(e){
        console.log('error in follow and unfollow ');
    }
}