

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


// database.ref().on("child_added", function(retrieveValue) {

//   var MovieName1 = [retrieveValue.val().MovieName];
 
//   console.log(MovieName1);
  
  

   //})

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

});

    
$('#my_form').keydown(function() {
    var key = e.which;
    if (key == 13) {
    // As ASCII code for ENTER key is "13"
    $('#my_form').submit(); // Submit form code
    }
    });
    


//add option to datalist using jquery

//document.ready(function() {
//  $("#search-name-input").autocomplete({
  //source: MovieName1,
 //autoFocus: true,
//});
//});
   

   
