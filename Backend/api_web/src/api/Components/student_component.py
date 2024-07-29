from .jwt_component import JwtComponent
from ...utils.general.logs import HandleLogs
from ...utils.general.response import internal_response
from ...utils.database.connection_db import DataBaseHandle
import requests
from flask import Flask, request, jsonify

class StudentComponent:

    @staticmethod
    def login(p_user, p_clave):
        try:
            result = False
            data = None
            message = None
            sql = "SELECT count(*) as valor FROM datos_estudiantes WHERE user_stu = %s AND password_est = %s"
            record = (p_user, p_clave)
            sql_info = "SELECT id_stu, user_stu, password_est, email_stu, firstname_stu, lastname_stu, whatsapp_stu, university_stu, career_stu, skills_stu, est_hoja FROM datos_estudiantes WHERE user_stu = %s AND password_est = %s"
            record_id = (p_user, p_clave)

            resul_login = DataBaseHandle.getRecords(sql,1, record)
            resul_info = DataBaseHandle.getRecords(sql_info, 1, record_id)
            if resul_login['result']:
                if resul_login['data']['valor'] > 0:
                    result = True
                    message = 'Login Exitoso'
                    token = JwtComponent.TokenGenerate(p_user)
                    print(data)
                    data = {
                        **resul_info['data'],
                        'token': token
                    }
                else:
                    message = 'Login No Válido'
            else:
                message = resul_login['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)


    @staticmethod
    def register(user_stu, password_est, email_stu, firstname_stu, career_stu):
        try:
            result = False
            data = None
            message = None

            lastname_stu = 'Vacio'
            whatsapp_stu = 'Vacio'
            university_stu = 'Vacio'
            skills_stu = 'Vacio'
            hoja_stu = 'Vacio'
            est_hoja = 'desactivado'

            sql_student = "INSERT INTO datos_estudiantes (user_stu, password_est, email_stu, firstname_stu, lastname_stu, whatsapp_stu, university_stu, career_stu, skills_stu, hoja_stu, est_hoja) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
            record_insert = (
            user_stu, password_est, email_stu, firstname_stu, lastname_stu, whatsapp_stu, university_stu, career_stu,
            skills_stu, hoja_stu, est_hoja)

            resul_insert = DataBaseHandle.ExecuteNonQuery(sql_student, record_insert)
            if resul_insert['result']:
                if resul_insert['data'] > 0:
                    result = True
                    message = 'Inserción Exitosa'
                    data = resul_insert['data']
                else:
                    message = 'Inserción No Válida'
            else:
                message = resul_insert['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)

    @staticmethod
    def update(id_stu):
        try:
            result = False
            data = None
            message = None

            student_data = request.get_json()

            email_stu = student_data.get('email_stu')
            firstname_stu = student_data.get('firstname_stu')
            lastname_stu = student_data.get('lastname_stu')
            whatsapp_stu = student_data.get('whatsapp_stu')
            university_stu = student_data.get('university_stu')
            career_stu = student_data.get('career_stu')
            skills_stu = student_data.get('skills_stu')

            sql_update = "UPDATE datos_estudiantes SET email_stu = %s, firstname_stu = %s, lastname_stu = %s, whatsapp_stu = %s, university_stu = %s, career_stu = %s, skills_stu = %s WHERE id_stu = %s"
            record_update = (
            email_stu, firstname_stu, lastname_stu, whatsapp_stu, university_stu, career_stu, skills_stu, id_stu)

            resul_update = DataBaseHandle.ExecuteNonQuery(sql_update, record_update)
            if resul_update['result']:
                if resul_update['data'] > 0:
                    result = True
                    message = 'Actualizacion Exitosa'
                    data = resul_update['data']
                else:
                    message = 'Actualizacion No Válida'
            else:
                message = resul_update['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)

    @staticmethod
    def delete(id_stu):
        try:
            result = False
            data = None
            message = None

            sql_delete = "DELETE FROM datos_estudiantes WHERE id_stu = %s"
            record_delete = (id_stu)

            resul_delete = DataBaseHandle.ExecuteNonQuery(sql_delete, record_delete)
            if resul_delete['result']:
                if resul_delete['data'] > 0:
                    result = True
                    message = 'Eliminacion Exitosa'
                    data = resul_delete['data']
                else:
                    message = 'Eliminacion No Válida'
            else:
                message = resul_delete['message']

        except Exception as err:
            HandleLogs.write_error(err)
            message = err.__str__()
        finally:
            return internal_response(result, data, message)

    @staticmethod
    def curriculum(id_stu):
        try:
            result = False
            data = None
            message = None

            hoja_data = request.get_json()

            hoja_stu = hoja_data.get('hoja_stu')
            est_hoja = hoja_data.get('est_hoja')

            # Actualizar en hojavida
            sql_hoja = "UPDATE datos_estudiantes SET hoja_stu = %s, est_hoja = %s WHERE id_stu = %s"
            record_hoja = (hoja_stu, est_hoja, id_stu)

            resul_update = DataBaseHandle.ExecuteNonQuery(sql_hoja, record_hoja)
            if resul_update['result']:
                if resul_update['data'] > 0:
                    result = True
                    message = 'Actualizacion Exitosa'
                    data = resul_update['data']
                else:
                    message = 'Actualizacion curriculum no Válida'

        except Exception as err:
            HandleLogs.write_error(err)
            message = str(err)
        finally:
            return internal_response(result, data, message)

