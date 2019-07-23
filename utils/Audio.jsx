import sound from './5.mp3';
export const buttonPressedSound = () => play(sound);

function play(path) {
  let audio = new Audio(sound);
  let promise = audio.play();
  if (promise !== undefined) {
    promise.then(function() {
      audio = null;
      // Automatic playback started!
    }).catch(function(error) {
      // Automatic playback failed.
      // Show a UI element to let the user manually start playback.
    });
  }
}