var db = require('./connection.js');             //importing db connection exported in connection.js

var operations = {
    getAll: function(callback){                         //property 1
        db.query("select * from person",callback);     //2 parameters-- 1. query,2. callback function
    },
    addPerson: function(person,callback){
    db.query("insert into person values(?,?,?)",[person.sno,person.name,person.city],callback);
    }
}

module.exports = operations;