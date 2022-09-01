const express = require("express");
const router = express.Router();
var mysql = require('mysql');

function ResetPasses(req,res){

	//commect to database
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
		console.log("Inside Reset Passes!");
		//sql query
		let myquery="DELETE FROM Pass_Record" ;
		con.query(myquery, function (err, result, fields){
			if (err) {
				res.status(400); //bad request error
				res.send({"status":"failed"});
			}
		//	res.status(200); //success
			res.send({"Passes Reset":"OK"});	
		});
	});
}

router.post('/interoperability/api/admin/resetpasses',ResetPasses);
module.exports = router;