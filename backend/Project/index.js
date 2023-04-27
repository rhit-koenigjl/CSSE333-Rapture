var Connection = require('tedious').Connection;
var config = {
    server: 'titan.csse.rose-hulman.edu',
    authentication: {
        type: 'default',
        options: {
            userName: 'krzyzehj',
            password: 'Comp$ci23$'
        }
    },
    options: {
        encrypt: true,
        database: 'Rapture',
        trustServerCertificate: true
    }
};
var connection = new Connection(config);

var query = "";

connection.on('connect', function(err) {
    if(err) {
        console.log("Error: ", err);
    } else {
        console.log("Connected");
        executable(query);
    }
});

connection.connect();
var Request = require('tedious').Request;
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