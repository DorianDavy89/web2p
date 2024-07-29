from flask import request
from flask_restful import Resource

from ...utils.general.logs import HandleLogs
from ...utils.general.response import response_error, response_success
from ..Components.student_component import StudentComponent
from ..Model.Request.student_request import LoginRequest
from ..Model.Request.student_request import RegisterRequest
from ..Model.Request.student_request import UpdateRequest
from ..Model.Request.student_request import CurriculumRequest
from ..Components.jwt_component import JwtComponent




class LoginService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio de Login")
            # Obtener el request
            rq_json = request.get_json()
            # Validar ese request sea compatible con el modelo
            new_request = LoginRequest()
            error_en_validacion = new_request.validate(rq_json)
            if error_en_validacion:
                HandleLogs.write_error("Error al validar el request -> " + str(error_en_validacion))
                return response_error("Error al validar el request -> " + str(error_en_validacion))

            resultado = StudentComponent.login(rq_json['login_user'], rq_json['login_password'])
            if resultado['result']:
                return response_success(resultado['data'])
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())


class RegisterService(Resource):
    @staticmethod
    def post():
        try:
            HandleLogs.write_log("Ejecutando servicio inserción de estudiante")
            # Obtener el request
            rq_json = request.get_json()
            # Validar que el request sea compatible con el modelo
            new_request = RegisterRequest()
            error_en_validacion = new_request.validate(rq_json)
            if error_en_validacion:
                HandleLogs.write_error("Error al validar el request -> " + str(error_en_validacion))
                return response_error("Error al validar el request -> " + str(error_en_validacion))

            resultado = StudentComponent.register(
                rq_json['user_stu'],
                rq_json['password_est'],
                rq_json['email_stu'],
                rq_json['firstname_stu'],
                rq_json['career_stu']
            )
            if resultado['result']:
                return response_success(resultado['data'])
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())


class UpdateService(Resource):
    @staticmethod
    def put(id):
        try:
            HandleLogs.write_log("Ejecutando servicio actualizacion de estudiante")

            token = request.headers['tokenapp']
            if not JwtComponent.TokenValidate(token):
                return response_error("Token de autenticación NO válido")
            
            # Obtener el request
            rq_json = request.get_json()
            # Validar que el request sea compatible con el modelo
            new_request = UpdateRequest()
            error_en_validacion = new_request.validate(rq_json)
            if error_en_validacion:
                HandleLogs.write_error("Error al validar el request -> " + str(error_en_validacion))
                return response_error("Error al validar el request -> " + str(error_en_validacion))

            resultado = StudentComponent.update(id)

            if resultado['result']:
                return response_success(resultado['data'])
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())


class DeleteService(Resource):
    @staticmethod
    def delete(id):
        try:
            HandleLogs.write_log("Ejecutando servicio eliminacion de estudiante")

            token = request.headers['tokenapp']
            if not JwtComponent.TokenValidate(token):
                return response_error("Token de autenticación NO válido")

            resultado = StudentComponent.delete(id)

            if resultado['result']:
                return response_success(resultado['data'])
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())


class CurriculumService(Resource):
    @staticmethod
    def put(id):
        try:
            HandleLogs.write_log("Ejecutando servicio actualizacion de curriculum")

            token = request.headers['tokenapp']
            if not JwtComponent.TokenValidate(token):
                return response_error("Token de autenticación NO válido")
            
            # Obtener el request
            rq_json = request.get_json()
            # Validar que el request sea compatible con el modelo
            new_request = CurriculumRequest()
            error_en_validacion = new_request.validate(rq_json)
            if error_en_validacion:
                HandleLogs.write_error("Error al validar el request -> " + str(error_en_validacion))
                return response_error("Error al validar el request -> " + str(error_en_validacion))

            resultado = StudentComponent.curriculum(id)

            if resultado['result']:
                return response_success(resultado['data'])
            else:
                return response_error(resultado['message'])

        except Exception as err:
            HandleLogs.write_error(err)
            return response_error("Error en el método: " + err.__str__())



