/**
 * Created by oswaldo on 7/19/2016.
 */
var http = require("http");
var express = require("express");
var app = express();

app.use(express.static(__dirname + "/public"));

var hb = require("express-handlebars");
app.engine("handlebars", hb());
app.set("view engine", "handlebars");

app.get("/", function (req, res) {
    res.render("home",{title: "Hello from WeStorm", message: "Hi there !"});
});

app.get("/api/toppings",function (req, res) {
    res.status(200);
    res.set("Content-type","application/json");
    res.send(["pepperoni","sausage","spinach","mushrooms","ham","pineapple"]);
});

var server = http.createServer(app);

server.listen(3000);
