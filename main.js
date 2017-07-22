/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

let results = document.querySelector(".slideshow-container");
let tmpURL = "https://itunes.apple.com/search?media=music&limit=200&term=adele";
let songName = document.getElementById("songName");
let slideIndex = 1;

function fetchData() {
  fetch(tmpURL)
    .then(
    function (response) {
      if (response.status !== 200) {
        console.log(response.status);
        return;
      }
      response.json().then(function (data) {
        console.log(data);
        loadSongs(data);
      });
    }
    )
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });
}
function loadSongs(data) {
  let songDiv = "";
  let arrows = "";
  for (let i = 0; i < data.results.length; i++) {

    if (i % 10 === 0) {                 //create a slide for every 10 songs
      songDiv += `<div class="mySlides fade"><div id="results">`
    }

    songDiv += `<div id="${data.results[i].previewUrl}" class="song">`   //song div

    if (data.results[i].artworkUrl100 === "" || data.results[i].artworkUrl100 === null) {
      songDiv += `<img id="${song.previewUrl}" src="./img/song_img_placeholder.jpg">`
    }
    else {
      songDiv += `<img src="${data.results[i].artworkUrl100}"></img>`
    }

    songDiv += `<p id="trackName">${data.results[i].trackName}</p>
                <p id="artistName">${data.results[i].artistName}</p></div>`

    if ((i - 9) % 10 === 0 || (data.results.length - i === 1)) {
      songDiv += `</div></div>`   //close slide div
    }
  }
  arrows = `<a class="prev" onclick="plusSlides(-1)">&#10094;</a>
          <a class="next" onclick="plusSlides(1)">&#10095;</a>`

  results.innerHTML = songDiv + arrows;
  showSlides(slideIndex);
}
//    Play song

document.querySelector(".slideshow-container").addEventListener('click', function (e) {
  e.preventDefault();
  var target = e.target;
  if (target.parentElement.id !== "") {
    if (target.parentElement.id !== "results") {
      var audio = document.getElementById("music-player");
      var sname = target.parentElement.children[1].innerHTML; //song name
      songName.innerHTML = "Now Playing: " + sname;     //display under audio tag

      audio.src = target.parentElement.id;
      audio.load();
      audio.play();
    }
  }
})
document.getElementById("submit").addEventListener('click', function (e) {
  e.preventDefault();
  var target = e.target;
  var tmp = document.getElementById("searchBox").value;
  tmpURL = "https://itunes.apple.com/search?media=music&term=" + tmp;
  fetchData();
})

//              SLIDES 
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";

}