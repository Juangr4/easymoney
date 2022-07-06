import base64
import time
import os
from flask import Flask, request
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Server for upload images that will be use in the IA training process'

@app.route('/upload', methods=['POST'])
@cross_origin(origin='*')
def upload():
    name = request.json['name']
    data = request.json['imgData']
    if not os.path.exists(name):
        os.mkdir(name)
    with open('%s/%s.png' % (name, time.time()), 'wb') as f:
        f.write(base64.b64decode(data))
    return 'Image upload completed'