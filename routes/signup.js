const path= require('path');

const express=require('express');



const router=express.Router();

const userscontroller=require('../controller/signup');
router.post('/users/signup',userscontroller.signup);

module.exports=router;