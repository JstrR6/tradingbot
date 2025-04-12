from flask import Flask, jsonify, request
import yfinance as yf
from flask_cors import CORS

app = Flask(__name__)
CORS(app) #Enable CORS for all routes

@app.route('/ticker/<ticker>')
def get_ticker_data(ticker):
    try:
        data = yf.download(ticker, period="1d", interval="1m")
        if data.empty:
            return jsonify({"error": "No data found for this ticker"}), 404
        data = data.reset_index()
        data['Datetime'] = data['Datetime'].astype(str)
        data_json = data.to_json(orient="records")
        return jsonify({"data": data_json})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)