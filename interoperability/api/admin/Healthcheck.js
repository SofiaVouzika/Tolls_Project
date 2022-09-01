const express = require("express");
const router = express.Router();
var mysql = require('mysql');

function Healthcheck(req,res){
	//comnnect to database
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
			res.send({"status":"failed","dbconnection":"User = root, Password = NOT SET","Connection to Database":"Failed"});
		}
		console.log("Inside Healthcheck!");
		res.status(200); //success
		res.send({"status":"OK","dbconnection":"User = root, Password = NOT SET"});
		});
}

router.get('/interoperability/api/admin/healthcheck',Healthcheck);
module.exports = router;