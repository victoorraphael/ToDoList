const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){

  var today = new Date();
  var currentDay = today.getDay();
  const day = ["Monday", "Sunday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const dayOfWeek = day[currentDay];

  res.render("list", {dayOfWeek: dayOfWeek});

})


app.listen(3000, console.log("Server is running on port 3000!"))