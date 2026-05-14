from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# --- THE DATA ---
drivers = [{"id": 1, "name": "Alessandra Ferguson"}]
routes = [{"id": 1, "zone": "North"}] 
packages = []

# --- THE ENDPOINTS ---
@app.route('/drivers', methods=['GET', 'POST'])
def handle_drivers():
    if request.method == 'POST':
        new_driver = request.json
        new_driver['id'] = len(drivers) + 1
        drivers.append(new_driver)
        return jsonify(new_driver), 201
    return jsonify(drivers)

@app.route('/routes', methods=['GET', 'POST']) 
def handle_routes():
    if request.method == 'POST':
        new_route = request.json
        new_route['id'] = len(routes) + 1
        routes.append(new_route)
        return jsonify(new_route), 201
    return jsonify(routes)

@app.route('/packages', methods=['GET', 'POST']) 
def handle_packages():
    if request.method == 'POST':
        new_pkg = request.json
        new_pkg['id'] = len(packages) + 1
        packages.append(new_pkg)
        return jsonify(new_pkg), 201
    return jsonify(packages)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)