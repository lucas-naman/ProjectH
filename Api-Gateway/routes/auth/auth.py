from flask import Blueprint, jsonify, request, g
from decorators.check_token import check_token
from services.database import db
import re 
from models.User import User

auth = Blueprint("auth", __name__)

def check(email):  
    regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    if(re.search(regex,email)):  
        return True      
    return False

@auth.route("/login", methods=["POST"])
def _login():
    if "password" not in request.form or "email" not in request.form:
        return "Missing field", 400
    doc_ref = db.collection(u'Users').where(u'email', u'==', request.form["email"])
    doc = doc_ref.stream()
    for d in doc:
        user = User.from_dict(d.to_dict())
        if user.password != request.form["password"]:
            return "Incorect Password", 400
        _token = user.generate_token(d.id, db)
        return jsonify(token=_token.decode())
    return "Unknown Email", 400

@auth.route("/register", methods=["POST"])
def _register():
    if "username" not in request.form or "password" not in request.form or "email" not in request.form:
        return "Missing field", 400
    elif not request.form["username"] or not request.form["password"] or not request.form["email"]:
        return "Empty field", 400
    elif not check(request.form["email"]):
        return "Invalid Email", 400
    elif len(request.form["username"]) > 15:
        return "Invalid Username", 400
    elif len(request.form["password"]) < 6:
        return "Invalid Password", 400

    # Check If Username is free

    doc_ref = db.collection(u'Users').where(u'username', u'==', request.form["username"])
    doc = doc_ref.stream()
    for d in doc:
        return "Username already taken", 400

    # Check if email is free

    doc_ref = db.collection(u'Users').where(u'email', u'==', request.form["email"])
    doc = doc_ref.stream()
    for d in doc:
        return "Email already taken", 400

    # Push on Database
    # And return a token  
    newUser = User.from_dict(request.form)
    usr = db.collection(u'Users').add(newUser.to_dict())
    _token = newUser.generate_token(usr[1].id, db)
    return jsonify(token=_token.decode())

@auth.route("/me", methods=["GET"])
@check_token
def _me():
    return jsonify(g.user.to_dict_nopwd())