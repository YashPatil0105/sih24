from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import pandas as pd

app = Flask(__name__)

CORS(app, origins=["http://localhost:5173"])

# Load dummy data from JSON files
def load_data(filename):
    with open(filename, 'r') as file:
        return json.load(file)

# Load afforestation data and tree data from files
STATE_AFFORESTATION_DATA = load_data('state-wise-trees.json')

def parse_renewable_xls(file_path, sheet_name='renewable'):
    # Read the specified sheet from the Excel file
    df = pd.read_excel(file_path, None)
    print(df.keys())  # This will print out all sheet names in the Excel file

    df = pd.read_excel(file_path, sheet_name=sheet_name)
    
    renewable_data = {}
    for index, row in df.iterrows():
        key = (row['Mine_Type'].lower(), row['Mine_Size'].lower())
        # Print the column names to verify
        print("Columns in DataFrame:", df.columns)
        renewable_data[key] = {
            "renewable_strategy": row['Renewable_Strategy'],
            "usage": row['Usage'],
            "total_cost": float(row['Cost '].replace(',' , ''))
            
        }
    print(renewable_data)
    return renewable_data

# Assuming the file path is provided correctly and 'Sheet2' is the desired sheet
RENEWABLE_DATA = parse_renewable_xls('renewable.xlsx')


@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.json
    print("received data: ",data)
    mine_type = data.get('mine_type')
    location = data.get('location')
    emission = data.get('emission')
    afforestation_part = data.get('afforestation_part', 0)
    methane_part = data.get('methane_part', 0)
    renewable_part = data.get('renewable_part', 0)
    mine_size = data.get('mine_size', 'all sizes')

    # Validate input
    if mine_type not in ['underground', 'open']:
        return jsonify({"error": "Invalid mine_type. Must be 'underground' or 'open'."}), 400

    if location not in STATE_AFFORESTATION_DATA:
        return jsonify({"error": "Invalid location. Must be a valid Indian state."}), 400

    try:
        emission = float(emission)  
        afforestation_part = float(afforestation_part)
        methane_part = float(methane_part)
        renewable_part = float(renewable_part)
    except ValueError:
        return jsonify({"error": "Invalid emission, afforestation_part, methane_part, or renewable_part. Must be numeric."}), 400

    if not (0 <= afforestation_part <= 100) or not (0 <= methane_part <= 100) or not (0 <= renewable_part <= 100):
        return jsonify({"error": "afforestation_part, methane_part, and renewable_part must be between 0 and 100."}), 400

    response = {}

    # Afforestation Strategy
    if afforestation_part > 0:
        response['afforestation_strategy'] = calculate_afforestation_strategy(location, emission, afforestation_part)

    # Methane Capture Systems
    if methane_part > 0:
        response['methane_capture_systems'] = "remaining"#calculate_methane_capture_strategy(mine_type, mine_size, emission, methane_part)

    # Renewable Energy
    if renewable_part > 0:
        response['renewable_energy'] = calculate_renewable_strategy(mine_type, mine_size, emission, renewable_part)
    print(response)
    return jsonify(response)

def calculate_afforestation_strategy(location, emission, afforestation_part):
    # Constants for Teak tree
    TEAK_DAILY_CARBON_CONSUMPTION = 20.27  # tonnes per day per tree
    TEAK_INITIAL_COST = 22000  # in currency units per hectare

    # Calculate the emission to compensate
    emission_to_compensate = (emission * afforestation_part) / 100  # tonnes per day

    # Fetch state afforestation data (from the existing JSON file)
    state_data = STATE_AFFORESTATION_DATA.get(location, {})
    max_area = state_data.get('max_area', 0)  # max_area in hectares

    # Calculate the number of trees required
    trees_needed = emission_to_compensate / TEAK_DAILY_CARBON_CONSUMPTION

    # Convert the number of trees to area required (Assume a fixed density of trees per hectare)
    trees_per_hectare = 400  # Example: 400 trees per hectare
    area_needed = trees_needed / trees_per_hectare  # Area in hectares

    # Ensure it does not exceed the state's max area
    if area_needed > max_area:
        area_needed = max_area

    # Calculate the total cost
    total_cost = area_needed * TEAK_INITIAL_COST

    # Calculate the impact (emission reduced per cost unit)
    impact = emission_to_compensate / total_cost
    print("calculated tress")
    # Prepare the afforestation strategy response
    return {
        "tree_type": "Teak",
        "area": round(area_needed, 4),  # in hectares
        "total_cost": round(total_cost, 2),
        "impact": round(impact, 2)  # emission reduced per cost unit
    }

def calculate_renewable_strategy(mine_type, mine_size, emission, renewable_part):
    key = (mine_type.lower(), mine_size.lower())
    
    strategy_data = RENEWABLE_DATA.get(key, None)
    if strategy_data:
        emission_to_compensate = (emission * renewable_part) / 100  # tonnes per day
        total_cost = strategy_data["total_cost"]
        impact = emission_to_compensate / total_cost
        print("done and dusted")
        return {
            "renewable_strategy": strategy_data["renewable_strategy"],
            "usage": strategy_data["usage"],
            "total_cost": f"₹{total_cost:.2f}",
            "impact": f"{impact:.6f} tonnes per ₹"
        }
    else:
        return {
            "error": "No renewable strategy found for the given mine type and size."
        }


if __name__ == '__main__':
    app.run(debug=True)
