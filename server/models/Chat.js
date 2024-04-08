const {Schema, model} = require('mongoose');

const chatSchema = new Schema({
    name: String,
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
    
})

const Chat = model('Chat', chatSchema);

module.exports = Chat;


/*

TODO: unique user in chats. Now one user can be participant not once.

*/