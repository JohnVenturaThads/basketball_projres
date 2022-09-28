var express = require ('express');
const jwt= require('jsonwebtoken');
var router = express.Router();
var dbConn = require('../../config/db.js');



router.get('/status', (req,res) => {

    const token=req.headers.authorization.split(' ')[1];
  
    if(!token){
      res.status(200).json({success: false, msg: 'Error, Token was not found'});
    }
  const decodedToken = jwt.verify(token,`hiddenkey`);
  
    sqlQuery = `SELECT custname, date, time, reserve_stat, pay_stat
    FROM cust_tb, reserve_tb, payment_tb
    WHERE cust_tb.cust_id = reserve_tb.cust_id AND reserve_tb.reserve_id=payment_tb.reserve_id`;
    dbConn.query(sqlQuery, function(error, results, fields) {
      if (error) throw error;
      res.status(200).json(results);
    });
  })




  module.exports = router;