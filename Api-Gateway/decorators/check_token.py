from flask import request, g
from functools import wraps
from models.User import User
import jwt
from services.database import db


def check_token(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'x-access-token' not in request.headers:
            return 'Missing access token', 400
        try:
            payload = jwt.decode(request.headers.get("x-access-token"), db.collection(u'secrets').document(u'token_key').get().to_dict()['value'])
            _dict = db.collection(u'Users').document(payload["sub"]).get().to_dict()
            g.user = User.from_dict(_dict)
            g.user.id = payload["sub"]
            return f(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.', 401
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.', 401
    return wrap