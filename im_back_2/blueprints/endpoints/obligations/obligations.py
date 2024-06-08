from flasgger import swag_from
from flask import Blueprint, request, jsonify

from help_functions.decode_jwt import decode_jwt
from help_functions.decrypt_token import decrypt_data
from services.scripts.get_data.get_obligation.get_obligation import get_obligation

obligations_bp = Blueprint('obligations', __name__, url_prefix='/obligations')


@obligations_bp.route("/", methods=["GET"])
@swag_from({
    'tags': ['Payment obligations'],
    'security': [{'BearerAuth': []}],
    'parameters': [
        {
            'name': 'Authorization',
            'in': 'header',
            'type': 'string',
            'required': True,
            'description': 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"'
        },
        {
            'name': 'semester',
            'in': 'query',
            'type': 'string',
            'required': True,
            'description': 'The semester for which payment obligations are requested.'
        }
    ],
    'responses': {
        '200': {
            'description': 'Payment obligations',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'Den': {'type': 'string'},
                        'Suma': {'type': 'string'},
                        'Moneda': {'type': 'string'},
                        'Semestru': {'type': 'string'},
                        'AnUniv': {'type': 'string'},
                        'Platit': {'type': 'string'}
                    }
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
        },
        '400': {
            'description': 'Missing semester',
            'schema': {
                'type': 'object',
                'properties': {
                    'error': {'type': 'string'}
                }
            }
        }
    }
})
def obligations_endpoint():
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
                try:
                    username = dict_data["username"]
                    password = dict_data["password"]
                    semester = int(request.args.get("semester"))
                    if semester is None:
                        raise ValueError("Missing semester parameter")
                    obligations = get_obligation(username, password, semester)
                    if type(response) is bool:
                        return jsonify({"error": "Parametrii nevalizi"}), 401
                    else:
                        return jsonify(obligations), 200
                except ValueError as e:
                    return jsonify({"error": str(e)}), 400
    else:
        return jsonify({"error": "Miss parameter authorization"}), 401
