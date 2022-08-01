require('dotenv').config();
const express = require("express");
const Https = require("https");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})
app.post("/", function (req, res) {

    const city = req.body.city;

    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + process.env.APP_ID + "&units=metric";

    Https.get(url, function (response) {
        response.on("data", function (data) {
            const desc = JSON.parse(data).weather[0].description;
            const temp = JSON.parse(data).main.temp;
            const loc = JSON.parse(data).name;
            const src = "http://openweathermap.org/img/wn/" + JSON.parse(data).weather[0].icon + "@2x.png";
            res.write("<body style='text-align:center;margin-top:10%;background-color: #e5e5f7;opacity: 1;background-image: linear-gradient(135deg, #FFB4B4 25%, transparent 25%),  linear-gradient(225deg, #FFB4B4 25%, transparent 25%),              linear-gradient(45deg, #FFB4B4 25%, transparent 25%),              linear-gradient(315deg, #FFB4B4 25%, #ffdeb4 25%);background-position: 10px 0, 10px 0, 0 0, 0 0;background-size: 100px 100px;background-repeat: repeat;'><h3 >The Weather is Currently <b><u>" + desc + "</u></b></h3>");
            res.write("<h1>Temprature in <b><u>" + loc + "</u></b> is  <b><u>" + temp + "</u></b> deg.C.</h1>");
            res.write("<img style='width:200px'src=" + src + "></body>");
            res.send();
        })
    })

})


app.listen(3000, function () {
    console.log("server started");
})