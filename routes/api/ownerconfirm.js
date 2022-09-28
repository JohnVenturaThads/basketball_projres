var express = require ('express');
var router = express.Router();
var dbConn = require('../../config/db.js');




//VIEWING OF SCHED
router.get('/allsched', (req,res) =>{
    dbConn.query('SELECT * FROM reserve_tb', function(error, results, fields){
       if (error) throw error;
       res.status(200).json(results);
    });
});

//UPDATE IN RESERVE TABLE
router.put('/update', (req,res) => {
    var status = req.body.status;
    var reserveid = req.body.reserveid;

    sqlQuery = `UPDATE reserve_tb SET reserve_stat="${status}" 
    WHERE reserve_id=${reserveid}`,
    dbConn.query(sqlQuery, function(error, results, fields) {
        if (error) throw error;
        res.status(200).json({
          msg: `Reservation Updated`,
           results: results});
    });
});

// UDPATE IN PAYMENT TABLE
router.put('/payupdate', (req,res) => {
    var status = req.body.status;
    var payid = req.body.payid;

    sqlQuery = `UPDATE payment_tb SET pay_stat="${status}" 
    WHERE pay_id=${payid}`,
    dbConn.query(sqlQuery, function(error, results, fields) {
        if (error) throw error;
        res.status(200).json({
          msg: `payment updated`,
           results: results});
    });
});




module.exports = router;