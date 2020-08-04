from flask import request, g
from functools import wraps
from models.User import User
from services.database import db
import datetime
import pytz
import requests

utc=pytz.UTC

def spotify_getToken(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if datetime.datetime.utcnow().replace(tzinfo=utc) >= g.user.spotify["expires_at"].replace(tzinfo=utc):
            client = db.collection(u'secrets').document('Spotify').get().to_dict()
            _data = {"grant_type": "refresh_token", "refresh_token": g.user.spotify["refresh_token"], "client_id":client["client_id"], "client_secret":client["client_secret"]}
            r = requests.post('https://accounts.spotify.com/api/token', _data)
            _dict = r.json()
            g.user.spotify["access_token"] = _dict["access_token"]
            ref = db.collection(u'Users').document(g.user.id)
            _dict = r.json()
            exp_in = _dict["expires_in"] - 60
            ref.update({"spotify": {"refresh_token": g.user.spotify["refresh_token"], "access_token": _dict["access_token"], "expires_at": datetime.datetime.utcnow() + datetime.timedelta(seconds=exp_in)}})
        return f(*args, **kwargs)
    return wrap