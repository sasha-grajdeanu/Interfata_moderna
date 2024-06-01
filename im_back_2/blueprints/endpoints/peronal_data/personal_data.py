from flasgger import swag_from
from flask import Blueprint, request, jsonify

from help_functions.decode_jwt import decode_jwt
from help_functions.decrypt_token import decrypt_data
from services.scripts.get_data.get_personal_data.get_personal_data import get_personal_data

personal_data_bp = Blueprint('personal_data', __name__, url_prefix='/personal_data')


@personal_data_bp.route('/', methods=['GET'])
@swag_from({
    'tags': ['User Data'],
    'security': [{'BearerAuth': []}],
    'parameters': [
        {
            'name': 'Authorization',
            'in': 'header',
            'type': 'string',
            'required': True,
            'description': 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"'
        }
    ],
    'responses': {
        '200': {
            'description': 'Personal data retrieved successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'ID': {'type': 'string'},
                    'NUME': {'type': 'string'},
                    'MATRICOL': {'type': 'string'},
                    'TELEFON': {'type': 'string'},
                    'E-MAIL': {'type': 'string'},
                    'DATA NASTERII': {'type': 'string'},
                    'MAMA': {'type': 'string'},
                    'TATA': {'type': 'string'},
                    'NATIONALITATEA': {'type': 'string'},
                    'CETATENIA': {'type': 'string'}
                }
            }
        },
        '401': {
            'description': 'Invalid token/Expired token/Invalid Signature/Wrong parameters/missing authorization',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string'}
                }
            }
        }
    }
})
def personal_data_endpoint():
    authorization_header = request.authorization
    if authorization_header is not None:
        response = decode_jwt(authorization_header.token)
        print(type(response))
        if type(response) is tuple:
            return jsonify(response[0]), response[1]
        else:
            dict_data = decrypt_data(response)
            if type(dict_data) is tuple:
                return jsonify(dict_data[0]), dict_data[1]
            else:
                username = dict_data["username"]
                password = dict_data["password"]
                personal_data = get_personal_data(username, password)
                if type(response) is bool:
                    return jsonify({"error": "Invalid parameters"}), 401
                else:
                    return jsonify(personal_data), 200
    else:
        return jsonify({"error": "Miss parameter authorization"}), 401
