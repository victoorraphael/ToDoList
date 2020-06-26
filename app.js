const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); // static files like css, some js ...

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true});

const itemSchema = {
  name: String
};

const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
  name: "Welcome!"
});

const item2 = new Item({
  name: "<-- Hit this to delete an item!"
});

const arr = [item1, item2];

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

app.set("view engine", "ejs");

app.get("/", function(req, res){

  Item.find({}, (err, items)=>{

    if(items.length === 0){
      Item.insertMany(arr, (err) => {
        if(err){
          console.log(err);
        } else {
          console.log("Successful");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: items});
    }   
  })

});

app.get("/:customListName", (req, res)=>{
  const customListName = req.params.customListName;

  List.findOne({name: customListName}, (err, result)=>{
    if(!err){
      if(!result){
        const list = new List({
          name: customListName,
          items: arr
        });

        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", {listTitle: result.name, newListItems: result.items});
      }
    }
  })
});

app.post("/", function(req, res){
  
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({
    name: itemName
  });

  if (listName === "Today"){
    newItem.save();

    res.redirect("/");
  } else {
    List.findOne({name: listName}, (err, foundList)=>{
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/" + listName);
    })
  }

  
});

app.post("/delete", (req, res) => {
  const itemId = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findByIdAndRemove(itemId, (err)=>{
      if(!err){
        console.log("Successfully deleted!");
        res.redirect("/");
      }
    })
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items:{_id: itemId}}}, (err, foundList) => {
      if(!err){
        res.redirect("/" + listName);
      }
    })
  }
});




app.listen(3000, console.log("Server is running on port 3000!"));