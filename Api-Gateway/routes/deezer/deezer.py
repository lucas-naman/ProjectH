from flask import Blueprint, jsonify, request, g
from decorators.check_token import check_token
from services.database import db
from models.User import User
import requests
from google.cloud import firestore
import datetime

deezer = Blueprint("deezer", __name__)

@deezer.route("/connected", methods=['GET'])
@check_token
def _connected():
    if g.user.deezer:
        return jsonify({"status":"true"})
    return jsonify({"status":"false"})

@deezer.route("/connect", methods=['POST'])
@check_token
def  _connect():
    try :
        client = db.collection(u'secrets').document('Deezer').get().to_dict()
        _data = {'app_id': client['client_id'], "secret": client["client_secret"], "code": request.form["code"]}
        r = requests.get("https://connect.deezer.com/oauth/access_token.php", _data)
        ref = db.collection(u'Users').document(g.user.id)
        ref.update({"deezer": {"token": r.text[r.text.index('=') + 1:r.text.index('&')]}})
        return jsonify({"status": "ok"})
    except:
        return "Error", 400

@deezer.route("/info", methods=['GET'])
@check_token
def _info():
    r = requests.get('https://api.deezer.com/user/me?access_token=' + g.user.deezer["token"])
    if r.status_code == 200:
        return r.json(), 200
    return {"status": "error"}, 400

@deezer.route("/playlists", methods=['GET'])
@check_token
def _playlists():
    r = requests.get('https://api.deezer.com/user/me/playlists?access_token=' + g.user.deezer["token"])
    if r.status_code :
        return r.json(), 200
    return {"status": "error"}, 400

@deezer.route("/playlist", methods=['GET'])
@check_token
def _playlist():
    print('ze')
    if 'playlist_id' in request.headers:
        r = requests.get('https://api.deezer.com/playlist/'+ request.headers['playlist_id'] + '?access_token=' + g.user.deezer["token"])
        print(r.json)
        if r.status_code :
            return r.json(), 200
    return {"status": "error"}, 400