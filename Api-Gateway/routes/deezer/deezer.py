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
    # try :
    client = db.collection(u'secrets').document('Deezer').get().to_dict()
    _data = {'app_id': client['client_id'], "secret": client["client_secret"], "code": request.form["code"], }
    r = requests.get("https://connect.deezer.com/oauth/access_token.php", _data)
    ref = db.collection(u'Users').document(g.user.id)
    # _dict = r.json()
    print(r.text)
    # exp_in = _dict["expires_in"] - 60
    # ref.update({"deezer": {"refresh_token": _dict["refresh_token"], "access_token": _dict["access_token"], "expires_at": datetime.datetime.utcnow() + datetime.timedelta(seconds=exp_in)}})
    return jsonify({"status": "ok"})
    # except:
    #     return "Error", 400