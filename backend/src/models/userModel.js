const {Schema, model} = require('mongoose');

const usersSchema = new Schema({
    userName:{
        type: String,
        required: true,
        trim: true
        
    },
    userTeam: {
        type: String
    }
    
},
{
    timestamps : true,
});

module.exports= model('User', usersSchema);