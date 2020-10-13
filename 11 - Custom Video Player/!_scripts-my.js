const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const buttonToggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const buttonFullScreen = player.querySelector(".js-fullScreen");

function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
}

function updatePlayButton() {
  let icon;
  // show "pause" icon when video is running, "start" when video is paused
  if (video.paused) icon = "⏵︎";
  else icon = "⏸︎";
  buttonToggle.textContent = icon;
}

function skip() {
  // parseFloat takes an argument and returns a float, we use it to convert a string into a number
  // this.dataset lets us access all "data-" attributes in the element and than select the desired one using don notation
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  // we gave 'playbackRate' and 'volume' values to our 'name' attributes in range inputs, this value correspond to a video.playbackRate and video.volume params, so we can simply use the assignment bellow to change the values when input values change
  video[this.name] = this.value;
  console.log(`param ${this.name}  value ${this.value}`);
}

function handleProgress() {
  // calculate how much % of video has already been shown
  const percent = (video.currentTime / video.duration) * 100;

  // our progressbar is a flex element, we change it's flexBasis value in css to make it correspond to a current percent
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(evt) {
  // evt.offsetX - position of cursor during the event relative to an element
  // progress.clientWidth - width of the progress bar
  // evt.offsetX [px] divide by progress.clientWidth [px] equals % of the video to which the user wanna scrub
  // than we multiply this % by video.duration [sec] to get a value in [sec] to pass it as the new value of video.currentTime
  video.currentTime = (evt.offsetX / progress.offsetWidth) * video.duration;
}

function toggleFullScreen() {
  video.requestFullscreen();
}

function handleKeyPress(evt) {
  if (evt.code === "Space") togglePlay();
  else if (evt.code === "ArrowLeft") skipButtons[0].click();
  else if (evt.code === "ArrowRight") skipButtons[1].click();
  else if (evt.code === "Enter") toggleFullScreen();
}

video.addEventListener("click", togglePlay);
buttonToggle.addEventListener("click", togglePlay);
document.addEventListener("keyup", handleKeyPress); // handle the keyboard events
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
skipButtons.forEach((skipButton) => skipButton.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
video.addEventListener("timeupdate", handleProgress);

let mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (evt) => {
  if (mouseDown) scrub(evt);
});
progress.addEventListener("mousedown", () => (mouseDown = true));
progress.addEventListener("mouseup", () => (mouseDown = false));
buttonFullScreen.addEventListener("click", toggleFullScreen);
