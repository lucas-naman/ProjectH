from flask import Blueprint, jsonify, request
import jwt
from .database.database import db
from .models.user import User

check_token = Blueprint("check_token", __name__)

@check_token.route("", methods=["GET"])
def _check_token():
    if 'x-access-token' not in request.form:
        return 'Missing access token', 400
    try:
        payload = jwt.decode(request.form["x-access-token"], db.collection(u'secrets').document(u'token_key').get().to_dict()['value'])
        return jsonify(id=payload['sub'])
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.', 401
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.', 401