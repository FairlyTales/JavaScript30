window.addEventListener("keydown", (evt) => {
  // using backticks (`) to insert a variable in a string
  const audio = document.querySelector(`audio[data-key="${evt.key}"]`);
  const key = document.querySelector(`.key[data-key="${evt.key}"]`);

  // rewind the audio file to the start before playing it
  audio.currentTime = 0;
  audio.play();
  key.classList.add("playing");

  // console.log(key);
});

// select all .key elements on the page
const keys = document.querySelectorAll(".key");
// using forEach loop add to every .key element an event listener which triggers on the end of transition (CSS animation) and removes the .playing class from the .key element
keys.forEach((key) =>
  key.addEventListener("transitionend", (evt) => {
    // remove .playing class only if the event is a transform
    if (evt.propertyName == "transform") {
      key.classList.remove("playing");
    }
  })
);
