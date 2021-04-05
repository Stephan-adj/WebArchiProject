var rand = 11;
var url = `https://api.themoviedb.org/3/movie/${rand}?api_key=5a905ae022c5ec2582edbfac057517d8`;

//To retrieve movie info
const Retrievemovieinfo = function(url) {
  fetch(url).then(function(res) {
    if (res.status != 200) {
      console.log("Error in response status: " + res.status);
    } else {
      res.json().then(function(json) {
        console.log(json);
        movieInfos = json;
        document.body.innerHTML +=
          `<div id='title'><div> Title : ${movieInfos.title}</div>` +
          `<div> <img src='https://image.tmdb.org/t/p/w500${movieInfos.poster_path}'></div></div>` +
          `<div> Release year : ${movieInfos.release_date}</div>` +
          `<input type='text' id='name_field' placeholder='Please input actor of the movie'>` +
          `<button id='submit_username' onclick='ValidateActor(\"${movieInfos.id}\")'>Submit</button>` +
          `<div id='previous1'></div>`;

        // Add a way for the user to submit form by pressing enter key
        var input = document.getElementById("name_field");
        input.addEventListener("keyup", function(event) {
          if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("submit_username").click();
          }
        });
      });
    }
  });
}

const ValidateActor = async (movieId) => {
  // Remove enter key for previous submission form.
  document.getElementById("name_field").removeEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("submit_username").click();
    }
  });

  console.log("TEST : " + movieId);
  var name = document.getElementById("name_field").value;
  console.log(name);
  var url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=5a905ae022c5ec2582edbfac057517d8`;
  console.log(url);
  const actors = await RetrieveActor(name, url);
  console.log(actors);
  if (actors != null) {
    //Disabled previous button
    document.getElementById("name_field").disabled = true;
    document.getElementById("submit_username").disabled = true;
    document.getElementById("previous1").innerHTML = "";
    document.body.innerHTML +=
      `<div id='name'> Name : ${actors[0]}<br></br><img src='https://image.tmdb.org/t/p/w500${actors[1]}'></div>` +
      `<input type='text' id='movie_field' placeholder='Please input a movie with this actor.'>` +
      `<button id='submit_movie' onclick='ValidateMovie(\"${actors[2]}\")'>Submit</button>` +
      `<div id='previous2'></div>`;
    // Add a way for the user to submit form by pressing enter key
    var input = document.getElementById("movie_field");
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("submit_movie").click();
      }
    });
  } else {
    document.getElementById("previous1").innerHTML = "<p id='wrong' style='color: red'> You put the wrong actor.</p>";
  }
}

const ValidateMovie = async (actorId) => {
  // Remove enter key for previous submission form.
  document.getElementById("movie_field").removeEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("submit_movie").click();
    }
  });

  console.log("TEST : " + actorId);
  var movie = document.getElementById("movie_field").value;
  console.log(movie);
  var url = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=5a905ae022c5ec2582edbfac057517d8`;
  console.log(url);
  const movies = await RetrieveMovie(movie, url);
  console.log(movies);
  if (movies != null) {
    //Disabled previous button
    document.getElementById("movie_field").disabled = true;
    document.getElementById("submit_movie").disabled = true;
    document.getElementById("previous2").innerHTML = "";
    document.body.innerHTML +=
      `<div id = 'titl'><div> Title : ${movies[0]}</div>` +
      `<div> Release year : ${movies[1]}</div>` +
      `<div> <img src='https://image.tmdb.org/t/p/w500${movies[2]}'></div>` +
      `<button id='PlayAgain' onclick='PlayAgain()'>Play Again ?</button>`;

  } else {
    document.getElementById("previous2").innerHTML = "<p id='wrong' style='color: red'> You put the wrong movie.</p>";
  }
}

const RetrieveActor = async (name, url) => {
  return fetch(url)
    .then(res => res.json())
    .then(json => {
      actors = json.cast;
      for (j = 0; j < actors.length; j++) {
        if (actors[j].name.toLowerCase() == name.toLowerCase()) {
          return [actors[j].name, actors[j].profile_path, actors[j].id];
        }
      }
      return null;
    })
}

const RetrieveMovie = async (movie, url) => {
  return fetch(url)
    .then(res => res.json())
    .then(json => {
      movies = json.cast;
      for (j = 0; j < movies.length; j++) {
        if (movies[j].title.toLowerCase() == movie.toLowerCase()) {
          return [movies[j].title, movies[j].release_date, movies[j].poster_path, movies[j].id];
        }
      }
      return null;
    })
}

const start = function() {
  const result = Retrievemovieinfo(url);
}

start();

const PlayAgain = function() {
  document.getElementById("main").innerHTML = "<h1>Welcome to the movie quizz static web application 😀</h1>";
  var rand = Math.floor(Math.random() * (15 - 5 + 1)) + 5; //Math.floor(Math.random() * (max - min + 1)) + min;
  console.log(rand);
  var url = `https://api.themoviedb.org/3/movie/${rand}?api_key=5a905ae022c5ec2582edbfac057517d8`;
  const result = Retrievemovieinfo(url);
}
