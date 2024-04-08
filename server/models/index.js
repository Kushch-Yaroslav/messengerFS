// Connect to mongo
const mongoose = require('mongoose');
const db = process.env.ENV_MODE || "development";
const CONFIG = require('../config/db.json')[db];
const User = require('./User');
const Chat = require('./Chat');
const Message = require('./Message');
const RefreshToken = require('./RefreshToken');

mongoose
.connect(`mongodb://${CONFIG.host}:${CONFIG.port}/${CONFIG.database}`)
.catch(error => {
    console.log(error);
    process.exit(1);
})

module.exports = {
    User, Chat, Message, RefreshToken
}