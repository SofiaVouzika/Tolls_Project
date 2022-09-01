const express = require("express");
const port = 3000;
const bodyparser = require('body-parser');
const app = express();

//app.use(express.static("public"));
app.use(express.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

app.set('view engine', 'ejs')

const user = {
  firstName: 'Tim',
  lastName: 'Cook',
    admin: true,
}
app.get('/', (req, res) => {
    res.render('index', {
      user
    })
}) 

app.listen(port,() =>{
    console.log("Server is running in port",port)
});


app.get('/',(req,res) =>{
    //console.log(req.connection.remoteAddress);
    res.send({"status":"request recieved"});
});

const PassesPerStation = require("./interoperability/api/PassesPerStation.js");
const PassesAnalysis = require("./interoperability/api/PassesAnalysis.js");
const PassesCost= require("./interoperability/api/PassesCost.js");
const ChargesBy= require("./interoperability/api/ChargesBy.js");
const Healthcheck = require("./interoperability/api/admin/healthcheck.js");
const ResetPasses = require("./interoperability/api/admin/resetpasses.js");
const ResetStations = require("./interoperability/api/admin/resetstations.js");
const ResetVehicles = require("./interoperability/api/admin/resetvehicles.js");

//const index = require("./public/index.html");
const { response } = require("express");

app.use('/',PassesPerStation);
app.use('/',PassesAnalysis);
app.use('/',PassesCost);
app.use('/',ChargesBy);
app.use('/',Healthcheck);
app.use('/',ResetStations);
app.use('/',ResetVehicles);
app.use('/',ResetPasses);

//app.use('/',index);