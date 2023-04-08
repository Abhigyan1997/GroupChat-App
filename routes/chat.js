const express=require('express');

const router=express.Router();
const chatcontroller=require('../controller/chat');

const auntheticateController=require('../middleware/auth');

router.post('/chat',auntheticateController.authenticate,chatcontroller.postChat);
router.get('/chat',chatcontroller.getchat);
module.exports=router