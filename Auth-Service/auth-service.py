from flask import Flask

# init app
app = Flask(__name__)

@app.route('/')
def root():
    return "Auth Service For Project M"

# Run server
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
