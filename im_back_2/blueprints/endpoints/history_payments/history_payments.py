from flasgger import swag_from
from flask import Blueprint, request, jsonify

from help_functions.decode_jwt import decode_jwt
from help_functions.decrypt_token import decrypt_data
from services.scripts.get_data.get_history_payments.get_history_payments import get_history_payment

history_payments_bp = Blueprint('history_payments', __name__, url_prefix='/history_payments')


@history_payments_bp.route("/", methods=["GET"])
@swag_from({
    'tags': ['Payment history'],
    'security': [{'BearerAuth': []}],
    'parameters': [
        {
            'name': 'Authorization',
            'in': 'header',
            'type': 'string',
            'required': True,
            'description': 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"'
        },
    ],
    'responses': {
        '200': {
            'description': 'Payment history',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'Sursa': {'type': 'string'},
                        'SursaVal': {'type': 'string'},
                        'Destinatie': {'type': 'string'},
                        'DestVal': {'type': 'string'},
                        'DataM': {'type': 'string'},
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
        }
    }
})
def history_endpoint():
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
                history = get_history_payment(username, password)
                if type(response) is bool:
                    return jsonify({"error": "Parametrii nevalizi"}), 401
                else:
                    return jsonify(history), 200
    else:
        return jsonify({"error": "Miss parameter authorization"}), 401
