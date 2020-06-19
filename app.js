const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items = ["Comprar Comida", "Cozinhar"];
let workItems = [];

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

  res.render("list", {listTitle: currentDay, newListItems: items});

})

app.post("/", function(req, res){
  let item = req.body.newItem;

  if (req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

  items.push(item);

  res.redirect("/");
})

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work", newListItems: workItems});
})


app.listen(3000, console.log("Server is running on port 3000!"))