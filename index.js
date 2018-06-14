var express = require('express');

var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var path = require('path');
var fileupload = require('express-fileupload');
var dbroutes = require('./routes/dbroutes');


//for parsing incoming request
app.use(bodyParser.urlencoded());
//parse the file that is upload
app.use(fileupload());

//to join a route
app.use("/dbroutes",dbroutes);  //routing to dbroute.js after checking if url contains /dbroutes



//to create a listener
app.listen(4500,function(){
    console.log("Server is running");

})

app.get('/',function(request,response){
    response.send("Hi! from Capgemini");
});

// static file paths
app.use(express.static(__dirname + '/public/styles'));
app.use(express.static(__dirname + '/public/scripts'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname+'/public/amodule'));

//Handling requests
app.get('/Home',function(request,response){
    response.sendFile(__dirname + "/public/views/index.html");
});


app.post("/store",function(request,response){

    if(request.files)
    {
        let regex = /\.(docx|doc|pdf)$/;
        let filename=request.files.resume.name;
        //console.log(request.files);
        if(regex.test(filename))
        {
        //console.log("Right upload");
        request.files.resume.mv("resumes/"+filename,function(err){ //mv used for moving files into some folder
            if(err)
             response.send("resume not stored and so is data");
        })

        }
        else
        //console.log("Upload doc or pdf");
        response.send("Data not stored please upload doc or pdf");
    }
    else
    response.send("Please upload a file");
var sno = request.body.sno;
var name = request.body.name;
var city = request.body.city;
var obj = {sno:sno,name:name,city:city};
//obj = JSON.stringify(obj);
fs.readFile("data/info.txt",'utf8',function(err,data){
    //reading the existing file

    if(err)
    {
        response.send("Error in manipulating the data");
    }
    var temp = JSON.parse(data);
    temp.push(obj);
    temp = JSON.stringify(temp);
    fs.writeFile("data/info.txt",temp,function(err){
        if(err)
        {
            response.send("Data not stored....!!!");
        }
        response.send("Data stored into the file");
    })
})
});

//configuring view templates

app.set('views',__dirname+'/public/templates');
app.set('view engine','ejs');

// app.get("/table",function(request,response){
//     fs.readFile('data/info.txt','utf8',function(err,obj){
//         if(err)
//           response.send("No Data.");
//         let info = JSON.parse(obj);
//         response.render("table",{data:info});
//     })
// })


app.get('/restclient',function(request,response){
    response.sendFile(__dirname + "/public/views/angular.html");
});
