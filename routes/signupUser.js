import express from "express";
import { generateAuthToken, User } from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/",async(req,res)=>{
    try {
        let user = await User.findOne({email:req.body.email})

        if(user){
            return res.status(409).json({message:"E-mail already exists!"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        user = await new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword //modified Password
        }).save()
       
        const token = await generateAuthToken(user._id);
        res.status(201).json({Authtoken:token})
    } catch (error) {
        // console.log(error)
        res.status(500).send({ message: "Internal Server Error"});

    }
})
export const signupRouter = router; 

