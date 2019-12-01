$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var unameInput = $("input#uname-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      uname: unameInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password || !userData.uname) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.uname, userData.password);
    emailInput.val("");
    unameInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, uname, password) {
    $.post("/api/signup", {
      email: email,
      uname: uname,
      password: password
    })
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
