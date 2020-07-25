import json
import os.path

def get_ip(service: str):
    with open('services-ips.json') as json_file:
        data = json.load(json_file)
        return data[service]