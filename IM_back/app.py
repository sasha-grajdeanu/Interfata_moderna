from datetime import timedelta
from flask import Flask, request, jsonify
import scripts.get_personal_data as pdata
import scripts.get_grades_evolution as grades
import scripts.login_call as login_call
import scripts.create_semester_data as sem_data
import scripts.get_no_semester as no_sem
import scripts.get_selection as selection
import scripts.get_scholar_situation_semester as sem_courses
import scripts.get_documents as docx
import scripts.get_obligation as oblix
import scripts.get_history_payment as history
from flask_jwt_extended import create_access_token, JWTManager
import jwt
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config['JWT_SECRET_KEY'] = 'enjoy_the_silence'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=30)
jwt_t = JWTManager(app)


def decode_jwt(jwt_token):
    try:
        current_user = jwt.decode(jwt_token, app.config["JWT_SECRET_KEY"], algorithms=['HS256'])
        print(current_user)
        user = current_user['sub']
        print(type(user))
        return user
    except jwt.ExpiredSignatureError:
        return {"error": "Expired Token"}, 401
    except jwt.InvalidSignatureError:
        return {"error": "Invalid Signature"}, 401
    except jwt.InvalidTokenError:
        return {"error": "Invalid Token"}, 401


@app.post("/login")
def login():
    message_error = "Încercarea de conectare a eşuat! Cauze: nu au trecut încă 10 minute de la crearea contului, cont inexistent, cont şters, neconfirmarea înregistrării, parolă invalidă, număr matricol eronat."
    data = request.get_json()
    print(data)
    username = data['username']
    password = data['password']
    response_of_login = login_call.login_check(username, password)
    if not response_of_login:
        return jsonify({"message": message_error}), 404
    else:
        access_token = create_access_token({"username": username, "password": password})
        print(access_token)
        return jsonify(access_token=access_token), 200


@app.get("/personal_data")
def personal_data_endpoint():
    authorization_header = request.authorization
    if authorization_header is not None:
        response = decode_jwt(authorization_header.token)
        print(type(response))
        if type(response) is tuple:
            return jsonify(response[0]), response[1]
        else:
            username = response["username"]
            password = response["password"]
            personal_data = pdata.get_personal_data(username, password)
            if type(response) is bool:
                return jsonify({"message": "Parametrii nevalizi"}), 401
            else:
                return jsonify(personal_data), 200
    else:
        return jsonify({"message": "Miss parameter authorization"}), 401


@app.get("/grades")
def grades_endpoint():
    authorization_header = request.authorization
    if authorization_header is not None:
        response = decode_jwt(authorization_header.token)
        print(type(response))
        if type(response) is tuple:
            return jsonify(response[0]), response[1]
        else:
            username = response["username"]
            password = response["password"]
            grades_of_user = grades.get_grades_evolution(username, password)
            print(grades_of_user)
            if type(response) is bool:
                return jsonify({"message": "Parametrii nevalizi"}), 401
            else:
                return jsonify(grades_of_user), 200
    else:
        return jsonify({"message": "Miss parameter authorization"}), 401


@app.get("/semester_info")
def semester_info_endpoint():
    authorization_header = request.authorization
    if authorization_header is not None:
        response = decode_jwt(authorization_header.token)
        print(type(response))
        if type(response) is tuple:
            return jsonify(response[0]), response[1]
        else:
            try:
                username = response["username"]
                password = response["password"]
                data = request.get_json()
                print(data)
                semester = int(data["semester"])
                sem_info = sem_data.create_semester_data(username, password, semester)
                # print(sem_info)
                if type(response) is bool:
                    return jsonify({"message": "Parametrii nevalizi"}), 401
                else:
                    return jsonify(sem_info), 200
            except KeyError:
                return jsonify({"message": "Miss parameter semester"}), 400
    else:
        return jsonify({"message": "Miss parameter authorization"}), 401


