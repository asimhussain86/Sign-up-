const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const userName = req.body.fullName;
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  var data = {
    members: [
      {
        email_address: userEmail,
        status: "subscribed",
        merge_fields: {
          FNAME: userName,
          LNAME: userPassword,
        },
      },
    ],
  };
  const jsonndata = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/4a0feae078 ";
  const options = {
    method: "post",
    auth: "ranaasimhussain:2d83f56766b74f7bbf0ffc53f9b220a4-us21",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonndata);
  request.end();
});
app.post("/failure", function (req, res) {
  res.redirect("/");
});
app.listen(3000, function (req, res) {
  console.log("The server is working on port 3000");
});

// api Key
// 2d83f56766b74f7bbf0ffc53f9b220a4-us21
//  List Id
//  4a0feae078
