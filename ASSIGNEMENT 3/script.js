var url = "https://api.themoviedb.org/3/movie/11?api_key=5a905ae022c5ec2582edbfac057517d8";

//To retrieve movie info
const Retrievemovieinfo = function(url) {
  fetch(url).then(function (res) {
        if (res.status != 200) {
            console.log("Error in response status: " + res.status);
            reject(error);
        } else {
            res.json().then(function (json) {
              console.log(json);
              movieInfos = json;
              document.body.innerHTML +=
                  `<div id='title'><div> Title : ${movieInfos.title}</div>` +
                  `<div> <img src='https://image.tmdb.org/t/p/w500${movieInfos.poster_path}'></div></div>` +
                  `<div> Release year : ${movieInfos.release_date}</div>` +
                  "<input type='text' id='name_field' placeholder='Please input director or actor of the movie'>" +
                  "<button id='submit_username' onclick='test()'>Submit</button>";
                  //"<a href='#' onclick='Submit(\"${movieInfos.id}\")' class='buttonContainer'>Submit my guess</a></div>";
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

const start = function() {
  const result = Retrievemovieinfo(url);

}

const test = function() {
  console.log("TEST : ");
}

start();
