var pool = require('./connection');
var express = require('express');
var app = express();
app.use(express.static(__dirname));
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});

app.post('/',function(req,res){
    var fname=req.body.firstname;
    var lname=req.body.lastname;
    var email=req.body.email;
    var mobile=req.body.mobile;
    var dob=req.body.dob;
    var gender=req.body.gender;
    var add1=req.body.address1;
    var add2=req.body.address2;
    var city=req.body.city;
    var state=req.body.state;
    var zip = req.body.zip;
    var country = req.body.country;

    var sql = "INSERT INTO student(FirstName,LastName,Email,Mobile,DOB,Gender,Address1,Address2,City,State,PinCode,Country) VALUES(?,?,?,?,?,?,?,?,?,?,?,?);"
    pool.query(sql,[fname,lname,email,mobile,dob,gender,add1,add2,city,state,zip,country],function(err,result){
        if(err) throw err;
       res.redirect('/studentdetails');
    });
});

app.get('/studentdetails',function(req,res){
    pool.getConnection(function(err){
    if(err) console.log(err);
        var sql = "SELECT * from student";
    
        pool.query(sql,function(err,result){
            if(err) console.log(err);
            res.render(__dirname+'/studentdetails',{studentdetails:result});

        });
    
});
});
app.listen(3000);