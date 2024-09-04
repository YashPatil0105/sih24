from pymongo import MongoClient

# MongoDB connection URI
uri = "mongodb+srv://purabrtamboli:purabmongodb@cluster0.mpzuz25.mongodb.net/SIH2024"
client = MongoClient(uri)

# Select the database
db = client['SIH2024']

# Afforestation
def fetch_afforestation(State_Name):
    try:
        query = {"State_Name": State_Name}
        results = list(db.afforestation.find(query))
        return results
    except Exception as e:
        print(f"Error fetching afforestation data: {e}")
        return []

# Methane
def fetch_methane(Mine_Type):
    try:
        query = {"Mine_Type": Mine_Type}
        results = list(db.methane.find(query))
        return results
    except Exception as e:
        print(f"Error fetching methane data: {e}")
        return []

# Renewable
def fetch_renewable(Mine_Type, Mine_Size):
    try:
        query = {"Mine_Type": Mine_Type, "Mine_Size": Mine_Size}
        results = list(db.renewable.find(query))
        return results
    except Exception as e:
        print(f"Error fetching renewable data: {e}")
        return []

# Ensure the connection is closed when the script is done
def close_connection():
    client.close()
