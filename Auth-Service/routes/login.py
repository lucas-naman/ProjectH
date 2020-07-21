from flask import Blueprint, jsonify, request
from .database.database import db
from .models.user import User

login = Blueprint("login", __name__)

@login.route("", methods=["GET"])
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