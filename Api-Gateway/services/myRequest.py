from services.ip import get_ip
import requests

class MyRequest:

    def get(_service, _route, _headers):
        ip = get_ip(_service)
        res = requests.get(ip + _route)
        if res.status_code == 200:
            return res.json(), res.status_code
        return res.text, res.status_code

    def post(_service, _route, _params, _headers):
        ip = get_ip(_service)
        res = requests.post(ip + _route, _params, _headers)
        if res.status_code == 200:
            return res.json(), res.status_code
        return res.text, res.status_code
