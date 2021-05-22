/////////////////////////////////////////
// Dependencies
/////////////////////////////////////////
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const fileUpload = require('express-fileupload');
const siteRoute = require('./routes/siteRoute');




////////////////////////////////////////
// Configuration
////////////////////////////////////////
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(fileUpload());
app.use(express.static('public'));


////////////////////////////////////////
// Sub Routes
///////////////////////////////////////
app.use('/user', userRoute);
app.use('/list', siteRoute);




////////////////////////////////////////
// Database connection
////////////////////////////////////////
const dbName = process.env.DB_NAME;
const dbUserName = process.env.DB_USER_NAME;
const dbUserPass = process.env.DB_USER_PASS;
const port = process.env.PORT || 5000;
const url = `mongodb+srv://${dbUserName}:${dbUserPass}@cluster0.pa04j.mongodb.net/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(result => console.log('Database connected successfully'))
.catch(error => console.log('Database connect to failed'))


////////////////////////////////////////
// Server run
////////////////////////////////////////
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});