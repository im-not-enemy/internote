# -*- coding: utf-8 -*-

from flask import Flask, jsonify, request
import random
import urllib

app = Flask(__name__)

# json内で日本語を使用するため、ASCII変換を無効化する
app.config['JSON_AS_ASCII'] = False

# メイン処理(クイズをセット)
soundArray = [
  'C3','C#3','D3','D#3','E3','F3','F#3','G3','G#3','A3','A#3','B3',
  'C4','C#4','D4','D#4','E4','F4','F#4','G4','G#4','A4','A#4','B4',
  'C5','C#5','D5','D#5','E5','F5','F#5','G5','G#5','A5','A#5','B5','C6'
]
intervalArray = [
  '完全1度','短2度','長2度','短3度','長3度','完全4度','増4度/減5度',
  '完全5度','短6度','長6度','短7度','長7度','完全8度'
]

def getFirstSound():
  return soundArray[random.randrange(12,24)]

def getInterval():
  return intervalArray[random.randrange(0,13)]

def getUpOrDown():
  if random.randrange(0,2) == 0:
    return "Up"
  else:
    return "Down"

def getQuiz(default_interval):
  firstSound = getFirstSound()
  upOrDown = getUpOrDown()

  if not default_interval:
    interval = getInterval()
  else:
    interval = default_interval.encode('utf-8')

  if upOrDown == "Up":
    secondSound = soundArray[ soundArray.index(firstSound) + intervalArray.index(interval) ]
  else:
    secondSound = soundArray[ soundArray.index(firstSound) - intervalArray.index(interval) ]

  quiz = {
    "firstSound": firstSound,
    "interval": interval,
    "upOrDown": upOrDown,
    "secondSound": secondSound
  }
  return jsonify(quiz)

# クイズ用URI定義
@app.route('/quiz',methods=['GET'])
def quiz():
  default_interval = request.args.get('default_interval')
  return getQuiz(default_interval)

# main.jsからのAPIコールに応答するため、他ドメインからのAPIコールを許可する
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')
