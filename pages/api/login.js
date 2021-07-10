  
import User from '../../Models/Users'
import bcrypt from 'bcryptjs'
require('dotenv').config()
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'





export default async (req,res)=>{
    mongoose.connect(process.env.mongoDB, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      }, (err) => {
        if (err) throw err;
        console.log("Connected To Mongo")
      });
      
      
      mongoose.set("useCreateIndex", true);
    const {email,password} = req.body
    try{
       if(!email || !password){
         return res.status(422).json({error:"Invalid Input"})
       }
     const user = await User.findOne({email})
     if(!user){
         return res.status(404).json({error:"No User Found"})
     }
       const doMatch =  await bcrypt.compare(password,user.password)
       if(doMatch){
         if(user.approvedStatus){
          const token =  jwt.sign({userId:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        })
        const {fName, lName,email} = user
        res.status(201).json({token,user:{fName, lName, email}})
         } else {
          return res.status(401).json({error:"Not Approved"})
         }

       }else{
          return res.status(401).json({error:"Invalid Input"})
       }
    }catch(err){
        console.log(err)
    }
}