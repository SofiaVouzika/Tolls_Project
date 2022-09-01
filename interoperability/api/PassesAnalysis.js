const express = require("express");
const router = express.Router();
var mysql = require('mysql');

function PassesAnalysis(req,res){

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		port: 3306,
		database:"Tolls_db"
	});
	
	

	con.connect(function(err) {
		if (err) {
			res.status(500); //internal server error
			res.send({"status":"failed","dbconnection":"User = root, Password = NOT SET"});
		}
		console.log("Inside Passes Analysis!");
		
		let op1_ID = req.params.op1_ID;
        let op2_ID = req.params.op2_ID;
		let date_from = req.params.date_from;
		let date_to = req.params.date_to;

		let myquery = 'SELECT ROW_NUMBER() OVER(ORDER BY Pass_Record.PassID) AS PassIndex,Pass_Record.PassID AS PassID,Pass_Record.station_id AS StationID,Pass_Record.time_and_date AS TimeStamp,Tag.license_plate AS VehicleID,Pass_Record.charge AS Charge FROM ((Pass_Record INNER JOIN Stations ON Stations.station_id = Pass_Record.station_id) INNER JOIN Tag ON Tag.license_plate = Pass_Record.license_plate) WHERE Tag.Tag_Provider = '+op2_ID+' AND Stations.Station_Provider = '+op1_ID+' AND Pass_Record.time_and_date BETWEEN '+date_from+' AND '+date_to+'';		
		con.query(myquery, function (err, result){
			if (err) {
				res.status(400); //bad request error
				res.send({"status":"failed","request":"invalid","passes analysis":"failed"});
			}
			res.status(200);
			res.send(result);		
		});
	})
}

router.get('/interoperability/api/PassesAnalysis/:op1_ID/:op2_ID/:date_from/:date_to',PassesAnalysis);
module.exports = router;