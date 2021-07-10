  
import User from '../../Models/Users'
import bcrypt from 'bcryptjs'
require('dotenv').config()
import mongoose from 'mongoose'





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
     const {fName,lName,email,password} = req.body
     try{
        if(!fName || !lName || !email.includes("@") || !email.includes(".com") || !password){
          return res.status(422).json({error:"Invalid Input"})
        }
      const user = await User.findOne({email})
      if(user){
          return res.status(422).json({error:"User Exists"})
      }
     const hashedPassword = await bcrypt.hash(password,12)
     const newUser =  await new User({
         fName,
         lName,
         email,
         password:hashedPassword
     })
     newUser.save()
        res.status(201).json({message:"Registered"})
     }catch(err){
         console.log(err)
     }
}