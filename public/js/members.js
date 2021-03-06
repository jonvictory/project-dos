$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var name;
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.uname);
  });
  // blogContainer holds all of our posts
  var blogContainer = $(".blog-container");
  var postCategorySelect = $("#category");
  var posts;

  // The code below handles the case where we want to get content posts for a specific user
  // Looks for a query param in the url for user_id
  var url = window.location.search;
  var userId;

  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getPosts(userId);
    console.log(userId);
  }
  // If there's no userId we just get all posts as usual
  else {
    getPosts();
  }

  // This function grabs posts from the database and updates the view
  function getPosts(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    console.log(userId);
    $.get("/api/posts" + userId, function(data) {
      console.log("Posts", data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty(user);
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deletePost(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/posts/" + id
    }).then(function() {
      getPosts(postCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed post HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    blogContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newPostCard = $("<div>");
    newPostCard.addClass("card");
    var newPostCardHeading = $("<div>");
    newPostCardHeading.addClass("card-header");
    var newPostTitle = $("<h2>");
    var newPostDate = $("<small>");
    var newPostUser = $("<h5>");
    var newLink = $("<a>");

    newPostUser.text("Written by: " + post.User.uname);
    newPostUser.css({
      float: "right",
      "margin-top": "-10px"
    });
    var newPostCardBody = $("<div>");
    newPostCardBody.addClass("card-body");
    var newPostBody = $("<p>");
    newPostTitle.text(post.title + " ");
    var newInputFile = post.fileLocation;
    newLink.text(post.inputFile);
    newLink.attr("href", newInputFile);
    console.log(newInputFile);
    newPostBody.text(post.body);
    newPostDate.text(formattedDate);
    newPostTitle.append(newPostDate);
    newPostCardHeading.append(newPostTitle);
    newPostCardHeading.append(newPostUser);

    newPostCardBody.append(newLink);

    newPostCardBody.append(newPostBody);
    newPostCard.append(newPostCardHeading);
    newPostCard.append(newPostCardBody);
    newPostCard.data("post", post);
    return newPostCard;
  }

  // This function figures out which post we want to delete and then calls deletePost
  function handlePostDelete() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    deletePost(currentPost.id);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data("post");
    window.location.href = "/cms?post_id=" + currentPost.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for User #" + id;
    }

    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html(
      "No posts yet" +
        partial +
        ", navigate <a href='/cms" +
        query +
        "'>here</a> in order to get started."
    );
    blogContainer.append(messageH2);
  }
});
