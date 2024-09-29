import os
import requests
from flask import Flask, redirect, request, session, url_for, render_template, jsonify
from backend.api import *
import asyncio
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")

@app.route("/")
def index():
    return render_template('index.html')

@app.post("/generate_pfp")
def generate_pfp():
    username = request.json["username"]
    uuid = getUUID(username)

    if uuid:
        return jsonify({"uuid": uuid})
    else:
        return jsonify({"error": f"User '{username}' not found."}), 404


debug_mode = os.getenv('FLASK_DEBUG', 'False').lower() in ['true', '1', 't']