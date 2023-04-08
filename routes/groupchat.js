const express = require('express');
const groupControllers = require('../controller/groupchat');
const authenticateControllers = require('../middleware/auth');

const router = express.Router();

router.get('/groupusers/getname',groupControllers.getGroupUser);
router.post('/group/removemember', authenticateControllers.authenticate,groupControllers.removeuser);
router.post('/group/makememberadmin',authenticateControllers.authenticate,groupControllers.makememberadmin);


module.exports = router;