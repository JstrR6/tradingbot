from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/ticker/<ticker>')
def get_ticker_data(ticker):
    return jsonify({"test": "success"})

if __name__ == '__main__':
    app.run(debug=True)