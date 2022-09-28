var express = require ('express')
var routes= express.Router();
const jwt= require('jsonwebtoken');
const { restart } = require('nodemon');
var dbConn = require('../../config/db.js');
const router = require('./reserve_tb.js');

//signup
router.post ('/signup',(req,res,next) => {
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var address = req.body.address;
    var number = req.body.number;
    var custid = req.body.custid;
    

    try {
        sqlQuery = `INSERT INTO cust_tb (custacc_name, custpass, custname, custadd, custno)
        VALUES ("${username}", "${password}", "${name}", "${address}", ${number})`;
        dbConn.query(sqlQuery, function(error, results,){
        console.log(results.insertId);
        custid = results.insertId;
        res.status(200).json({success: true , custid:custid});
        })
    }catch (error){
        console.log(error);
        return next 
    } 
 });




 
// LOGIN
router.post ('/login',(req,res,next) => {
    var username = req.body.username;
    var password = req.body.password;
    

    try {
        sqlQuery = `SELECT * FROM cust_tb WHERE custacc_name="${username}" AND custpass="${password}"`;
        dbConn.query(sqlQuery, function(error, results,){
        console.log(results);
        Object.keys(results).forEach(function(key){
            var row = results[key];
            
            var username = row.custacc_name;
            var password = row.custpass;

            var data = {
                username:row.custacc_name,
                pasword:row.custpass
            };

            //TOKEN CREATION
            token = jwt.sign({data: data},'hiddenkey',{expiresIn:'1h'});



            res.status(200).json({success: true , token: token});
        });
        
        })
    }catch (error){
        console.log(error);
        return next(error); 
    } 
 });


//JWT token








module.exports = router;
