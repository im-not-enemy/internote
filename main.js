var soundArray = [
  'C3','C#3','D3','D#3','E3','F3','F#3','G3','G#3','A3','A#3','B3',
  'C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4',
  'C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5','C6'
];
var intervalArray = [
  '完全1度','短2度','長2度','短3度','長3度','完全4度','増4度\/減5度',
  '完全5度','短6度','長6度','短7度','長7度','完全8度'
];

function getSoundId(min,max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getFirstSound(){
  var firstSound = soundArray[getSoundId(12,24)];
  return firstSound;
}

function getInterval(){
  var intervalId = parseInt(Math.random() * intervalArray.length);
  return intervalArray[intervalId];
}

function getUpOrDown(){
  var flag = parseInt(Math.random() * 10 + 1) % 2;
  if (flag == 0){
    return "up";
  } else {
    return "down";
  }
}

function getSecondSound(firstSound,upOrDown,interval){
  var srcId = soundArray.indexOf(firstSound);
  var dstId = intervalArray.indexOf(interval);

  if (upOrDown == "up"){
    return soundArray[srcId + dstId];
  } else if (upOrDown == "down"){
    return soundArray[srcId - dstId];
  }
}

// MAIN
var firstSound = getFirstSound();
var upOrDown = getUpOrDown();
var interval = getInterval();
var secondSound = getSecondSound(firstSound,upOrDown,interval);

document.write("<br> firstSound:" + firstSound);
document.write("<br> upOrDown:" + upOrDown);
document.write("<br> interval:" + interval);
document.write("<br> secondSound:" + secondSound);

document.getElementById("play_first").onclick = function() {
  var synth = new Tone.Synth().toMaster();
  synth.triggerAttackRelease(firstSound,'1');
}

document.getElementById("play_second").onclick = function() {
  var synth = new Tone.Synth().toMaster();
  synth.triggerAttackRelease(secondSound,'1');
}
