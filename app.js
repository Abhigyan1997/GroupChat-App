const path = require('path');
const fs=require('fs');
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');

const sequelize=require('./util/database');
const User=require("./models/signup");
const chats=require('./models/chat');
const Group = require('./models/group');
const UserGroup = require('./models/usergroup');


var cors =require('cors');

const app = express();

app.use(cors());

const usersrouteRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login');
const chatRoute=require("./routes/chat")
const groupRoute = require('./routes/group');
const groupChatRoute = require('./routes/groupchat');

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));



app.use(usersrouteRoutes);
app.use(loginRoutes);
app.use('/users',chatRoute)
app.use(groupRoute);
app.use(groupChatRoute);


User.hasMany(chats)
chats.belongsTo(User)

User.belongsToMany(Group, {through:'usergroup'});
Group.belongsToMany(User,{through:'usergroup'})



sequelize
.sync({alter:true})
// .sync({force: true})
.then(result=>{
   app.listen(4000);
})
.catch(err=>{
    console.log(err);
}); 