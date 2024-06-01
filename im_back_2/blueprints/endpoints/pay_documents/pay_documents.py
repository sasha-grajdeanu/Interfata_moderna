from flasgger import swag_from
from flask import Blueprint, request, jsonify

from help_functions.decode_jwt import decode_jwt
from help_functions.decrypt_token import decrypt_data
from services.scripts.get_data.get_documents.get_documents import get_documents

pay_documents_bp = Blueprint('pay_documents', __name__, url_prefix='/pay_documents')


@pay_documents_bp.route("/", methods=["GET"])
@swag_from({
    'tags': ['Payment documents'],
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
            'description': 'Payment documents',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'Den': {'type': 'string'},
                        'NrDocPlata': {'type': 'string'},
                        'DataDoc': {'type': 'string'},
                        'Suma': {'type': 'string'},
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
def pay_documents_endpoint():
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
                pay_documents = get_documents(username, password)
                if type(response) is bool:
                    return jsonify({"error": "Parametrii nevalizi"}), 401
                else:
                    return jsonify(pay_documents), 200
    else:
        return jsonify({"error": "Miss parameter authorization"}), 401
