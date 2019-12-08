// Requiring necessary npm packages
var express = require("express");
var session = require("express-session");
const bodyParser = require('body-parser')

// Requiring passport as we've configured it
var passport = require("./config/passport");
require('dotenv').config()
// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");
require('dotenv').config()
var fs = require('fs');

// Creating express app and configuring middleware needed for authentication tesssst
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json())
app.use('/', [
  require('./routes/fileupload')
])

// Requiring our routes
require("./routes/admin-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
require("./routes/post-api-routes.js")(app);
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});
