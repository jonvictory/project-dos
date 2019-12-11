$(document).ready(function() {
  // Getting references to the name input and user container, as well as the table body
  var nameInput = $("#user-name");
  var emailInput = $("#user-email")
  var passwordInput = $("#user-password")
  var userList = $("tbody");
  var userContainer = $(".user-container");

  // Getting the initial list of Users
  getUsers();

  // Function for creating a new list row for users
  function createUserRow(userData) {
    var newTr = $("<tr>");
    newTr.data("user", userData);
    newTr.append("<td>" + userData.uname + "</td>");
    if (userData.Posts) {
      newTr.append("<td> " + userData.Posts.length + "</td>");
    } else {
      newTr.append("<td>0</td>");
    }
    newTr.append("<td><a href='/members?user_id=" + userData.id + "'>Go to Posts</a></td>");
    return newTr;
  }

  // Function for retrieving users and getting them ready to be rendered to the page
  function getUsers() {
    $.get("/api/users", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createUserRow(data[i]));
      }
      renderUserList(rowsToAdd);
      nameInput.val("");
      emailInput.val("");
      passwordInput.val("");
    });
  }

  // A function for rendering the list of users to the page
  function renderUserList(rows) {
    userList.children().not(":last").remove();
    userContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      userList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }

  // Function for handling what to render when there are no users
  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create a User before you can create a Post.");
    userContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("user");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/users/" + id
    })
      .then(getUsers);
  }
});
