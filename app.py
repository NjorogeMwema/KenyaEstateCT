from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

# Dummy recommendation function
def recommend_properties(user_id):
    # Replace this with your actual recommendation logic
    recommendations = [
        {"property_id": 1, "name": "Property 1"},
        {"property_id": 2, "name": "Property 2"},
        {"property_id": 3, "name": "Property 3"},
    ]
    return recommendations

@app.route('/recommend', methods=['GET'])
def recommend():
    user_id = request.args.get('user_id')
    recommendations = recommend_properties(user_id)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)