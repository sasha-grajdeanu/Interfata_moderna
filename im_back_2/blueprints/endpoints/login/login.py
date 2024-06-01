from cryptography.fernet import Fernet
from flasgger import swag_from
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token

from config import FERNET_KEY
from services.scripts.login.login import login_check

fernet_system=Fernet(FERNET_KEY)
login_bp = Blueprint('login', __name__, url_prefix='/login')


@login_bp.route('/', methods=['POST'])
@swag_from({
    'tags': ['Authentication'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'schema': {
                'type': 'object',
                'properties': {
                    'username': {'type': 'string'},
                    'password': {'type': 'string'}
                },
                'required': ['username', 'password']
            }
        }
    ],
    'responses': {
        '200': {
            'description': 'Successful login',
            'schema': {
                'type': 'object',
                'properties': {
                    'access_token': {'type': 'string'}
                }
            }
        },
        '404': {
            'description': 'Login failed',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string'}
                }
            }
        }
    }
})
def login():
    error_error = "Încercarea de conectare a eşuat! Cauze: nu au trecut încă 10 minute de la crearea contului, cont inexistent, cont şters, neconfirmarea înregistrării, parolă invalidă, număr matricol eronat."
    data = request.get_json()
    print(data)
    username = data['username']
    password = data['password']
    response_of_login = login_check(username, password)
    if not response_of_login:
        return jsonify({"error": error_error}), 404
    else:
        encrypted_data = fernet_system.encrypt(str({"username": username, "password": password}).encode())
        print(encrypted_data)
        access_token = create_access_token(str(encrypted_data))
        print(access_token)
        return jsonify(access_token=access_token), 200