var express = require("express");
var app = express();
var cors = require("cors");
const bcrypt = require("bcrypt");
const rounds = 10;

app.use(cors());

var query = "";
let data=[];
const logger = require("morgan");
app.use(logger('dev'));
const fs = require("fs");
//const serverSideStorage = "../data/db.json";

// fs.readFile(serverSideStorage, function(err, buf) {
//     if(err){
//         console.log("error: ", err);
//     } else {
//         data = JSON.parse(buf.toString());
//         if(data.length != 0) {
//             counter = data[data.length-1];
//         }
//     }
//     console.log("Data read from file.");
// });

// function saveToServer(data) {
//     fs.writeFile(serverSideStorage, JSON.stringify(data), function(err, buf) {
//         if(err){
//             console.log("error: ", err);
//         } else {
//             console.log("Data saved successfully");
//         }
//     }) 
// }

var bodyParser = require("body-parser");
app.use('/api/', bodyParser.urlencoded({extended: true}));
app.use('/api/', bodyParser.json());

//var bodyParser = require("body-parser");
app.get('/api/', function (req, res) {
    res.send(data);
    res.end();
})



const {Connection, Request} = require('tedious');
const { randomBytes, Hash, createHash } = require("crypto");
const executeSQL = (sql, callback) => {
    let connection = new Connection({
        "authentication": {
          "options": {
            "userName": 'krzyzehj',
            "password": 'Comp$ci23$'
          },
          "type": "default"
        },
        "server": "titan.csse.rose-hulman.edu",
        "options": {
          "validateBulkLoadParameters": false,
          "trustServerCertificate": true,
          "rowCollectionOnRequestCompletion": true,
          "database": "Rapture",
          "encrypt": true
        }
    });
    connection.connect((err) => {
        if (err)
          return callback(err, null);
        const request = new Request(sql, (err, rowCount, rows) => {
          connection.close();
          if (err)
            return callback(err, null);
          callback(null, {rowCount, rows});
        });
        connection.execSql(request);
    });
};


// var config = {
//     server: 'titan.csse.rose-hulman.edu',
//     authentication: {
//         type: 'default',
//         options: {
//             userName: 'krzyzehj',
//             password: 'Comp$ci23$'
//         }
//     },
//     options: {
//         encrypt: true,
//         database: 'Rapture',
//         trustServerCertificate: true
//     }
// };
// var connection = new Connection(config);


//  connection.on('connect', function(err) {
//     if(err) {
//         console.log("Error: ", err);
//     } else {
//         console.log("Connected");
//         query = `EXEC AddDisaster @name = bob, @description = nothing, @range = 3`;
//         executable(query);

//     }
// });

// app.get("/api/login/", function (req, res) {
//     let data = "C:/Users/oaldonda/CSSE333/CSSE333-Rapture/unconnected_website/Frontend/public/login.html";//, function (err, data) {
//     //res.setHeader('Content-Type', 'text/html');
// //});
//     console.log("in login/");
//     res.sendFile(data);
        
// });

app.post("/api/login/", function (req,res){
    let name = req.body.name;
    let password = req.body.password;

    //let query = `EXEC AddPerson @`
})

app.post("/api/register/", function (req, res){
    let uname = req.body.username;
    let name = req.body.name;
    let password = req.body.password;
    let loc = req.body.location;
    let checkQuery = `SELECT UserName FROM Person where UserName = ${uname}`;

    executeSQL(checkQuery, (err, data) => {
        console.log("bob");
        if(err)
            console.log(err);
        if(data != null){
            console.log("Username already exists");
            return 0;
        }
        console.log("marley");

    })

    bcrypt.hash(password, rounds, function(err, hash) {
        let query = `EXEC AddPerson @username = ${uname}, @password = ${hash}, @name = ${name}, @locationname = ${loc}`;
        console.log(query);
        executeSQL(query, (err, data) => {
            if(err)
                console.log(err);
        });
    });


    res.send("POST Successful");
    res.end();
});


app.post("/api/disaster/", function (req, res) {
    let name = req.body.name;
    let description = req.body.description;
    let range = req.body.range;

    let disasterQuery = `EXEC AddDisaster @name = ${name}, @description = ${description}, @range = ${range}`;
    console.log(disasterQuery); 
    executeSQL(disasterQuery, (err, data) => {
        if(err)
            console.error(err);
       // console.log(data.rowCount);
    });
    res.send("POST Successful");
    res.end();
    console.log("post");
});

app.post("/api/item/", function (req, res) {
    let name = req.body.name;
    let description = req.body.description;

    let itemQuery = `EXEC AddItem @name = ${name}, @description = ${description}`;
    console.log(itemQuery); 
    executeSQL(itemQuery, (err, data) => {
        if(err)
            console.error(err);
       // console.log(data.rowCount);
    });
    res.send("POST Successful");
    res.end();
    console.log("post");
});

app.post("/api/skill/", function (req, res) {
    let name = req.body.name;
    let description = req.body.description;

    let skillQuery = `EXEC AddSkill @name = ${name}, @description = ${description}`;
    console.log(skillQuery); 
    executeSQL(skillQuery, (err, data) => {
        if(err)
            console.error(err);
       // console.log(data.rowCount);
    });
    res.send("POST Successful");
    res.end();
    console.log("post");
});

app.post("/api/Person/", function (req, res) {
    let name = req.body.name;
    let password = req.body.password;
    let uname = req.body.username;
    let loc = req.body.locationname;
    let salt = req.body.salt;


    let skillQuery = `EXEC AddPerson @username = ${uname},
     @name = ${name}, @password = ${password},
      @locationname = ${loc}, @salt = ${salt}`;
    console.log(skillQuery); 
    executeSQL(skillQuery, (err, data) => {
        if(err)
            console.error(err);
       // console.log(data.rowCount);
    });
    res.send("POST Successful");
    res.end();
    console.log("post");
});

//connection.connect();
var TYPES = require('tedious').TYPES;

function executable(SQLquery) {
    var request = new Request(SQLquery, function(err) {
        if(err) {
            console.log(err);}
        });

        var result = "";
        request.on('row', function(columns) {
            columns.forEach(function(column) {
                if(column.value === null) {
                    console.log('NULL');
                } else {
                    result += column.value + " ";
                }
            });
            console.log(result);
            result = "";
        });

        request.on('done', function(rowCount, more) {
            console.log(rowCount + ' rows returned');
        }); 

        request.on("requestCompleted", function(rowCount, more) {
            connection.close();
        });
        connection.execSql(request);
    }

app.listen(3000);