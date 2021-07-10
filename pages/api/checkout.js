const stripe = require("stripe")("sk_test_51JBOh0SHwvTbY5SOiW53wwwzEkhhF22g7ZawFUivgvYGqgJUwfCYQq9JHkHuhvKWDZkhdbuE7Hqfv0sZaGvAOsow008lY92sJz");
import { v4 as uuidv4 } from 'uuid';
import User from '../../Models/Users'
require('dotenv').config()
import mongoose from 'mongoose'

export default async (req,res)=>{
    let error;
    let status;
    try {
      const { token } = req.body;
      console.log(token)
  
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id
      });
  
      const idempotencyKey = uuidv4();
      const charge = await stripe.charges.create(
        {
          amount: 100 * 100,
          currency: "inr",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased the`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip
            }
          }
        },
        {
          idempotencyKey
        }
      );
      console.log("Charge:", { charge });
      if(status = "succeeded"){
        mongoose.connect(process.env.mongoDB, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
          }, (err) => {
            if (err) throw err;
            console.log("Connected To Mongo")
          });
          
          
          mongoose.set("useCreateIndex", true);
         const user = await User.updateOne({email: "puneetkathar1@gmail.com"}, {paymentStatus: true})
         console.log(user.nModified)
      }
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }
  
    res.json({ error, status });
}
