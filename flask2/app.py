from flask import Flask, request, jsonify, render_template
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])

MONGO_URI = 'mongodb+srv://purabrtamboli:purabmongodb@cluster0.mpzuz25.mongodb.net/SIH2024?retryWrites=true&w=majority&appName=Cluster0'
client = MongoClient(MONGO_URI)
db = client['SIH2024']  # Specify the database name
coalfields_collection = db['mines']

# JWT secret key
app.config['JWT_SECRET_KEY'] = 'SIH2024'

@app.route('/')
def home():
    return render_template('D:\sih24\\frontend\src\components\pages\MineData.jsx')


@app.route('/api/getCoalFields', methods=['GET'])
def get_coal_fields():
    # Get distinct coal field locations from the "mines" collection
    distinct_coal_fields = coalfields_collection.distinct("location")

    return jsonify(distinct_coal_fields)


@app.route('/api/getMineInfo', methods=['GET'])
def get_mine_info():
    mine_name = request.args.get('name')
    if not mine_name:
        return jsonify({"error": "No mine name provided"}), 400

    # Query MongoDB to get the information of the selected mine by name
    mine_info = coalfields_collection.find_one({"name": mine_name})

    if mine_info:
        # Return the relevant information about the mine
        return jsonify({
            "name": mine_info.get("name"),
            "location": mine_info.get("location"),
            "state": mine_info.get("state"),
            "production": mine_info.get("production"),
            "capacity": mine_info.get("capacity"),
            "totalEmission": mine_info.get("totalEmission"),
            "numberOfEmployees": mine_info.get("numberOfEmployees")
        })
    else:
        return jsonify({"error": "Mine not found"}), 404


@app.route('/api/getMines', methods=['GET'])
def get_mines():
    location = request.args.get('location')  # Using 'location' as the parameter
    if not location:
        return jsonify([])

    # Query MongoDB to get mines based on location
    coal_field_data = coalfields_collection.find({"location": location})

    # Extract 'name' of each mine and return the list
    mines = [{"name": mine["name"]} for mine in coal_field_data]
    return jsonify(mines)

if __name__ == '__main__':
    app.run(debug=True, port=5500)

