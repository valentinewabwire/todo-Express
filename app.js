const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const moongose = require("mongoose");

// console.log(date());

const app = express();

const items = ["Buy Food", "Cook dinner"];
const workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
moongose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema = new moongose.Schema({
  name: String,
});

const Item = moongose.model("Item", itemSchema);

const item1 = new Item({
  name: "Welcome to your todolist!",
});
const item2 = new Item({
  name: "Hit the + button to add a new item",
});
const item3 = new Item({
  name: "<--- Hit this to delete an item",
});

const defaultItems = [item1, item2, item3];



/* This is a route handler. It is listening for a get request to the root route. When it gets a
request, it renders the list.ejs file and passes in the listTitle and newListItems variables. */
app.get("/", function (req, res) {
  
  Item.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      /* Inserting the default items into the database. */
Item.insertMany(defaultItems, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully loaded the data to db");
  }
});
res.redirect("/")
    }else{
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
    
  });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
  let item = req.body.todoItem;
  workItems.push(item);
  res.redirect("/work");
});

app.post("/", function (req, res) {
  let item = req.body.todoItem;

  if (req.body.list === "work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
