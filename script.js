const button = document.getElementById("button");

const audioElement = document.getElementById("audio");

//VoiceEss Javascript SDK

function toggleButton() {
  button.disabled = !button.disabled;
}

// passing Joke to voiceRSS Api
function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, "%20");
  VoiceRSS.speech({
    key: "<fd52fd3641264021b6198dd19789b9a0>",
    src: jokeString,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

//get joke from jokeapi
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    toggleButton();
  } catch (error) {
    console.log("woops", error);
  }
}

button.addEventListener("click", getJokes);
audio.addEventListener("ended", toggleButton);