@app.get("/semester_courses")
def semester_courses_endpoint():
    authorization_header = request.authorization
    if authorization_header is not None:
        response = decode_jwt(authorization_header.token)
        print(type(response))
        if type(response) is tuple:
            return jsonify(response[0]), response[1]
        else:
            try:
                username = response["username"]
                password = response["password"]
                data = request.get_json()
                print(data)
                semester = int(data["semester"])
                sem_info = sem_courses.get_courses(username, password, semester)
                # print(sem_info)
                if type(response) is bool:
                    return jsonify({"message": "Parametrii nevalizi"}), 401
                else:
                    return jsonify(sem_info), 200
            except KeyError:
                return jsonify({"message": "Miss parameter semester"}), 400
    else:
        return jsonify({"message": "Miss parameter authorization"}), 401


@app.get("/selection_info")
def selection_endpoint():
    authorization_header = request.authorization
    if authorization_header is not None:
        response = decode_jwt(authorization_header.token)
        print(type(response))
        if type(response) is tuple:
            return jsonify(response[0]), response[1]
        else:
            try:
                username = response["username"]
                password = response["password"]
                data = request.get_json()
                print(data)
                semester = int(data["semester"])
                sel_info = selection.get_selection(username, password, semester)
                # print(sem_info)
                if type(response) is bool:
                    return jsonify({"message": "Parametrii nevalizi"}), 401
                else:
                    return jsonify(sel_info), 200
            except KeyError:
                return jsonify({"message": "Miss parameter semester"}), 400
    else:
        return jsonify({"message": "Miss parameter authorization"}), 401


@app.get("/count_semester")
def count_semester_endpoint():
    authorization_header = request.authorization
    if authorization_header is not None:
        response = decode_jwt(authorization_header.token)
        print(type(response))
        if type(response) is tuple:
            return jsonify(response[0]), response[1]
        else:
            username = response["username"]
            password = response["password"]
            no_semester = no_sem.get_no_semester(username, password)
            if type(response) is bool:
                return jsonify({"message": "Parametrii nevalizi"}), 401
            else:
                return jsonify(no_semester), 200
    else:
        return jsonify({"message": "Miss parameter authorization"}), 401


@app.get("/pay_document")
def document_endpoint():
    authorization_header = request.authorization
    if authorization_header is not None:
        response = decode_jwt(authorization_header.token)
        print(type(response))
        if type(response) is tuple:
            return jsonify(response[0]), response[1]
        else:
            username = response["username"]
            password = response["password"]
            no_semester = docx.get_documents(username, password)
            if type(response) is bool:
                return jsonify({"message": "Parametrii nevalizi"}), 401
            else:
                return jsonify(no_semester), 200
    else:
        return jsonify({"message": "Miss parameter authorization"}), 401


@app.get("/obligations")
def obligation_endpoint():
    authorization_header = request.authorization
    if authorization_header is not None:
        response = decode_jwt(authorization_header.token)
        print(type(response))
        if type(response) is tuple:
            return jsonify(response[0]), response[1]
        else:
            try:
                username = response["username"]
                password = response["password"]
                data = request.get_json()
                print(data)
                semester = int(data["semester"])
                sel_info = oblix.get_obligation(username, password, semester)
                # print(sem_info)
                if type(response) is bool:
                    return jsonify({"message": "Parametrii nevalizi"}), 401
                else:
                    return jsonify(sel_info), 200
            except KeyError:
                return jsonify({"message": "Miss parameter semester"}), 400
    else:
        return jsonify({"message": "Miss parameter authorization"}), 401


@app.get("/history")
def history_endpoint():
    authorization_header = request.authorization
    if authorization_header is not None:
        response = decode_jwt(authorization_header.token)
        print(type(response))
        if type(response) is tuple:
            return jsonify(response[0]), response[1]
        else:
            username = response["username"]
            password = response["password"]
            no_semester = history.get_history_payment(username, password)
            if type(response) is bool:
                return jsonify({"message": "Parametrii nevalizi"}), 401
            else:
                return jsonify(no_semester), 200
    else:
        return jsonify({"message": "Miss parameter authorization"}), 401


if __name__ == '__main__':
    app.run(debug=True)
