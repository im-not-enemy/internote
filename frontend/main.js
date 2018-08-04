function disp_next(){
  var buttons = document.getElementById('buttons');
  buttons.innerHTML =
  '<a href="#" class="square_btn" id="another_interval">next quiz</a>' +
  '<a href="#" class="square_btn" id="same_interval">next quiz(same interval)</a>'

  document.getElementById("another_interval").onclick = function() {
    location.href = "http://localhost/internote"
  }
  document.getElementById("same_interval").onclick = function() {
    location.href = "http://localhost/internote?default_interval=" + data.interval
  }
}

// メイン処理
var xmlHttp = new XMLHttpRequest();

// リクエストパラメータチェック
var query=location.search.substring(1)

// パラメータに応じてクイズ設定
if (query == "") {
  url = "http://localhost:5000/quiz"
  xmlHttp.open("get", url, false);
  xmlHttp.send("null");
  var data = JSON.parse(xmlHttp.responseText);

} else {
  var decodedQuery=decodeURI(query)
  url = "http://localhost:5000/quiz?" + decodedQuery
  xmlHttp.open("get", url, false);
  xmlHttp.send("null");
  var data = JSON.parse(xmlHttp.responseText);
};

// クイズ表示
var disp_quiz = document.getElementById('disp_quiz');
disp_quiz.innerHTML =
//  '<p> firstSound: ' + data.firstSound + '</p>' +
// '<p> upOrDown: ' + data.upOrDown + '</p>' +
  '<p> interval: ' + data.interval + '</p>' ;
//  '<p> SecondSound: ' + data.secondSound + '</p>'

// ボタンに連動したアクション
document.getElementById("play_first").onclick = function() {
  var synth = new Tone.Synth().toMaster();
  synth.triggerAttackRelease(data.firstSound,'1');
}

document.getElementById("play_second").onclick = function() {
  var synth = new Tone.Synth().toMaster();
  synth.triggerAttackRelease(data.secondSound,'1');
}


document.getElementById("sucess").onclick = function() {
  url = "http://localhost:5000/result"
  xmlHttp.open("post", url, false);
  xmlHttp.setRequestHeader('Content-Type','application/json');
  data = {
    "firstSound" : data.firstSound,
    "upOrDown" : data.upOrDown,
    "interval" : data.interval,
    "secondSound" : data.secondSound,
    "result" : "sucess"
  }
  xmlHttp.send(JSON.stringify(data));
  disp_next();
}

document.getElementById("failure").onclick = function() {
  url = "http://localhost:5000/result"
  xmlHttp.open("post", url, false);
  xmlHttp.setRequestHeader('Content-Type','application/json');
  data = {
    "firstSound" : data.firstSound,
    "upOrDown" : data.upOrDown,
    "interval" : data.interval,
    "secondSound" : data.secondSound,
    "result" : "failure"
  }
  xmlHttp.send(JSON.stringify(data));
  disp_next();
}

var notes = document.getElementById('notes');
var firstNote = data.firstSound.replace('#','%23');
var secondNote = data.secondSound.replace('#','%23');
notes.innerHTML =
'<img src=images/' + firstNote + '.PNG height="140" width="100">' +
'<img src=images/' + secondNote + '.PNG height="140" width="100">'
