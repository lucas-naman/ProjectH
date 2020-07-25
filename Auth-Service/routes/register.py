from flask import Blueprint, jsonify, request
from .database.database import db
from .models.user import User
import re 

register = Blueprint("register", __name__)

def check(email):  
    regex = '^[a-z0-9]+[\._]?[a-z0-9]+[@]\w+[.]\w{2,3}$'
    if(re.search(regex,email)):  
        return True      
    return False

@register.route("", methods=["POST"])
def _register():

    # Check if the body is all right

    if "username" not in request.form or "password" not in request.form or "email" not in request.form:
        return "Missing field", 400
    elif not request.form["username"] or not request.form["password"] or not request.form["email"]:
        return "Empty field", 400
    elif not check(request.form["email"]):
        return "Invalid Email", 400
    elif len(request.form["username"]) > 10:
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

    newUser = User.from_dict(request.form)
    db.collection(u'Users').add(newUser.to_dict())

    # Request OK
    return "Account created", 200