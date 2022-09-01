const express = require("express");
const router = express.Router();
var mysql = require('mysql');

function ResetVehicles(req,res){
    //connect to database
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
            res.send({"status":"failed","connection":"failed"});
        }
		console.log("Inside Reset Vehicles!");
		let myquery="DELETE FROM Vehicles";

        //sql query
		con.query(myquery, function (err, result, fields){
			if (err) {
                res.status(400); //bad request error
                res.send({"status":"failed","request":"invalid","reset vehicles":"failed"});
            }
            res.status(200); //success
			res.send({"Vehicles Reset":"OK"});
		});
	});
}

router.post('/interoperability/api/admin/resetvehicles',ResetVehicles);
module.exports = router;