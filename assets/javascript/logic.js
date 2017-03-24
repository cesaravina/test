
$(document).ready(function(){

      $('html,body').animate({
              scrollTop: $("#landingDiv").offset().top
            }, 1000);

        
    $("#load").hide();
    $("#location").val(localStorage.getItem("location"));

    var auth = {  //probably want to remove this. Authorizations for Yelp. 
            consumerKey : "mOyhLJilhhfF8l52hBxBxQ",
            consumerSecret : "Na67XHeC7xHbqaWxsy9iOhq3v7Y",
            accessToken : "WwWS4BBR2UW3ckRnv3NTYzAzKfMFfJCN",
            // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
            // You wouldn't actually want to expose your access token secret like this in a real application.
            accessTokenSecret : "kEgrvy0tbYIbdrJAhm8QSQ3uZX4",
            serviceProvider : {
              signatureMethod : "HMAC-SHA1"
            }
          };

    var subArrayFood = [];
    var subArrayMovie = [];


    // when welcome button is clicked, we scroll to movei div
    $("#welcomeButton").on("click", function(){
    	
    	// moves to movie div
    	 $('html,body').animate({
              scrollTop: $("#movieDiv").offset().top
            }, 1000);
    });

    //Movie Roulette!
    //Movie Roulette!
    $("#movieButton").on("click", function(event){
    	event.preventDefault();
    	var source = $("#movieSource").val();
    		console.log(source);
    	var movieOrTv = $("#movieOrTv").val();
            console.log(movieOrTv);
    	var limit = "25";

        if (movieOrTv === "Movie"){
            console.log("this is a movie");
            pullMovieData();
        }
        if (movieOrTv === "TV Show"){
            console.log("this is a tvshow");
            pullTvData();

        }

        function pullMovieData(){
        $("#pushAdditionalMovieShow").empty();
    	$.ajax({
    		url: "https://api-public.guidebox.com/v2/movies?api_key=0f7834ab6a8de4e912af90c854ad31ff9c38eafe&sources=" + source + "&limit=" + limit,
    		method: 'GET'
    	}).done(function(response){
    		console.log(response);
    		var totalResults = response.total_results;
    		var numberOfPages = Math.floor(totalResults/limit);
    		var randomPage = Math.floor(Math.random() * numberOfPages + 0);

    		$.ajax({
    			url: "https://api-public.guidebox.com/v2/movies?api_key=0f7834ab6a8de4e912af90c854ad31ff9c38eafe&sources=" + source + "&limit=" + limit + "&offset=" + randomPage,
    			method: 'GET'
    		}).done(function(response){
    			var randomMovie = Math.floor(Math.random() * 24 + 0);
    			var pickedMovie = response.results[randomMovie];
    			$("#title").html(pickedMovie.title);
    			$("#poster").attr("src", pickedMovie.poster_240x342);
    			$("#rating").html("Rating: " + pickedMovie.rating);
    			$("#release_year").html("Release Year: " + pickedMovie.release_year);

                    // $("#userRating").html("User Rating: 99% (this is not real)");

                    // movieId = pickedMovie.id
                $.ajax({
                    url: "https://api.themoviedb.org/3/movie/" + pickedMovie.themoviedb + 
                    "?api_key=b73215616b0693802384cfe990b2e698", 
                    method: "GET"
                }).done(function(response2){
                $("#userRating").html("Enjoyment Score: " +response2.vote_average + "/10");
                $("#overview").html("Overview: " + response2.overview)
                console.log(response2)
                console.log(response2.vote_average)
                console.log(response2.overview)

                response.results.splice(randomMovie, 1); //take out the randomly chosen movie from the array 
                tempArray = shuffle(response.results);
                subArrayMovie = tempArray.splice(0, 5); //select the first 5 movies in the response results.

                for (var i = 0; i < 5; i++){
                    var newRow = $("<tr>");

                    var columnPic = $("<td>");
                    var pic = $("<img>");
                    pic.attr("src", subArrayMovie[i].poster_120x171);
                    columnPic.append(pic);
                    newRow.append(columnPic);

                    var columnTitle = $("<td>");
                    columnTitle.text(subArrayMovie[i].title);
                    newRow.append(columnTitle);

                    $("#pushAdditionalMovieShow").append(newRow);
                }


                })                

    		})
    	})
        }

        function pullTvData(){
            $("#pushAdditionalMovieShow").empty();
            $.ajax({
                url: "https://api-public.guidebox.com/v2/shows?api_key=0f7834ab6a8de4e912af90c854ad31ff9c38eafe&sources=" + source + "&limit=" + limit,
                method: 'GET'
            }).done(function(response){
                console.log(response);
                var totalResults = response.total_results;
                var numberOfPages = Math.floor(totalResults/limit);
                var randomPage = Math.floor(Math.random() * numberOfPages + 0);

                $.ajax({
                    url: "https://api-public.guidebox.com/v2/shows?api_key=0f7834ab6a8de4e912af90c854ad31ff9c38eafe&sources=" + source + "&limit=" + limit + "&offset=" + randomPage,
                    method: 'GET'
                }).done(function(response){
                    var randomTv = Math.floor(Math.random() * 24 + 0);
                    var pickedTv = response.results[randomTv];
                    console.log(pickedTv);
                    $("#title").html(pickedTv.title);
                    $("#poster").attr("src", pickedTv.artwork_304x171);
                    // $("#rating").html("Rating: " + pickedMovie.rating);
                    var tvYear = pickedTv.first_aired.slice(0,4)
                    $("#release_year").html("Release Year: " + tvYear);

                    // $("#userRating").html("User Rating: 99% (this is not real)");

                    // movieId = pickedMovie.id

                $.ajax({
                    url: "https://api.themoviedb.org/3/tv/" + pickedTv.themoviedb + 
                    "?api_key=b73215616b0693802384cfe990b2e698", 
                    method: "GET"
                }).done(function(response3){
                $("#userRating").html("Enjoyment Score: " +response3.vote_average + "/10");
                $("#overview").html("Overview: " + response3.overview)
                console.log(response3)
                console.log(response3.vote_average)
                console.log(response3.overview)

                    response.results.splice(randomTv, 1); //take out the randomly chosen movie from the array 
                    tempArray = shuffle(response.results);
                    subArrayMovie = tempArray.splice(0, 5); //select the first 5 movies in the response results.

                    for (var i = 0; i < 5; i++){
                    var newRow = $("<tr>");

                    var columnPic = $("<td>");
                    var pic = $("<img>");
                    pic.attr("src", subArrayMovie[i].artwork_208x117);
                    columnPic.append(pic);
                    newRow.append(columnPic);

                    var columnTitle = $("<td>");
                    columnTitle.text(subArrayMovie[i].title);
                    newRow.append(columnTitle);

                    $("#pushAdditionalMovieShow").append(newRow);
}

                })                         

                })
            })
        }

    	$('html,body').animate({
              scrollTop: $("#foodDiv").offset().top
            }, 1000);

    });


    // empty food array, stores food selections
    // TODO may need to update id's of checkbox
    var foodArray = [];

    // ckbox is equal to anything with class of checkbox
    var ckbox = $(".checkbox");
    // when you click on a check box
     $(ckbox).on("click", function () {
     	// if you just checked it
            if (this.checked) {
            	// we push the id of that check box to the food array
               foodArray.push($(this).attr("id"));

               // if we are unchecking the box
            } else if (!this.checked) {
            	// we removed that id from the food array
                foodArray.splice(foodArray.indexOf($(this).attr("id")), 1);

            }
        });

    // when you click the food button

    $("#foodButton").on("click", function(event){
    		// prevent form submission
    	event.preventDefault();



    	// foodSelection would hold a random food option from food array
    	var foodSelection = foodArray[Math.floor(Math.random() * foodArray.length)];
        foodArray = [];
    	// console log for debugging reasons 
    	console.log(foodSelection);
    		var terms = 'food,restaurant'; //terms to search for
            var near = $("#location").val().trim(); //location nearby to search for.
            var category_filter = foodSelection; //+ ",fooddeliveryservices";  //filters for categories to search for. Adds fooddeliveryservices category to only return delivery shops
            var radius = 8000; //sets how far to look for returned restaurant

            localStorage.setItem("location", near);

            var accessor = 
            {
                consumerSecret : auth.consumerSecret,
                tokenSecret : auth.accessTokenSecret
            };

            parameters = [];
            parameters.push(['term', terms]);
            parameters.push(['location', near]);
            parameters.push(["category_filter", category_filter]);
            parameters.push(["radius", radius]);
            parameters.push(['callback', 'cb']);
            parameters.push(['oauth_consumer_key', auth.consumerKey]);
            parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
            parameters.push(['oauth_token', auth.accessToken]);
            parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
            var message = {
                'action' : 'https://api.yelp.com/v2/search',
                'method' : 'GET',
                'parameters' : parameters
            };
            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);
            var parameterMap = OAuth.getParameterMap(message.parameters);
            parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
            console.log(parameterMap);
            $.ajax({
                'url' : message.action,
                'data' : parameterMap,
                'cache' : true,
                'dataType' : 'jsonp',
                'jsonpCallback' : 'cb',
                'method': "GET"
            })
            .done(function(data) {
                console.log(data);
                if (data.businesses.length === 0)
                {
                    $("#restaurant-name").text("Could Not Find Any Businesses of Your Selected Category, Try Another!");
                }
                var randNum = Math.floor(Math.random()*data.businesses.length)
                var temp = data.businesses[randNum]; //picks a random business from the returned data
                console.log(temp);
                
                var stringBuilder = [];
                temp.categories.forEach(function(element){
                    stringBuilder.push(element[0]);
                })
                $("#food-type").text(stringBuilder.toString());

                $("#restaurant-name").html(temp.name);
                $("#restaurant-description").html("<span class='blueFont'>Past Eater Says: </span>" +temp.snippet_text);
                $("#restaurant-phone").html("Phone: " + temp.display_phone);
                $("#restaurant-picture").attr("src", temp.image_url);
                $("#restaurant-rating").attr("src", temp.rating_img_url);
                $("#restaurant-link").attr("href", temp.url);

                $("#food-table").empty();
                data.businesses.splice(randNum, 1);
                var subArray = shuffle(data.businesses).splice(0, 5);
                subArray.forEach(function(element) { 
                    var newRow = $("<tr>");
                    var image = $("<img src="+element.image_url+ ">");
                    var imageCol = $("<td>");
                    imageCol.append(image);
                    newRow.append(imageCol);
                    newRow.append( $("<td>" + element.name + "</td>"));
                    newRow.append($("<td>" + element.display_phone + "</td>")); 
                    newRow.append( $("<td><img src="+ element.rating_img_url+"></td>"));
                    newRow.append($("<td><a href=" + element.url + " target='_blank' style='color: black'>"+"Go!"+"</a></td>")); 

                    $("#food-table").append(newRow);
                });
            });

        foodArray = [];
        foodSelection = "";
    	// clears the checkboxes purely for esthetics reasons
    	$('input[type=checkbox]').each(function() 
    	{ 
    	        this.checked = false; 
    	}); 

        $('html,body').animate({
        scrollTop: $("#resultsDiv").offset().top
        }, 1000);
    });

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

    $("#auto-location").on("click", function(event){
            // loading gif while getting IP
            $("#load").show()
            event.preventDefault();
          
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position){
                    console.log("lat: " + position.coords.latitude + " long: " + position.coords.longitude);
                    $("#location").val(position.coords.latitude+","+position.coords.longitude);
                    // hide loading gif
                    $("#load").hide()
                });

                } else {
                    // hide loading gif
                $("#load").hide()
                $("#location").text("Geolocation is not supported by this browser.");
            }
    });

    $("#refreshButton").on("click", function(event){
        window.location.reload();
    });

});   

    

