// capture click function
$("#search-submit").on('click', function (event) {
  console.log("clicked")
  event.preventDefault();
  var movie = $("#search-name-input").val();

  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&type=&r=json&y=&plot=short&apikey=7cb1822e";
  var movRow = $("<div>");
  movRow.addClass("row");
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    console.log(response.Runtime);
    console.log(response.Title);
    var movCol1 = $("<div>");
    movCol1.addClass("col-xs-3");
    var movCol2 = $("<div>");
    movCol2.addClass("col col-md-4");
    movRow.append(movCol1, movCol2);
    var titleCol = $("<div>");
    titleCol.addClass("TitleDiv");
    var RatingCol = $("<div>");
    RatingCol.addClass("star-outer");
    var starinner = $("<div>")
    starinner.addClass("star-inner");
    RatingCol.append(starinner);

    var PlotCol = $("<div>");
    PlotCol.addClass("SummaryDiv");
    movCol2.append(titleCol, RatingCol, PlotCol);
    titleCol.text("Title:" + response.Title);
    PlotCol.append("Summary:" + response.Plot + "<br>");
    movCol1.append("<img src='" + response.Poster + "'>");
    RatingCol.append("Rating:" + parseInt(response.imdbRating) + "<br>");
    

    ///start of calculating the rating
    const starTotal = 10;
    const ratings = response.imdbRating;

    if (ratings !== null) {
      
      var movieName = $("#search-name-input").val();

      var queryURL = "https://www.omdbapi.com/?s=" + movie + "&type=&r=json&y=&plot=short&apikey=7cb1822e";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        var search = response.search;

        var movielist = $("#movieList")
        for (var m in response.Search) {
          var movie = response.Search[m];

          var li = $('<li class="list-group-item">');
          li.append(movie.Title);
          var posterimg = $("<img src='" + movie.Poster + "' width=100>");
          li.append(posterimg);
          movielist.append(li);
          console.log(movie)
        
        }


      });

    }

    $("#poster").append(movRow);
    const starPercentage = (ratings / starTotal) * 100;
    
    
    const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)-10}%`;
    

    console.log("WE'RE IN RATINGS")

    console.log($(".star-inner"));
    $(".star-inner").css("width", starPercentageRounded);
    console.log(starPercentageRounded);

    });
  $("#poster").html("")
  $("#movieList").html("");


/////////Firebase is starting here
database.ref().push({
  MovieName : movie
})


});

// var firebaseConfig = {
//   apiKey: "AIzaSyCahQMfRvhctKyhFmN-FaHOc4hJHq6YedU",
//   authDomain: "project1-f6ec3.firebaseapp.com",
//   databaseURL: "https://project1-f6ec3.firebaseio.com",
//   projectId: "project1-f6ec3",
//   storageBucket: "",
//   messagingSenderId: "1079505439609",
//   appId: "1:1079505439609:web:a05a9b1dae094183"
// };

var firebaseConfig = {
    apiKey: "AIzaSyCEp_9tzco8V0VjtnEmR-rfWpMVVmJm7V0",
    authDomain: "show-stoppers.firebaseapp.com",
    databaseURL: "https://show-stoppers.firebaseio.com",
    projectId: "show-stoppers",
    storageBucket: "show-stoppers.appspot.com",
    messagingSenderId: "312128806732",
    appId: "1:312128806732:web:8c4c228984359a10"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();


database.ref().on("child_added", function(retrieveValue) {

  var MovieName1 = [retrieveValue.val().MovieName];
 
  console.log(MovieName1);
  
  

   })

   var movieSearchArray= []
database.ref().on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
      movieSearchArray.push(childData.MovieName)
    });
});

for (var i=0; i<movieSearchArray.length; i++) {
    var movieName = [i] 
}

firebase.database().ref().on("value",function(snapshot){
    $("#movieName").html(snapshot.val().name);
})

//add option to datalist using jquery

//document.ready(function() {
//  $("#search-name-input").autocomplete({
  //source: MovieName1,
 //autoFocus: true,
//});
//});
   

   
