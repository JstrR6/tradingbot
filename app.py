from flask import Flask, jsonify, request
import yfinance as yf
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

@app.route('/ticker/<ticker>') # <--- Make sure this is present and correct
def get_ticker_data(ticker):
    try:
        data = yf.download(ticker, period="1d", interval="1m")
        if data.empty:
            return jsonify({"error": "No data found for this ticker"}), 404
        data = data.reset_index()
        data['Datetime'] = data['Datetime'].astype(str)
        data_json = data.to_json(orient="records")
        logging.info(f"Response for {ticker}: {data_json}")
        return jsonify({"data": data_json})
    except Exception as e:
        logging.error(f"Error for {ticker}: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)