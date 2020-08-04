from flask import Blueprint, jsonify, request, g
from decorators.check_token import check_token
from services.database import db
from models.User import User
import requests
from google.cloud import firestore
import datetime
from decorators.spotify_decorator import spotify_getToken

spotify = Blueprint("spotify", __name__)

@spotify.route("/connected", methods=['GET'])
@check_token
def _connected():
    if g.user.spotify:
        return jsonify({"status":"true"})
    return jsonify({"status":"false"})

@spotify.route("/connect", methods=['POST'])
@check_token
def  _connect():
    try :
        client = db.collection(u'secrets').document('Spotify').get().to_dict()
        _data = {'grant_type': "authorization_code", "code": request.form["code"], "redirect_uri": "http://localhost:4200/spotify_redirect", "client_id":client["client_id"], "client_secret":client["client_secret"]}
        r = requests.post("https://accounts.spotify.com/api/token", _data)
        ref = db.collection(u'Users').document(g.user.id)
        _dict = r.json()
        exp_in = _dict["expires_in"] - 60
        ref.update({"spotify": {"refresh_token": _dict["refresh_token"], "access_token": _dict["access_token"], "expires_at": datetime.datetime.utcnow() + datetime.timedelta(seconds=exp_in)}})
        return jsonify({"status": "ok"})
    except:
        return "Error", 400

@spotify.route("/disconnect", methods=['DELETE'])
@check_token
def  _disconnect():
    ref = db.collection(u'Users').document(g.user.id)
    ref.update({"spotify": firestore.DELETE_FIELD})
    return jsonify({"status": "ok"})

@spotify.route("/info", methods=['GET'])
@check_token
@spotify_getToken
def _info():
    headers = {'Authorization': 'Bearer ' + g.user.spotify["access_token"]}
    r = requests.get('https://api.spotify.com/v1/me', headers=headers)
    if r.status_code == 200:
        return r.json(), 200
    return {"status": "error"}, 400

@spotify.route("/playlists", methods=['GET'])
@check_token
@spotify_getToken
def _playlists():
    headers = {'Authorization': 'Bearer ' + g.user.spotify["access_token"]}
    r = requests.get('https://api.spotify.com/v1/me/playlists?offset=0&limit=50', headers=headers)
    if r.status_code :
        return r.json(), 200
    return {"status": "error"}, 400