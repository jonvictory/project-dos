// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  
    // console.log('req.user', req.user)
    // console.log('req.user', next)
    if(req.route.path.includes('/admin')) {
      if((req.user && !req.user.adminz) || !req.user) {
        return res.redirect("/");
      }
    }
    else if(req.route.path.includes('.html')) {
      return res.redirect("/")
    }
  return next();

};