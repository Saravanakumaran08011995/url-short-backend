import express from "express";
import { generateAuthToken, User } from "../models/user.js";
import bcrypt from "bcrypt"

const router = express.Router()

router.post("/",async(req,res)=>{

    try {
        
        const user = await User.findOne({email:req.body.email})

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"})
        }
    
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        )
    
        if(!validPassword){
            return res.status(400).json({message:"Invalid Credentials :- Incorrect password"})
        }

        const token = await generateAuthToken(user._id)
        res.status(200).json({message:"LoggedIn Successfully   ",token})
    } catch (error) {
        
        console.log(error)
        res.status(500).send(error);
    }
    

})

export const loginRouter = router