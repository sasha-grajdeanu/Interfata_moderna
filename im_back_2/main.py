from datetime import timedelta

from flasgger import Swagger
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from blueprints.endpoints.count_semester.count_semester import count_semester_bp
from blueprints.endpoints.grades.grades import grades_bp
from blueprints.endpoints.history_payments.history_payments import history_payments_bp
from blueprints.endpoints.login.login import login_bp
from blueprints.endpoints.obligations.obligations import obligations_bp
from blueprints.endpoints.pay_documents.pay_documents import pay_documents_bp
from blueprints.endpoints.peronal_data.personal_data import personal_data_bp
from blueprints.endpoints.selection_info.selection_info import selection_info_bp
from blueprints.endpoints.semester_courses.semester_courses import semester_courses_bp

app = Flask(__name__)
app.config['SWAGGER'] = {
    'title': 'eSIMS API',
    'description': 'This API allows users to access various endpoints related to the eSIMS system, including authentication and user data retrieval.'
}
swagger = Swagger(app)
CORS(app)
app.config['JWT_SECRET_KEY'] = 'enjoy_the_silence'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=10)
jwt = JWTManager(app)
app.register_blueprint(login_bp)
app.register_blueprint(selection_info_bp)
app.register_blueprint(grades_bp)
app.register_blueprint(count_semester_bp)
app.register_blueprint(semester_courses_bp)
app.register_blueprint(history_payments_bp)
app.register_blueprint(obligations_bp)
app.register_blueprint(personal_data_bp)
app.register_blueprint(pay_documents_bp)

if __name__ == '__main__':
    app.run()
