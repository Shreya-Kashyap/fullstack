//routes 

var express = require('express');
var route = express.Router();
var tasks = require('../database/task');


route.get("/people",function(request,response){
    tasks.getAll(function(err,data){                        //function will be copied to callback variable in task.js
        if(err)
        {
            response.render("table",{data:[]}); // empty array
        }
        else
        response.render("table",{data:data});  // sending data to table

    })

});

route.post("/addpeople",function(request,response){
    let person ={
        sno:request.body.sno,
        name:request.body.name,
        city:request.body.city
    }
    tasks.addPerson(person,function(err,data){
        if(err)
        {
            response.send("row not added");
        }
        response.send("row added");
    })
})
module.exports = route;