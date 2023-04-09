var mysql = require('mysql');

const pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Kishore@123456789,?",
    database:"student_nodedata"
});

pool.getConnection(function(err){
    if(err){
    throw err;
    }else{
    console.log("Connected");
    }
});

module.exports = pool;