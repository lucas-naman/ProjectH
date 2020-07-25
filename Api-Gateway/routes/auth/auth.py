from flask import Blueprint, jsonify, request
from services.myRequest import MyRequest
from decorators.check_token import check_token
from services.ip import get_ip


auth = Blueprint("auth", __name__)

@auth.route("/login", methods=["POST"])
def _login():
    if request.form:
        return MyRequest.post("auth", "/login", request.form, request.headers)
    return "Failed", 401

@auth.route("/register", methods=["POST"])
def _register():
    if request.form:
        return MyRequest.post("auth", "/register", request.form, request.headers)
    return "Failed", 401

@auth.route("/me", methods=["GET"])
@check_token
def _me():
    return jsonify(g.user.to_dict())