const Chat = require('../models/chat');
const { where } = require('sequelize');
const { Op } = require('sequelize');

exports.postChat= async(req, res, next)=>{
  try{
    console.log('message', req.body.text);
    console.log('id', req.user.id);

    await Chat.create({
        message: req.body.text,
        userId:req.user.id,
        userName:req.user.name,
        time: new Date().getTime()
    })
    res.status(201).json({message:'Successfully sent text'});
  } 
  catch(err){
    console.log(err);
    res.status(500).json({message: err, success:false})
  }
}

exports.getchat = async (req, res, next) => {
    try {
        const currentTime = req.query.currenttime;
    console.log(currentTime)
    const messages = await Chat.findAll({
      where:{
        time:{ [Op.gt] : currentTime }
      }
    });
    res.status(201).json({ success: true, message: messages });
  }
    catch (err) {
        res.status(500).json({ message: err, success: false })
    }
  }