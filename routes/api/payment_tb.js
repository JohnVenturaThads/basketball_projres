var express = require ('express');
const jwt= require('jsonwebtoken');
var router = express.Router();
var dbConn = require('../../config/db.js');




//CUSTOMER PAYEMNT
router.post('/confirm', (req,res) => {
    const token=req.headers.authorization.split(' ')[1];

    if(!token){
      res.status(200).json({success: false, msg: 'Error, Token was not found'});
    }
    const decodedToken = jwt.verify(token, 'hiddenkey');
    



      var reserveID= req.body.reserveID;
      var paycode= req.body.paycode;

      try {
        sqlQuery = `INSERT INTO payment_tb (pay_code, reserve_id)
        VALUES ("${paycode}", ${reserveID})`;
        dbConn.query(sqlQuery, function(error, results,){
        console.log(results.insertId);
        payid = results.insertId;
        res.status(200).json({success: true , payid:payid});
        })
    }catch (error){
        console.log(error);
        return next 
    } 
 });



//Showing Status
    router.get('/paystat', (req,res) => {

        const token=req.headers.authorization.split(' ')[1];
      
        if(!token){
          res.status(200).json({success: false, msg: 'Error, Token was not found'});
        }
      const decodedToken = jwt.verify(token,`hiddenkey`);
      
        var payid = req.body.payid;
      
        sqlQuery = `SELECT pay_stat FROM payment_tb WHERE pay_id = ${payid}`;
        dbConn.query(sqlQuery, function(error, results, fields) {
          if (error) throw error;
          res.status(200).json(results);
        });
      })


    module.exports = router;