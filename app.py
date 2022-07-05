import base64
import time
from flask import Flask, request
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello World'

@app.route('/upload', methods=['POST'])
@cross_origin(origin='*')
def upload():
    name = request.json['name']
    data = request.json['imgData']
    # print(data)
    with open('%s/%s.png' % (name, time.time()), 'wb') as f:
        f.write(base64.b64decode(data))
    return 'completed'