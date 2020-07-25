from flask import request, g
from functools import wraps
from services.ip import get_ip
import requests

def check_token(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'x-access-token' not in request.headers:
            return 'Missing token', 401
        ip = get_ip("auth")
        res = requests.get(ip + "/check_token", headers={'x-access-token':request.headers['x-access-token']})
        if res.status_code == 200:
            g.user = User.from_dict(res.json())
            return f(*args, **kwargs)
        return res.text, res.status_code
    return wrap