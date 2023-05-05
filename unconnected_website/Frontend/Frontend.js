var express = require("express");
var fs = require("fs");
var app = express();

app.use('/static', express.static("public"));

app.get("/static/login", function (req, res) {
    let data = fs.readFile("public/login.html", function (err, data) {
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
});
    console.log("in login/");
        
});

app.listen(8080);