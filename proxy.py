from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app, supports_credentials=True)

searchUrl = 'https://search-api.torbox.app'
mainUrl = 'https://api.torbox.app/v1'

@app.route('/search/<path:subpath>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy_search(subpath=''):
    try:
        params = request.url.partition("?")[2]
        target_url_with_path = ""
        
        if len(params) > 0:
            target_url_with_path = f'{searchUrl}/{subpath}?{params}'
        else :
            target_url_with_path = f'{searchUrl}/{subpath}'
            
        response = requests.request(
            method=request.method,
            url=target_url_with_path,
            headers={key: value for (key, value) in request.headers if key != 'Host'},
            data=request.get_data(),
            cookies=request.cookies,
            allow_redirects=False
        )

        resp = jsonify(response.json())
        resp.status_code = response.status_code

        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Headers'] = '*'
        resp.headers['Access-Control-Allow-Credentials'] = 'true'

        return resp

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/main/<path:subpath>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy_main(subpath=''):
    try:
        params = request.url.partition("?")[2]
        target_url_with_path = ""
        
        if len(params) > 0:
            target_url_with_path = f'{mainUrl}/{subpath}?{params}'
        else :
            target_url_with_path = f'{mainUrl}/{subpath}'
            
        response = requests.request(
            method=request.method,
            url=target_url_with_path,
            headers={key: value for (key, value) in request.headers if key != 'Host'},
            data=request.get_data(),
            cookies=request.cookies,
            allow_redirects=False
        )

        resp = jsonify(response.json())
        resp.status_code = response.status_code

        resp.headers['Access-Control-Allow-Origin'] = '*'
        resp.headers['Access-Control-Allow-Headers'] = '*'
        resp.headers['Access-Control-Allow-Credentials'] = 'true'

        return resp

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, host="0.0.0.0")