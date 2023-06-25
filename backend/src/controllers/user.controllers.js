const { findByIdAndDelete } = require('../models/userModel');
const userModel = require('../models/userModel');

const usersCtrl = {};


usersCtrl.getUsers = async (req, res)=> {

    const users = await userModel.find();

    res.json(users);
};



usersCtrl.createUsers = async (req, res)=> {

    const {userName, userTeam,} = req.body;
    const newUser = new userModel (
        {
        userName: userName,
        userTeam: userTeam
        }
    );

        await newUser.save();

    res.json({message: 'New user created'})
};



//With ID input:

usersCtrl.getUser = async (req, res)=> {

    const idUser = await userModel.findById(req.params.id)

    res.json(idUser);
};

usersCtrl.updateUsers = async (req, res)=> {

        const {userName, userTeam}= req.body;
    await userModel.findByIdAndUpdate(req.params.id, {
        userName : userName,
        userTeam: userTeam
    });
    res.json({message:'User UPDATED'});
};

usersCtrl.deleteUsers= async(req, res)=> {

    await userModel.findByIdAndDelete(req.params.id);    
    res.json({message:'Users DELETED'});
};

module.exports= usersCtrl;