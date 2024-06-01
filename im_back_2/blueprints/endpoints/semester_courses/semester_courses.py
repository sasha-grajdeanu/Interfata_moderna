from flasgger import swag_from
from flask import Blueprint, request, jsonify

from help_functions.decode_jwt import decode_jwt
from help_functions.decrypt_token import decrypt_data
from services.scripts.get_data.get_courses.get_courses import get_courses

semester_courses_bp = Blueprint('semester_courses', __name__, url_prefix='/semester_courses')


@semester_courses_bp.route("/", methods=["GET"])
@swag_from({
    'tags': ['Semester courses'],
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
            'description': 'The semester for which courses are requested.'
        }
    ],
    'responses': {
        '200': {
            'description': 'Course status for the given semester',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'AnUniv': {'type': 'string'},
                        'Credite': {'type': 'string'},
                        'Data': {'type': 'string'},
                        'Denumire disciplina': {'type': 'string'},
                        'Istoric': {
                            "type": "array",
                            'items': {
                                'type': 'object',
                                'properties': {
                                    'AnUniv': {'type': 'string'},
                                    'Data': {'type': 'string'},
                                    'Denumire disciplina': {'type': 'string'},
                                    'Nota finala': {'type': 'string'},
                                    'Semestru': {'type': 'string'},

                                }
                            }
                        },
                        'Nota finala': {'type': 'string'},
                        'Semestru': {'type': 'string'}
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
def semester_courses_endpoint():
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
                    courses = get_courses(username, password, semester)
                    if type(response) is bool:
                        return jsonify({"error": "Parametrii nevalizi"}), 401
                    else:
                        return jsonify(courses), 200
                except TypeError:
                    return jsonify({"error": "Miss parameter semester"}), 400
    else:
        return jsonify({"error": "Miss parameter authorization"}), 401
