var mysql  =require('mysql');

var connection = mysql.createPool({

    host:'139.59.9.236',   //establishing connecting with remote database
    user : 'public',
    password: 'Cap@1234',
    database: 'cap'
});

module.exports = connection;  //exporting 