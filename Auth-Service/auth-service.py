from flask import Flask
from routes.login import login
from routes.register import register
from routes.check_token import check_token
from routes.me import me

# init app
app = Flask(__name__)
app.register_blueprint(login, url_prefix="/login")
app.register_blueprint(register, url_prefix="/register")
app.register_blueprint(check_token, url_prefix="/check_token")
app.register_blueprint(me, url_prefix="/me")

@app.route('/', methods=['GET'])
def root():
    return "Auth Service For Project M", 200

# Run server
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
