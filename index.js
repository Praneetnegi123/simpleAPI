const express = require("express");
const app = express();
let users = require("./users.json");//! Importing users Data From users.json file

let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser());

//! fetch all user data
app.get("/users", (req, res) => {
  res.send(users);
});

//! fetch a specific data with there ids
app.get("/user/:id", (req, res) => {
  let id = req.params.id;
  let user = users.find((element) => element.id == id);
  res.send(user);
});

//! add user in Users
app.post("/user", (req, res) => {
  let data = req.body;
  console.log(data);
  users.push(data);
  res.json(data);
});

//! delete a particular user
app.delete("/user/:id", (req, res) => {
  let id = req.params.id;
  let user = users.find((element) => element.id == id);
  let ele = users.indexOf(user);
  users.splice(ele, 1);
  res.send("Deleted Successfully");
});

//! update a user
app.put("/user/:id", (req, res) => {
  let data = req.body;
  if (data.name) {
    console.log("REQUEST", data.name);
    user = users.find((element) => element.id == req.params.id);
    console.log("USERS", user.name);
    user.name = data.name;
  }
  res.json(`Successfully updated name: ${user.name}`);
});

app.listen(8080, () => {
  console.log("Listning at port 8080");
});
