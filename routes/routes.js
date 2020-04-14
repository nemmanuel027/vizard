var express = require('express');
var request = require('request');
var routing = express.Router();

//any routing
routing.get('/', function (req, res, next) {
    res.redirect('/vizard/login');
})

//routing login
routing.get('/login', function (req, res, next) {
    res.sendFile(path + '/public/views/login.html');
})

//routing login
routing.get('/myprojects', function (req, res, next) {
    res.sendFile(path + '/public/views/myprojects.html');
})
//routing login
routing.get('/newproject', function (req, res, next) {
    res.sendFile(path + '/public/views/newproject.html');
})



//Fetch Method data
routing.get('/usersData', function (req, res, next) {
    const fs = require('fs');
    let rawdata = fs.readFileSync(path + '/public/json/users.json');
    let proData = JSON.parse(rawdata);
    res.send(proData);
})


routing.post('/usersData', function (req, res) {
    const fs = require('fs');
    fs.writeFile(path + '/public/json/users.json', JSON.stringify(req.body), function(err) {
        if(err) {
            return console.log(err);
        }            
    });
    res.send("file saved");
});


routing.post('/writeHtml', function (req, res) {
    const fs = require('fs');
    fs.writeFile(path + '/public/html_generated/index.html', req.body.cHtml, function(err) {
        if(err) {
            return console.log(err);
        }            
    });
    res.send("file saved");
});



module.exports = routing;