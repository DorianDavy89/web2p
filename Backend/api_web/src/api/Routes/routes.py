from ..Services.student_service import LoginService
from ..Services.student_service import RegisterService
from ..Services.student_service import UpdateService
from ..Services.student_service import DeleteService
from ..Services.student_service import CurriculumService
from ..Services.vacant_service import VacantService
from ..Services.mailbox_service import MailboxService

def load_routes(api):

    #metodo para estudiante
    api.add_resource(LoginService, '/student/login')
    api.add_resource(RegisterService, '/student/register')
    api.add_resource(UpdateService, '/student/update/<int:id>')
    api.add_resource(DeleteService, '/student/delete/<int:id>')
    api.add_resource(CurriculumService, '/student/curriculum/<int:id>')


    #metodo para listar vacantes
    api.add_resource(VacantService, '/vacant/list')


    # metodo para listar buzon
    api.add_resource(MailboxService, '/mailbox/list')

