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
                  `<input type='text' id='name_field' placeholder='Please input director or actor of the movie'>` +
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

const ValidateActor = async (movideId) => {
  // Remove enter key for previous submission form.
  document.getElementById("name_field").removeEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("submit_username").click();
    }
  });

  console.log("TEST : "+ movideId);
  var name = document.getElementById("name_field").value;
  console.log(name);
  var url = `https://api.themoviedb.org/3/movie/${movideId}/credits?api_key=5a905ae022c5ec2582edbfac057517d8`;
  console.log(url);
  const actors = await RetrieveActor(name, url);
  console.log(actors);
  if (actors != null){
    document.getElementById("previous1").innerHTML = "";
    document.body.innerHTML +=
    `<div id='name'> Name : ${actors[0]}<br></br><img src='https://image.tmdb.org/t/p/w500${actors[1]}'></div>` +
    `<input type='text' id='name_field' placeholder='Please input director or actor of the movie'>` +
    `<button id='submit_username' onclick='ValidateActor(\"${actors[2]}\")'>Submit</button>`;
  }
  else{
    document.getElementById("previous1").innerHTML = "<p id='wrong' style='color: red'> You put the wrong actor.</p>";
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



const start = function() {
  const result = Retrievemovieinfo(url);
}

start();
