$(document).ready(function() {
  $("#postComment").click(function() {

    var myobj = { Name: $("#name").val(), Comment: $("#comment").val() };
    jobj = JSON.stringify(myobj);
    $("#json").text(jobj);
    var url = "comment";
    $.ajax({
      url: url,
      type: "POST",
      data: jobj,
      contentType: "application/json; charset=utf-8",
      success: function(data, textStatus) {
        $("#done").html(textStatus);
      }
    })
  });



  $("#deleteComments").click(function() {
    $("#comments").html("");
    $("#queryResults").html("");
    $("#done").html(" <br>Deleted.");
    $.ajax({
      url: "/delete",
      type: "DELETE",
      contentType: "application/json; charset=utf-8",
      success: function(data, textStatus) {}
    });
  });










  $("#getComments").click(function(event) {
    event.preventDefault();
    var url = "comment?q=GETALL";
    $("#name").val("");
    $("#comment").val("");
    $.getJSON(url, function(data) {
      $("#done").html("");
      console.log(data);
      if (data.length == 0) {
        var errormessage = 'Yo theres nothing here';

        $("#done").html(errormessage);
      }
      var everything = "<ul>";
      for (var comment in data) {
        com = data[comment];
        everything += "<li class=\"list-group-item\">  Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  })













  $("#queryComment").click(function() {

    console.log($("#query").val());
    $.ajax({
      url: "/search",
      type: "GET",
      data: { str: $("#name").val() },
      contentType: "application/json; charset=utf-8",
      success: function(data, textStatus) {
        console.log(data);
        var everything = "<ul>";
        for (var comment in data) {
          var com = data[comment];
          everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
        }

        everything += "</ul>";
        $("#comments").html("");
        $("#queryResults").html(everything);
      }
    })
    $("#done").html("");
    $("#json").text("");
    $("#name").html("");
    $("#comment").html("");
    $("#queryResults").html("");
  })




});
