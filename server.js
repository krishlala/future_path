const express = require("express");
const app = express();
const port = 3000;
var path = require("path");
var code = __dirname;
console.log(code);
app.use(express.json());

var jobOpenings = [];

jobOpenings.push({
  title: "Web Developer Internship1",
  company: "Tech Innovators",
  location: "Remote",
});
jobOpenings.push({
  title: "Web Developer Internship2",
  company: "Tech Innovators",
  location: "Remote",
});
jobOpenings.push({
  title: "Web Developer Internship3",
  company: "Tech Innovators",
  location: "Remote",
});
jobOpenings.push({
  title: "Web Developer Internship4",
  company: "Tech Innovators",
  location: "Remote",
});

var apps = [];

app.get("/", function (req, res) {
  res.sendFile(path.join(code, "index.html"));
});

app.use("/", express.static(code));

app.get("/get", function (req, res) {
  res.send(jobOpenings);
});

app.get("/getApps", function (req, res) {
  res.send(apps);
});

app.post("/addPosting", function (req, res) {
  jobOpenings.push(req.body);
  res.send("success");
});

app.post("/addApp", function (req, res) {
  apps.push(req.body);
  res.send("success");
});

app.post("/delApp", function (req, res) {
  console.log(req.body);
  apps.forEach((item, index) => {
    if (item.name == req.body.name) {
      apps.splice(index, 1);
    }
  });
  res.send("success");
});

app.post("/delPost", function (req, res) {
  console.log(req.body);
  jobOpenings.forEach((item, index) => {
    if (item.title == req.body.position) {
      jobOpenings.splice(index, 1);
    }
  });
  res.send("success");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
  console.log("http://localhost:3000");
});
