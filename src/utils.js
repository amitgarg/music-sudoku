export function range(start, end) {
  if (end > start) {
    let range = [];
    for (var i = start; i < end; i++) {
      range.push(i);
    }
    return range;
  } else {
    return [];
  }
}

var context;
var oscillator;

export function initializeMusic() {
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  var o = context.createOscillator();
  o.type = 'sine';
  var gainNode = context.createGain();
  o.connect(gainNode);
  gainNode.connect(context.destination);
  o.frequency.value = 0;
  o.start();
  oscillator = o;
}

export function updateNote(frequency) {
  oscillator.frequency.value = frequency;
}

export function stopMusic() {
  oscillator.stop();
  context.close();
}
