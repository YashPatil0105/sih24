from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from fetch_from_mongo import fetch_afforestation, fetch_methane, fetch_renewable
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json

    # Parse input
    
    mine_type = data.get('mine_type')
    location = data.get('location')
    emission = data.get('emission')
    mine_size = data.get('mine_size', 'all sizes')
    afforestation_part = data.get('afforestation_part', 0)
    methane_part = data.get('methane_part', 0)
    renewable_part = data.get('renewable_part', 0)

    # Validate input
    if mine_type not in ['Open-Pit', 'Underground']:
        return jsonify({"error": "Invalid mine_type. Must be 'Open-Pit' or 'Underground'."}), 400

    if not location:
        return jsonify({"error": "Location must be specified."}), 400

    try:
        emission = float(emission)
        afforestation_part = float(afforestation_part)
        methane_part = float(methane_part)
        renewable_part = float(renewable_part)
    except ValueError:
        return jsonify({"error": "Invalid total_emission, afforestation_part, methane_part, or renewable_part. Must be numeric."}), 400

    if not (0 <= afforestation_part) or not (0 <= methane_part) or not (0 <= renewable_part):
        return jsonify({"error": "afforestation_part, methane_part, and renewable_part must be atleast 0"}), 400

    response = {}

    # Afforestation Strategy
    if afforestation_part > 0:
        afforestation_data = fetch_afforestation(location)
        if afforestation_data:  # Check if data is not empty
            max_area = afforestation_data[0].get('Available_Area_ha')  # Access the first document
            response['afforestation'] = calculate_afforestation_strategy(emission, afforestation_part, max_area)

    # Methane Capture Systems
    if methane_part > 0:
        # Determine the appropriate Mine_Type for the query
        if mine_type == "Underground":
            mine_type_query = "Underground"
        else:
            mine_type_query = "Both"
        # Fetch the methane data using the determined query
        methane_data = fetch_methane(mine_type_query)
        response['methane_capture'] = calculate_methane_strategy(methane_data, emission, methane_part)

    # Renewable Energy
    if renewable_part > 0:
        renewable_data = fetch_renewable(mine_type, mine_size)
        response['renewable_energy'] = calculate_renewable_strategy(renewable_data, emission, renewable_part)
    
    return jsonify(response)

def calculate_afforestation_strategy(emission, afforestation_part, max_area):
    # Constants for Teak tree
    TEAK_DAILY_CARBON_CONSUMPTION = 20.27  # tonnes per day per tree
    TEAK_INITIAL_COST = 226025 # in currency rupees per hectare

    # Calculate the emission to compensate
    emission_to_compensate = (emission * afforestation_part) / 100  # tonnes per day

    # Calculate the number of trees required
    trees_needed = emission_to_compensate / TEAK_DAILY_CARBON_CONSUMPTION

    # Convert the number of trees to area required (Assume a fixed density of trees per hectare)
    trees_per_hectare = 400  # Example: 400 trees per hectare
    area_needed = trees_needed / trees_per_hectare  # Area in hectares

    # Ensure it does not exceed the max area
    if area_needed > max_area:
        area_needed = max_area

    # Calculate the total cost
    total_cost = area_needed * TEAK_INITIAL_COST

    # Calculate the impact
    impact = (emission_to_compensate / total_cost) * 10000

    # Prepare the afforestation strategy response
    return {
        "area_to_grow_trees_ha": str(round(area_needed, 4)) + " hectares",  # in hectares
        "type_of_tree": "Teak",
        "total_cost": "Rs " + str(round(total_cost, 2)),
        "impact": round(impact, 4)  # emission controlled per cost unit * 100
    }

def calculate_methane_strategy(methane_data, emission, methane_part):
    # Calculate the emission to compensate
    emission_to_compensate = (emission * methane_part) / 100  # tonnes per day
    
    results = []
    for strategy_data in methane_data:
        total_cost = float(strategy_data['Cost'])
        impact = (emission_to_compensate / total_cost) * 100

        results.append({
            "technology_to_use": strategy_data['Technology'],
            "devices": strategy_data['Devices'],
            "total_cost": "Rs " + str(round(total_cost, 2)),
            "impact": round(impact, 2)  # emission controlled per cost unit * 100
        })
    return results

def calculate_renewable_strategy(renewable_data, emission, renewable_part):
    # Calculate the emission to compensate
    emission_to_compensate = (emission * renewable_part) / 100  # tonnes per day

    results = []
    for strategy_data in renewable_data:
        total_cost = strategy_data["Cost"]
        impact = (emission_to_compensate / total_cost) * 100

        results.append({
            "renewable_strategy": strategy_data["Renewable_Strategy"],
            "devices": strategy_data["Devices"],
            "total_cost": "Rs " + str(round(total_cost, 2)),
            "impact": round(impact, 2)  # emission controlled per cost unit * 100
        })
        
    return results

if __name__ == '__main__':
    app.run(debug=True)
