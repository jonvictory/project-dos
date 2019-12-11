// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/admin/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/admin/members.html"));
  });

  // cms route loads cms.html
  app.get("/admin/cms", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/admin/cms.html"));
  });

  // authors route loads author-manager.html
  app.get("/admin/user-manager", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/admin/user-manager.html"));
  });

};
