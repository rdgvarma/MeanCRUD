const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create ninja Schema & model
const dataschema = new Schema({
    adminrole :'string',
    userID :'number', 
    userName:'string', 
    pwd:'string',  
    role:'string',  
    address:'string',
    phone:'number',
})
//here the formdata
const Formdata = mongoose.model('datas',dataschema);
module.exports = Formdata;