var express = require('express');
var app = express();
var router = require("./controller/router.js");

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.get("/backIndex",router.getBackIndex);

app.listen(8000);