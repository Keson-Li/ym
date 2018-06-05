
const express = require("express");
const path = require("path");
var formidable = require('formidable');
var app = express();
var fs = require('fs');
const server = require("http").createServer(app);


var pF = path.resolve(__dirname, "public");

app.get("/", function(req, resp){
    resp.sendFile(pF+"/index.html");   
});

app.post('/fileupload',function (req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '/uploads');
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.path;
        var newpath = './uploads/' + files.filetoupload.name;
        console.log(oldpath);
        console.log(newpath);
        fs.rename(oldpath, newpath, function (err) {
          if (err) throw err;
        });
    });
});
