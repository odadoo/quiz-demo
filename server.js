var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");
var jsonWebToken = require('jsonwebtoken');
var cors = require('cors');
// import db from './db.js';
// var db = require(db.js);
var db = require('./db.js')

// var db = mongo.connect("mongodb://localhost/AngularCRUD", (err, response) => {
//   if(err){
//     console.log( err);
//   } else {
//     console.log('Connected to ' + db, ' + ', response);
//   }
// });


var impObject = {
  'jwtSecret': 'xtytzt00700tytx',
  'connStr': 'mongodb://localhost/AngularCRUD'
};

var app = express()
app.use(bodyParser());
app.set('jwtSecret', impObject.jwtSecret);
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var Schema = mongo.Schema;

var UsersSchema = new Schema({
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String },
},{ versionKey: false });


var CourseQuestion = new Schema({
  questions: { type: String },
  choices: { type: String },
},{ versionKey: false });


var ChoiceQuestion = new Schema({
  questions: { type: String },
  choices: [{ type: String }],
  catCode: { type: Number },
},{ versionKey: false });


var QuestionsCategory = new Schema({
  category: { type: String },
  code: { type: Number },
}, { versionKey: false });


var usersModel = mongo.model('users', UsersSchema, 'users');
var courseModel = mongo.model('courseQuestions', CourseQuestion, 'courseQuestions');
var choiceModel = mongo.model('choiceQuestions', ChoiceQuestion, 'choiceQuestions');
var categoryModel = mongo.model('questionsCategory', QuestionsCategory, 'questionsCategory');


app.get("/api/getCategory", function(req, res){
  categoryModel.find({}, function(err, data){
    if(err){
      res.send(err);
    }else{
      res.send(data);
    }
  });
})

app.get("/api/getQuestions/:id",function(req,res){
  console.log("-------------", req);
  choiceModel.find({"catCode": req.params.id},function(err,data){
    if(err){
      res.send(err);
    }
    else{
      res.send(data);
    }
  });
})

app.post("/api/saveUser", function(req, res){
  console.log("saving user data", req);
  var userData = new usersModel(req.body);
  var successMsg = "Register User Successfully";
  userData.email = req.body.email;
  userData.firstName = req.body.firstName;
  userData.lastName = req.body.lastName;
  userData.password = req.body.password;
  userData.save(function(err, data){
    if(err){
      console.log("Error saving user");
    }else{
      res.send({data: "User Registered Successfully"});
    }
  });
})


app.post("/api/authUser", function (request, response) {
  usersModel.findOne({
    email: request.body.email
  }, function (error, user) {
    if (error) {
      console.log('Some error occured '); throw error;
    }
    if (!user) {
      response.json({
        authsuccess: false,
        description: 'User Authentication failed because user not found.'
      });
    } else if (user) {
      if (user.password != request.body.password) {
        response.json({
          authsuccess: false,
          description: 'User Authentication failed because provided password is wrong.'
        });
      } else {
        var accessToken = jsonWebToken.sign(user.toJSON(), app.get('jwtSecret'), {
          expiresIn: 3600
        });
        console.log('Authentication is done successfully.....');
        //16d.
        response.json({
          userDetail: user,
          authsuccess: true,
          description: 'Sending the Access Token',
          accessToken: accessToken
        });
      }
    }
  });

});




app.post("/api/saveQuestion",function(req,res){
  debugger
  console.log("saving data", req);
  var qstnData = new choiceModel(req.body);
  var successMsg = "Inserted Successfully";
  qstnData.questions = req.body.questions;
  qstnData.choices = req.body.choices;
  qstnData.save(function(err, data){
    if(err){
      console.log("Error saving question");
    }else{
      res.send({data: "Record has been Inserted..!!"});
    }
  });
})


app.listen(8000, function () {
  console.log('Example app listening on port 8080!')
})



































// var express = require('express');
// var path = require("path");
// var bodyParser = require('body-parser');
// var mongo = require("mongoose");

// var db = mongo.connect("mongodb://localhost/AngularCRUD", function(err, response){
//    if(err){ console.log( err); }
//    else{ console.log('Connected to ' + db, ' + ', response); }
// });


// var app = express()
// app.use(bodyParser());
// app.use(bodyParser.json({limit:'5mb'}));
// app.use(bodyParser.urlencoded({extended:true}));


// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// var Schema = mongo.Schema;


// var UsersSchema = new Schema({
//   email: { type: String },
//   firstName: { type: String },
//   lastName: { type: String },
//   password: { type: String },
// },{ versionKey: false });


// var CourseQuestion = new Schema({
//   questions: { type: String },
//   choices: { type: String },
// },{ versionKey: false });


// var ChoiceQuestion = new Schema({
//   questions: { type: String },
//   choices: [{ type: String }],
//   catCode: { type: Number },
// },{ versionKey: false });


// var QuestionsCategory = new Schema({
//   category: { type: String },
//   code: { type: Number },
// }, { versionKey: false });


// var usersModel = mongo.model('users', UsersSchema, 'users');
// var courseModel = mongo.model('courseQuestions', CourseQuestion, 'courseQuestions');
// var choiceModel = mongo.model('choiceQuestions', ChoiceQuestion, 'choiceQuestions');
// var categoryModel = mongo.model('questionsCategory', QuestionsCategory, 'questionsCategory');


// app.get("/api/getCategory", function(req, res){
//   categoryModel.find({}, function(err, data){
//     if(err){
//       res.send(err);
//     }else{
//       res.send(data);
//     }
//   });
// })

// app.get("/api/getQuestions/:id",function(req,res){
//   console.log("-------------", req);
//   choiceModel.find({"catCode": req.params.id},function(err,data){
//     if(err){
//       res.send(err);
//     }
//     else{
//       res.send(data);
//     }
//   });
// })

// app.post("/api/saveUser", function(req, res){
//   console.log("saving user data", req);
//   var userData = new usersModel(req.body);
//   var successMsg = "Register User Successfully";
//   userData.email = req.body.email;
//   userData.firstName = req.body.firstName;
//   userData.lastName = req.body.lastName;
//   userData.password = req.body.password;
//   userData.save(function(err, data){
//     if(err){
//       console.log("Error saving user");
//     }else{
//       res.send({data: "User Registered Successfully"});
//     }
//   });
// })


// app.post("/api/saveQuestion",function(req,res){
//   debugger
//   console.log("saving data", req);
//   var qstnData = new choiceModel(req.body);
//   var successMsg = "Inserted Successfully";
//   qstnData.questions = req.body.questions;
//   qstnData.choices = req.body.choices;
//   qstnData.save(function(err, data){
//     if(err){
//       console.log("Error saving question");
//     }else{
//       res.send({data: "Record has been Inserted..!!"});
//     }
//   });
// })

// app.listen(8000, function () {
//  console.log('Example app listening on port 8080!')
// })







