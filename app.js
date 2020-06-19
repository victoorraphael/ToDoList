const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); // static files like css, some js ...

app.set("view engine", "ejs");

app.get("/", function(req, res){

  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }
  let currentDay = today.toLocaleDateString("en-GB", options);

  res.render("list", {dayOfWeek: currentDay, newListItems: items});

})

app.post("/", function(req, res){
  let item = req.body.newItem;

  items.push(item);

  res.redirect("/");
})


app.listen(3000, console.log("Server is running on port 3000!"))