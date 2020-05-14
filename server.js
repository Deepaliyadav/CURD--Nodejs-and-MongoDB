const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const employeeRoutes = require('./routes/employee');

const MONGODB_URI = 'mongodb+srv://max-curd-nodejs:l65yA34FSSztShn3@cluster0-1ya5e.mongodb.net/EmployeeDB?retryWrites=true&w=majority'
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(employeeRoutes); 

mongoose.connect(MONGODB_URI,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () =>{
    console.log("CONNECTED TO MONGODB COMPASS")
  })
    .then(result => {
      app.listen(3000);
    console.log("RUNNING ON PORT:3000")
    })
    .catch(err => {
      console.log(err);
    });
  
