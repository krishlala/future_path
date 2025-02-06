const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");


// Use CORS middleware
app.use(cors());

// Parse incoming requests as JSON
app.use(express.json());

// Set the port dynamically for Render
const port = process.env.PORT || 3000;

// Static files path
var code = __dirname;
console.log(code);

// Sample job postings data
var jobOpenings = [
  { title: "Web Developer Internship1", company: "Tech Innovators", location: "Remote" },
  { title: "Web Developer Internship2", company: "Tech Innovators", location: "Remote" },
  { title: "Web Developer Internship3", company: "Tech Innovators", location: "Remote" },
  { title: "Web Developer Internship4", company: "Tech Innovators", location: "Remote" }
];

var apps = [];

// Serve index.html on the root route
app.get("/", function (req, res) {
  res.sendFile(path.join(code, "index.html"));
});

// Serve static files (CSS, JS, etc.)
app.use("/", express.static(code));

// Get all job postings
app.get("/get", function (req, res) {
  res.send(jobOpenings);
});

// Get all applications
app.get("/getApps", function (req, res) {
  res.send(apps);
});

// Add a new job posting
app.post("/addPosting", function (req, res) {
  jobOpenings.push(req.body);
  res.send("success");
});

// Add a new application
app.post("/addApp", function (req, res) {
  apps.push(req.body);
  res.send("success");
});

// Delete an application
app.post("/delApp", function (req, res) {
  console.log(req.body);
  apps.forEach((item, index) => {
    if (item.name == req.body.name) {
      apps.splice(index, 1);
    }
  });
  res.send("success");
});

// Delete a job posting
app.post("/delPost", function (req, res) {
  console.log(req.body);
  jobOpenings.forEach((item, index) => {
    if (item.title == req.body.position) {
      jobOpenings.splice(index, 1);
    }
  });
  res.send("success");
});

// Start the server
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});

