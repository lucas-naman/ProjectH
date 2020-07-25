from flask import Blueprint, jsonify, request
from .database.database import db
from .models.user import User
import jwt

me = Blueprint("me", __name__)

@me.route("", methods=["GET"])
def _me():
    if 'x-access-token' not in request.headers:
        return 'Missing access token', 400
    try:
        payload = jwt.decode(request.headers.get("x-access-token"), db.collection(u'secrets').document(u'token_key').get().to_dict()['value'])
        _dict = db.collection(u'Users').document(payload["sub"]).get().to_dict()
        return jsonify({"email": _dict["email"], "username": _dict["username"], "registration_date": _dict["registration_date"]})
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.', 401
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.', 401