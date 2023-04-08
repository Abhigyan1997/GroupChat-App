const user = require('../models/signup');
const bcrypt=require('bcrypt');


exports.signup= async (req , res)=>{
    try{
    const{name, email, phone, password}=req.body;
    if(name===undefined||name.length===0||email==null||email.lenght===0||phone===undefined||phone.length===0||password==null||password.length===0){
        return res.status(400).json({err:'Bad Paramete,Something is missing'})

    }
    const saltrounds=10;
    bcrypt.hash ( password,saltrounds,async(err , hash)=>{
      console.log(err);
      await user.create({name,email,phone,password:hash})
      res.status(201).json({message:"Succesfully created new user"})
    })
  }
  catch(err){
    res.status(500).json(err);
  }
  }