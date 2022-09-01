const express = require("express");
const router = express.Router();
var mysql = require('mysql');
const bodyparser = require('body-parser');

function PassesPerStation(req,res){

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
		console.log("Inside Passes Per Station!");
		
		let station_id = req.params.stationID;
		let date_from = req.params.date_from;
		let date_to = req.params.date_to;

		let myquery = 'SELECT ROW_NUMBER() OVER(ORDER BY Pass_Record.PassID) AS PassIndex,Pass_Record.PassID AS PassID,Pass_Record.time_and_date AS PassTimeStamp,Tag.license_plate AS VehicleID,Tag.Tag_Provider AS TagProvider,IF(Station_Provider=Tag_Provider,"home","visitor") AS PassType,Pass_Record.charge AS PassCharge FROM ((Pass_Record INNER JOIN Tag ON Pass_Record.license_plate = Tag.license_plate) INNER JOIN Stations ON Stations.station_id = Pass_Record.station_id)  WHERE Pass_Record.station_id = '+station_id+' AND Pass_Record.time_and_date BETWEEN '+date_from+' AND '+date_to+'';		
		con.query(myquery, function (err, result){
			if (err) {
				res.status(400); //bad request error
				res.send({"status":"failed","request":"invalid","passes per station":"failed"});
			}
			res.status(200);
			res.send(result);
		});
	})
}

router.get('/interoperability/api/PassesPerStation/:stationID/:date_from/:date_to',PassesPerStation);
module.exports = router;