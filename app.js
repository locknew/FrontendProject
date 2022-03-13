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
const client = new MongoClient('mongodb+srv://BLT:Milk%40081@restaurant.ftxwd.mongodb.net/Restaurant?retryWrites=true&w=majority');
var loggedIn = {};
var orderNo = 0;

app.get("/", async function(req, res) {
    await client.connect()
    const list = [];
    try {
        const db = client.db('Restaurant').collection('Order');
        const data = await db.find().forEach(function(obj) {
            list.push(obj);
        })
        list.sort((firstEl, secondEl) => { return secondEl.order - firstEl.order })
        orderNo = list[0].order;
    } catch (err) {
        orderNo = 0;
    }
    res.render('list.ejs', { orderList: list });
})

app.get("/kitchen", async function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const list = [];
    try {
        const db = client.db('Restaurant').collection('Order');
        const data = await db.find( /*{ "pen": "paper" } simulate 0 result*/ ).forEach(function(obj) {
            list.push(obj);
        })
        list.sort((firstEl, secondEl) => { return secondEl.order - firstEl.order })
        orderNo = list[0].order;
    } catch (err) {
        orderNo = -1;
    }
    res.render('kitchen.ejs', { isLoggedIn: Object.keys(loggedIn).includes(ip), name: loggedIn[ip], orderList: list });
})
app.post("/login", async function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    await client.connect()
    const db = client.db('Restaurant').collection('User');
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
                    loggedIn[ip] = user["Username"];
                    console.log(`${ip} logged in.`);
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
    delete loggedIn[ip]
    console.log(`${ip} logged out.`)
    res.json(resBody);
})

app.post("/submit", async function(req, res) {
    console.log("submission started")
    await client.connect()
    const db = client.db('Restaurant').collection('Order');
    var resBody = {
        status: "success",
        data: {}
    };
    console.log(req.body);
    try {
        const order = req.body["out"]
        order["order"] = ++orderNo;
        await db.insertOne(order);
    } catch (err) {
        resBody["status"] = "error";
    }
    res.json(resBody);
})

app.post("/checkout", async function(req, res){
    await client.connect()
    const db = client.db('Restaurant').collection('Order');
    var resBody = {
        status: "success",
        data: {}
    };
    try {
        db.drop();
        client.db('Restaurant').createCollection('Order');
        console.log("remove success");
    }catch (err) {
        resBody["status"] = "error";
    }
    res.json(resBody);
    res.render('list.ejs');
})

app.listen('3000', function() {
    console.log("server start at port 3000")
})