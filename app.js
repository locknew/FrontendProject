const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const ejs = require("ejs");
var _ = require('lodash');
const { MongoClient } = require("mongodb");
const console = require("console");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static("public"));
app.use(express.static(__dirname + './public/script.js'));
const client = new MongoClient('mongodb+srv://locknew:12345@cluster0.2uz6u.mongodb.net/Restaurant?retryWrites=true&w=majority');
var loggedIn = [];             

app.get("/", function(req, res) {
    res.render('list.ejs');
})

app.get("/kitchen", function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    res.render('kitchen.ejs', { isLoggedIn: req.query.l === "true" || loggedIn.includes(ip) });
})

app.post("/login", async function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    await client.connect()
    const db = client.db('Restaurant').collection('Chef');;
    var resBody = {
        status: "success",
        data: {}
    };
    try {
        const user = req.body["value"]
        if (user["Username"].length > 0 && user["Password"].length > 0) {
            const data = await db.findOne({ "Username": user["Username"] });
            if (data !== null) {
                if (data["Password"] === user["Password"]) {
                    loggedIn.push(ip);
                    console.log(`${ip} logged in.`)
                } else resBody["status"] = "error";
            } else resBody["status"] = "error";
        } else resBody["status"] = "error";
    } catch (err) {
        resBody["status"] = "error";
    }
    res.json(resBody);
})

app.post("/logout", async function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    var resBody = {
        status: "success",
        data: {}
    };
    loggedIn.splice(loggedIn.indexOf(ip), 1)
    console.log(`${ip} logged out.`)
    res.json(resBody);
})


app.listen('3000', function() {
    console.log("server start at port 3000")
})