  
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
    const {email} = req.body
    try{
     const user = await User.findOne({email})
           res.send(user)
    }catch(err){
        console.log(err)
    }
}