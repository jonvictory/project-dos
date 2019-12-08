// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  
    // console.log('req.user', req.user)
    // console.log('req.user', next)
    console.log('isamind', req.route.path.includes('/admin'))
    if(req.route.path.includes('/admin')) {
      if((req.user && !req.user.adminz) || !req.user) {
        return res.redirect("/");
      }
    }
    else if(req.route.path.includes('.html')) {
      return res.redirect("/")
    }
  return next();

  // console.log ('req', req.route.path)
  // console.log ('next.value', next.value)
  // if (req.user.adminz === true) {
  //   return res.redirect("/admin/members.html")
  // }
  

  // else if (req.user.adminz === false) {
  // }
  // If the user isn't logged in, redirect them to the login page
};