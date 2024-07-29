from marshmallow import Schema, fields


class LoginRequest(Schema):
    login_user = fields.String(required=True)
    login_password = fields.String(required=True)


class RegisterRequest(Schema):
    user_stu = fields.String(required=True)
    password_est = fields.String(required=True)
    email_stu = fields.String(required=True)
    firstname_stu = fields.String(required=True)
    career_stu = fields.String(required=True)


class UpdateRequest(Schema):
    email_stu = fields.String(required=True)
    firstname_stu = fields.String(required=True)
    lastname_stu = fields.String(required=True)
    career_stu = fields.String(required=True)
    whatsapp_stu = fields.String(required=True)
    university_stu = fields.String(required=True)
    skills_stu = fields.String(required=True)


class CurriculumRequest(Schema):

    hoja_stu = fields.String(required=True)
    est_hoja = fields.String(required=True)
