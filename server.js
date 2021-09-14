const bodyParser = require ('body-parser');
const express = require('express');
const cors = require('cors');
const Formdata = require('./nodemodels/formdata');
const mongoose = require('mongoose');
const assert = require('assert');
var ObjectId = require('mongoose').Types.ObjectId;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     
    extended: true  // to support URL-encoded bodies
}));
var url = "mongodb://192.168.1.55:27017/gopal";
//connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect(url, { useNewUrlParser: true,useFindAndModify: false });
//node port number
const PORT = 3003;
const packt={};

app.use(express.static(__dirname+'/dist/pjt1'));


//***post form data to the database starts here
    app.post('/api/employee/enrolment',function(req,res){
        console.log(req.body);
            var u = new Formdata({
                userID: req.body.userID,
                userName: req.body.userName,
                pwd : req.body.pwd,
                role : req.body.role,
                address : req.body.address,
                phone : req.body.phone
            });
            //saving user to mongodb
            u.save(function(err) {
                if (err) throw err;
                else 
                console.log('save user successfully...');
            });
            res.status(200).send({'message':'data received '})
    });
//***post form data to the database ends here


//***find by id and update the details of document by Object ID starts 
        app.put('/api/employee/enrolment/updated-data',function(req,res){
            console.log("server first line : "+req.body);
                var emp = {
                userID : req.body.userID, 
                userName: req.body.userName, 
                pwd: req.body.pwd,
                role: req.body.role,
                address: req.body.address,
                phone: req.body.phone,
                }
                var myval=(emp.userID);
                console.log("typeof"+typeof(emp.userID));
                console.log("in line 59 myval : "+myval);
                //findOneAndUpdate
                
            //     Formdata.findByIdAndUpdate(myval, { $set: emp }, { new: true }, (err, doc) => {
            //         if (!err) { res.send(doc); }
            //         else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); 
            //     }
            // });
            var myquery = { userID: myval };
            var newvalues = emp;
            Formdata.updateOne(myquery,newvalues,function(err,res){
                if (err) throw err;
                console.log("1 document updated");
                
            })

            res.status(200).send({'message':'data received '})

        })
//***find by id and update the details of document by Object ID ends 





//*** get all the form data from database starts here
    app.get('/api/employee/all',(req,res)=>{
        console.log("line no 64 testing..");
        Formdata.find({}).exec().then((datas)=>{
            console.log(datas);
            res.json(datas);
        })
        .catch((err)=>{
            res.send('error occured');
        });
    });
//**  get all the form data from database ends here **

//*** get the single doc by using id

    app.get("/api/employee/getsingle-data-by-userid/:id",function(req,res,err){
        console.log("this msg is from  getsingle-data-by-userid : "+req.params.id);
        //res.status(200).send({'message':'data received '});
        var myquery = {  userID : req.params.id };
        Formdata.findOne(myquery,function(err,doc){
          if(!err){
              console.log(doc);
          }else{ coscole.log("there is an error occured : "+err)}
        })
        console.log("testing the data 1 2 3 : "+ this.packt);
    })

       
//*** get the single doc by using id

//*** get the single doc by using Object id of mongo db
        // app.get("/api/employee/all/:id",(req,res)=>{
        //     console.log(req.params.id);
        //     if (!ObjectId.isValid(req.params.id))
        //         return res.status(400).send(`No record with given id : ${req.params.id}`);

        //     Formdata.findById(req.params.id, (err, doc) => {
        //         if (!err) { res.send(doc); }
        //         else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2)); }
        //     });
        // })
//*** get the single doc by using Object id of mongo db

//***find by id and update the details of document by Object ID starts 
        // app.put('/api/employee/update/:id',(req,res)=>{
        //     console.log(req.params.id);
        //     if (!ObjectId.isValid(req.params.id))
        //         return res.status(400).send(`No record with given id : ${req.params.id}`);
        //         var emp = {
        //         userID : req.body.userID, 
        //         userName: req.body.userName, 
        //         pwd: req.body.pwd,
        //         role: req.body.role,
        //         address: req.body.address,
        //         phone: req.body.phone,
        //         }
        //         //findOneAndUpdate
        //         Formdata.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        //             if (!err) { res.send(doc); }
        //             else { console.log('Error in Employee Update :' + JSON.stringify(err, undefined, 2)); 
        //         }
        //     });
        // })
//***find by id and update the details of document by Object ID ends 

//*** get the user update req by UserId
    app.get("/api/employee/update-get-data/:id",function(req,res,err){
        console.log("this is from update req by UserId : "+req.params.id);
        var myquery = {  userID : req.params.id };
        Formdata.findOne(myquery,function(err,doc){
          if(!err){
             console.log(doc);
             this.packt=doc;
          }else{ console.log("there is an error occured : "+err)}
          res.status(200).send({'data':this.packt});
               
        })
    })
//*** get the user update req by UserId

//***delete doc from the data  using  object id starts here
    // app.delete('/api/employee/:id',(req,res) => {
    //     console.log(req.params.id);
    //         if (!ObjectId.isValid(req.params.id))
    //             return res.status(400).send(`No record with given id : ${req.params.id}`);    
    //         Formdata.findByIdAndRemove(req.params.id, (err, doc) => {
    //             if (!err) { res.send(doc); }
    //             else { console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    //         });
    // })
//***delete doc from the data using  object id ends here

//*** delete data  by using userId  starts here */
    app.delete('/api/employee/deletebyuserid/:id',function(req,res,err){
        console.log("line 112 : "+req.params.id);
        let post_jobs_id = req.params.id;
        console.log("line 113 post_jobs_id  : "+post_jobs_id);
        res.status(200).send({'message':'data received '});
        var myquery = {  userID : req.params.id };
        Formdata.deleteOne(myquery,function(err,obj){
       if (!err) {
           console.log("doc deleted sucessfully");
       }else{
        console.log("doc not - deleted "+ err);
       }
       });
    });

//*** delete data using userId  ends here  */

//***for testing of pull command i have created this. ** //


app.listen(PORT,function(){
    console.log('server running on port '+ PORT);
});
