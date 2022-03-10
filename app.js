const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
var _ = require('lodash');

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.static(__dirname + './public/script.js'));

app.get("/", function(req,res){
    res.render('list.ejs', {
    }); 
})

app.listen('3000', function(){
    console.log("server start at port 3000")
})
