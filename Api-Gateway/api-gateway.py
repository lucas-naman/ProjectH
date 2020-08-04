from flask import Flask
from routes.auth.auth import auth
from routes.spotify.spotify import spotify
from flask_cors import CORS

# init app
app = Flask(__name__)
CORS(app)
app.register_blueprint(auth, url_prefix="/auth")
app.register_blueprint(spotify, url_prefix="/spotify")

@app.route('/')
def root():
    return "API Gateway for Project M", 200

# Run server
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8081,debug=True)
