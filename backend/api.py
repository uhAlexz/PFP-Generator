
import requests
import os
import asyncio

def getUUID(username: str):
    response = requests.get(url=f"https://api.mojang.com/users/profiles/minecraft/{username}")
    if response.status_code == 200:
        request_json = response.json()
        return request_json['id']
    return None
