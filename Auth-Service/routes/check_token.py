from flask import Blueprint, jsonify, request
import jwt
from .database.database import db
from .models.user import User

check_token = Blueprint("check_token", __name__)

@check_token.route("", methods=["GET"])
def _check_token():
    if 'x-access-token' not in request.headers:
        return 'Missing access token', 400
    try:
        payload = jwt.decode(request.headers.get("x-access-token"), db.collection(u'secrets').document(u'token_key').get().to_dict()['value'])
        _dict = db.collection(u'Users').document(payload["sub"]).get().to_dict()
        return jsonify(User.from_dict(_dict).to_dict_nopwd())
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.', 401
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.', 401