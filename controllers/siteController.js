//////////////////////////////////////
// Dependencies
/////////////////////////////////////
const mongoose = require('mongoose');
const siteSchema = require('../schemas/siteSchema');
const userSchema = require('../schemas/userSchema');




/////////////////////////////////////
// Create a list model
////////////////////////////////////
const Lists = new mongoose.model('list', siteSchema);
const Users = new mongoose.model('user', userSchema);


////////////////////////////////////
// Create data list
////////////////////////////////////
async function InsertData(req, res){
    try{
        const user = await Users.find({email: req.email});
        const userId = user[0]._id;
        // list save
        const newList = new Lists({userId, payload: req.body, status: 'success'});
        await newList.save();
        res.status(200).json({status: 'success'});
    }catch{
        res.status(401).json({status: 'error'});
    }
};



//////////////////////////////////
// Get user data list
//////////////////////////////////
async function GetData(req, res){
    const userId = req.query.user_id;
    const lists = await Lists.find({userId: userId});
    res.status(200).json(lists);
}



//////////////////////////////////
// Get all data list
//////////////////////////////////
async function GetAllData(req, res){
    const lists = await Lists.find({});
    res.status(200).json(lists);
}

module.exports = {InsertData, GetData, GetAllData};