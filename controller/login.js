const signup=require('../models/signup');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

function isstringinvalid(string){
  if(string == undefined || string.length === 0){
       return true
  }
  else{
      return false
  }
}

function generateToken(id,name){
  return jwt.sign({userid:id,name:name},'SecretKey');
}


exports.login= async (req,res,next)=>{
  try{
       const {email,password }=req.body

      if(isstringinvalid(email) || isstringinvalid(password)){
        return res.status(400).json({error:"All fields are required"})
        }

      const user=await signup.findAll({where : {email}})
      if(user.length>0){
          bcrypt.compare(password,user[0].password,(err,result)=>{
           if(err){
             res.status(500).json({  message:"something went wrong"})
           }
           else if(result===true){
           res.status(201).json({ success: true, message:"user logged successfully",token:generateToken(user[0].id,user[0].name)})
           }
           else{
           res.status(401).json({ success: false, message:"incorrect password"})
              }
           }
         )}
      else{
        res.status(404).json({success:false, message: "User not found"})
      }

  }
  catch(err){
      console.log(err)
     res.status(500).json({message: err, success:false})
  }
}
