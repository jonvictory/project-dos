// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {

    if(req.route.path.includes('/admin')) {
      if((req.user && !req.user.adminz) || !req.user) {
        return res.redirect("/");
      }
      return next();
    }
    else if (req.user) {
      return next();
    }
    return res.redirect("/");    
  
};

