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
document.write("<br> firstSound:" + data.firstSound);
document.write("<br> upOrDown:" + data.upOrDown);
document.write("<br> interval:" + data.interval);
document.write("<br> secondSound:" + data.secondSound);

// ボタンに連動したアクション
document.getElementById("play_first").onclick = function() {
  var synth = new Tone.Synth().toMaster();
  synth.triggerAttackRelease(data.firstSound,'1');
}

document.getElementById("play_second").onclick = function() {
  var synth = new Tone.Synth().toMaster();
  synth.triggerAttackRelease(data.secondSound,'1');
}

document.getElementById("another_interval").onclick = function() {
  location.href = "http://localhost/internote"
}

document.getElementById("same_interval").onclick = function() {
  location.href = "http://localhost/internote?default_interval=" + data.interval
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
}
