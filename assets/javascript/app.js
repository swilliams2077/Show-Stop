
$("#search-submit").on('click', function (event) {    
  event.preventDefault();
     $("#movieList").html("");
     var movie = $("#search-name-input").val();
     $("#search-name-input").val("");

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

      mainTitle = response.Search[m].Title;

         var li = $('<li class="list-group-item">');
         li.append("<p>"+movie.Title);
         var posterimg = $("<img data-movie-title='" + movie.Title + "' onclick='imagClick(event)' src='" + movie.Poster + "' width=220>");
         li.append(posterimg);
         movielist.append(li);
         console.log(movie)
       }

     });
      /////////Firebase is starting here
database.ref().push({
MovieName : movie
})
});



function imagClick(event){
   console.log($(event.target).attr('data-movie-title'));
   
   $("#poster").html("")

   var movie = $(event.target).attr('data-movie-title');
   console.log(movie)
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
   movieT = response.Title;
   var movCol1 = $("<div>");
   movCol1.addClass("col-xs-3");
   var movCol2 = $("<div>");
   movCol2.addClass("col col-md-7");
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
   movCol1.append("<img src='" + response.Poster + "' width='300'>");
   RatingCol.append("<br>Rating:" + response.imdbRating + "<br>");
   const starTotal = 10;
   const ratings = response.imdbRating;
   if (ratings !== null) {

}

   $("#poster").append(movRow);
   const starPercentage = (ratings / starTotal) * 100;

   const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)-10}%`;

   console.log("WE'RE IN RATINGS")

   console.log($(".star-inner"));
   $(".star-inner").css("width", starPercentageRounded);
   console.log(starPercentageRounded);

   });
 // var movieT;
 // console.log(movieT)
 return gapi.client.youtube.search.list({
     "part": "snippet",
     "type" : "video",
     "maxResults": 1,
     "q":  movie+"official trailer",
     "videoDuration": "any"

   })
   .then(function(response) {
       // Handle the results here (response.result has the parsed body).
       console.log("Response", response);
       console.log(response.result.items[0].id.videoId)
       var videoLink = response.result.items[0].id.videoId; 
            
       loadVideo(videoLink);
   })

   .catch(function(err) { 
       console.error("Execute error", err); 
   })

}

///////////////////////////////Trialer///////////////////coding start here
// var videoLink;
//  <--scrit for youtube API-->//
window.onload = function loadClient() {
 gapi.client.setApiKey("AIzaSyDPjB_8jU30fhmIb8coQsQPp43zyGsXBec");
 return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
     .then(function() { console.log("GAPI client loaded for API"); },
           function(err) { console.error("Error loading GAPI client for API", err); });
};

gapi.load("client");
// end of youtube API script //

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function loadVideo(id) {
if(player){
player.destroy()
}
player = new YT.Player('player', {
height: '450',
width: '640',
videoId: id,
events: {
}
});
};

///firebase////////
var firebaseConfig = {
apiKey: "AIzaSyDMHMm6cO2Hav4MGrmf-WfZ3M-W1VEMC10",
authDomain: "project12-d4537.firebaseapp.com",
databaseURL: "https://project12-d4537.firebaseio.com",
projectId: "project12-d4537",
storageBucket: "project12-d4537.appspot.com",
messagingSenderId: "302112258587",
appId: "1:302112258587:web:8ac7f2a866705313"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
var movieSearchArray= [];
database.ref().on("child_added",function(reteriveValue){
var childData = reteriveValue.val().MovieName;
movieSearchArray.push(childData)


})

$(document).ready(function() {

$( "#search-name-input" ).autocomplete({
   
   source: movieSearchArray,
   
});

});
