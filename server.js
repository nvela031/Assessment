const express = require("express");
const bodyParser = require("body-parser");

const db = require("./queries");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/students", db.getStudents);
app.post("/student", db.createStudent);

app.listen(3000, () => {
  console.log("Server started on port 3000 ");
});
