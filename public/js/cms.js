$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and user select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var inputFile;
  var fileLocation;
  var cmsForm = $("#cms");

  $("#upload").submit(function() {
    console.log(this);
    $.ajax({
      url: $(this).attr("action"),
      type: $(this).attr("method"),
      dataType: "JSON",
      data: new FormData(this),
      processData: false,
      contentType: false,
      success: function(res, status) {
        console.log(res);
        console.log(res.files[0].location);
        $("#demo").html(res.return); //content loads here
        inputFile = res.files[0].originalname;
        fileLocation = res.files[0].location;
 
      },
      error: function(xhr, desc, err) {
        console.log("error");
      }
    });
    return false;
  });
  
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.uname);
    console.log(data.id);
   
    // Adding an event listener for when the form is submitted
    $(cmsForm).on("submit", handleFormSubmit);
    $;
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    
    var url = window.location.search;
    var postId;
    var userId = data.id;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;

    // If we have this section in our url, we pull out the post id from the url
    // In '?post_id=1', postId is 1
    if (url.indexOf("?post_id=") !== -1) {
      postId = url.split("=")[1];
      getPostData(postId, "post");
      
    }
    // Otherwise if we have a user_id in our url, preset the user select box to be our User
    else if (url.indexOf("?user_id=") !== -1) {
      userId = url.split("=")[1];
    }

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
      console.log(inputFile)
    console.log(fileLocation)
      event.preventDefault();

      // Wont submit the post if we are missing a body, title, or user
      if (!titleInput.val().trim() || !bodyInput.val().trim()) {
        return;
      }
      // Constructing a newPost object to hand to the database
      var newPost = {
        
        title: titleInput.val().trim(),
        body: bodyInput.val().trim(),
        inputFile: inputFile,
        fileLocation: fileLocation,
        UserId: userId
      };

      // If we're updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      if (updating) {
        newPost.id = postId;
        updatePost(newPost);
      } else {
        submitPost(newPost);
      }
    }

    // Submits a new post and brings user to content feed page upon completion
    function submitPost(post) {
      $.post("/api/posts", post, function() {
        window.location.href = "/members";
      });
    }

    // Gets post data for the current post if we're editing, or if we're adding to a user's existing posts
    function getPostData(id, type) {
      var queryUrl;
      switch (type) {
        case "post":
          queryUrl = "/api/posts/" + id;
          break;
        case "user":
          queryUrl = "/api/users/" + id;
          break;
        default:
          return;
      }
      $.get(queryUrl, function(data) {
        if (data) {
         
          console.log(data.UserId || data.id);
          // If this post exists, prefill our cms forms with its data
          titleInput.val(data.title);
          bodyInput.val(data.body);
          inputFile.val(data.inputFile);
          fileLocation.val(data.fileLocation);
          userId = data.UserId || data.id;
          // If we have a post with this id, set a flag for us to know to update the post
          // when we hit submit
          updating = true;
        }
      });
    }

    // Update a given post, bring user to the content feed page when done
    function updatePost(post) {
      $.ajax({
        method: "PUT",
        url: "/api/posts",
        data: post
      }).then(function() {
        window.location.href = "/members";
      });
    }
  });
});
