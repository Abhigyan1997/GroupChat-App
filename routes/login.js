const express=require('express');

const router=express.Router();
const logincontroller=require('../controller/login');



router.post('/users/login',logincontroller.login);
module.exports =router;