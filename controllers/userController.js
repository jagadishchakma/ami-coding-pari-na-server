/////////////////////////////////////////
// Dependencies
/////////////////////////////////////////
const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

//////////////////////////////////////////
// Create a schema model
//////////////////////////////////////////
const Users = new mongoose.model('user', userSchema);


/////////////////////////////////////////
// users sign up
/////////////////////////////////////////
async function UserSignUp(req, res){
    const userExist = await Users.find({email: req.body.email});
    if(userExist.length < 1){
        try{
            const {name, email, password} = req.body;
            const file = req.files.photo;
            // hash password
            const hashPassword = await bcrypt.hash(password, 10);
    
            // file upload
            const fileSplit = file.name.split('.');
            const fileExt = fileSplit[fileSplit.length - 1];
            const fileName = uuidv4() +"."+ fileExt;
            const dir = __dirname.replace('controllers', 'public\\images\\') + fileName;
            await file.mv(dir);
    
            // generate token
            const privateKey = process.env.SECRET_KEY;
            const token = await jwt.sign({name, email}, privateKey);
    
            // data save
            const newUser = new Users({name, email, password: hashPassword, photo: fileName, token});
            await newUser.save();
            res.status(200).json({n_udfjjdglskkjfdgjjkj: name, p_jfkdsjfksdjljdslk: fileName, token});
        }catch{
            res.status(400).json({status: 'Signup Failed'});
        }
    }else{
        res.status(400).json({status: 'user exist'});
    }
    
}


////////////////////////////////////////
// Users signin
////////////////////////////////////////
async function UserSignIn(req, res){
    const userFind = await Users.find({email: req.body.uemail});
    const checkPassword = await bcrypt.compare(req.body.upassword, userFind[0].password);
    if(userFind.length === 1 && checkPassword){
        // generate token 
        const privateKey = process.env.SECRET_KEY;
        const token = await jwt.sign({name: userFind[0].name, email: req.body.uemail}, privateKey);
        res.status(200).json({status: 'success', name: userFind[0].name, photo: userFind[0].photo, token});
    }else{
        res.status(501).json({status: 'error'});
    }
}



////////////////////////////////////////
// get user list
////////////////////////////////////////
async function GetAllUser(req, res){
    const users = await Users.find({});
    res.status(200).json(users);
}

module.exports = {UserSignUp, UserSignIn, GetAllUser};