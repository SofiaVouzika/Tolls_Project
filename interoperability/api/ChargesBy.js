const express = require("express");
const router = express.Router();
var mysql = require('mysql');

function ChargesBy(req,res){

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
		console.log("Inside Charges By!");
		
        let op_ID = req.params.op_ID;
		let date_from = req.params.date_from;
		let date_to = req.params.date_to;

		let myquery = 'SELECT  Tag.Tag_Provider AS VisitingOperator,COUNT(*) AS NumberOfPasses, SUM(charge) AS PassesCost FROM ((Pass_Record INNER JOIN Tag ON Tag.license_plate = Pass_Record.license_plate)INNER JOIN Stations ON Stations.station_id = Pass_Record.station_id) WHERE NOT Tag.Tag_Provider ='+op_ID+' AND Stations.Station_Provider = '+op_ID+' AND Pass_Record.time_and_date BETWEEN '+date_from+' AND '+date_to+' GROUP BY Tag.Tag_Provider';		
		con.query(myquery, function (err, result){
			if (err) {
				res.status(400); //bad request error
				res.send({"status":"failed","request":"invalid","charges by":"failed"});
			}
			res.status(200)
			res.send(result)
		});
	})
}

router.get('/interoperability/api/ChargesBy/:op_ID/:date_from/:date_to', ChargesBy);
module.exports = router;
