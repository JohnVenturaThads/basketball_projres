var express = require ('express');
const jwt= require('jsonwebtoken');
var router = express.Router();
var dbConn = require('../../config/db.js');



//RESERVING FOR CUSTOMER WTH AUTHORIZATION
router.post('/sched', (req,res) => {
const token=req.headers.authorization.split(' ')[1];

if(!token){
  res.status(200).json({success: false, msg: 'Error, Token was not found'});
}
const decodedToken = jwt.verify(token, 'hiddenkey');

console.log(decodedToken);

  var id= req.body.id;
  var date = req.body.date;
  var time = req.body.time;

  sqlQuery = `INSERT INTO reserve_tb (date, time, cust_id)
  VALUES (${date}, ${time}, ${id})`;

  dbConn.query(sqlQuery, function(error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
  });
});


// getting the status
router.get('/status', (req,res) => {

  const token=req.headers.authorization.split(' ')[1];

  if(!token){
    res.status(200).json({success: false, msg: 'Error, Token was not found'});
  }
const decodedToken = jwt.verify(token,`hiddenkey`);

  var reserve_ID = req.body.reserve_ID;

  sqlQuery = `SELECT reserve_stat FROM reserve_tb WHERE reserve_id = ${reserve_ID}`;
  dbConn.query(sqlQuery, function(error, results, fields) {
    if (error) throw error;
    res.status(200).json(results);
  });
})




  module.exports = router;






//router.post('/create', (req,res)=>{
  //var customerAccName = req.body.customerAccName;
//  var custpassword = req.body.custpassword;

  //sqlQuery = `INSERT INTO customer_login_tb (cust_accname, cust_pass)
  //VALUES ("${customerAccName}", "${custpassword}")`;
  
  //dbConn.query(sqlQuery, function(error, results, fields) {
    //if (error) throw error;
    //res.status(200).json(results);
  
 // });
//});

//router.get('/show', (req,res)=>{
  //  dbConn.query('SELECT * FROM customer_login_tb', function(error, results, fields) {
    //  if (error) throw error; 
      //res.status(200).json(results);
    //});
  //});

  //router.get('/show', (req,res)=>{
  //  dbConn.query('SELECT * FROM customer_tb', function(error, results, fields) {
    //  if (error) throw error; 
      //res.status(200).json(results);
    //});
  //});