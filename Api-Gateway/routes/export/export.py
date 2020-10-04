from flask import Blueprint, jsonify
from decorators.check_token import check_token

export = Blueprint("export", __name__)

@export.route("/playlist", methods=['POST'])
@check_token
def _connected():
    return jsonify({"status":"true"})