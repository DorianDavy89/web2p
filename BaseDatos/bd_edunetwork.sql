create table datos_estudiantes(
	id_stu serial primary key,
	user_stu varchar(100) not null,
	password_est varchar(100) not null,
	email_stu varchar(100) not null,
	firstname_stu varchar(100) not null,
	lastname_stu varchar(100) not null,
	whatsapp_stu varchar(100) not null,
	university_stu varchar(100) not null,
	career_stu varchar(100) not null,
	skills_stu varchar(200) not null,
	hoja_stu varchar(200) not null,
	est_hoja varchar(200) not null
);

create table foto_stu(
	id_foto serial primary key,
	id_stu int not null,
	foto_perfil bytea not null
);

alter table foto_stu
add constraint fk_id_img_stu
foreign key (id_stu)
references datos_estudiantes(id_stu);


create table empresa_postulaciones(
	id_empresa serial primary key,
	nombre_empresa varchar(100) not null,
	correo_empresa varchar(100) not null,
	fecha_postulacion varchar(100) not null,
	descripcion_corta varchar(100) not null,
	descripcion_completa varchar(100) not null
);

create table datos_buzon(
	id_buzon serial primary key,
	empre_buzon varchar(100) not null,
	detalle_corto varchar(500) not null,
	detalle_completo varchar(500) not null,
	fecha_buzon varchar(100) not null
);


--Inserts tabla estudiante--

INSERT INTO datos_estudiantes (user_stu, password_est, email_stu, firstname_stu, lastname_stu, whatsapp_stu, university_stu, career_stu, skills_stu)
VALUES ('davy', 'davy123', 'davy@gmail', 'David', 'Nieto', '+1234567890', 'Universidad Guayaquil', 'Software', 'Ract, node, python, java, c#');




--Inserts tabla empresa--

INSERT INTO empresa_postulaciones (nombre_empresa, correo_empresa, fecha_postulacion, descripcion_corta, descripcion_completa)
VALUES 
(
    'Medicina Grl', 
    'med_grl@empresa.com', 
    '2024-07-29', 
    'Pasante medio tiempo', 
    'Conocimientos en medicina general.'
);

INSERT INTO empresa_postulaciones (nombre_empresa, correo_empresa, fecha_postulacion, descripcion_corta, descripcion_completa)
VALUES 
(
    'Contifico', 
    'contifico@empresa.com', 
    '2024-07-29', 
    'Egresado tiempo completo', 
    'Conocimientos en react, nodejs, postgresql, sin esperiencia.'
);

INSERT INTO empresa_postulaciones (nombre_empresa, correo_empresa, fecha_postulacion, descripcion_corta, descripcion_completa)
VALUES 
(
    'Contadores', 
    'cont@empresa.com', 
    '2024-07-29', 
    'Pasante tiempo completo', 
    'Estudiante de contabilidad cursando ultimo semestre con conocimientos en declaraciones.'
);

INSERT INTO empresa_postulaciones (nombre_empresa, correo_empresa, fecha_postulacion, descripcion_corta, descripcion_completa)
VALUES 
(
    'Clinica', 
    'cli@empresa.com', 
    '2024-07-30', 
    'Egresado tiempo completo', 
    'Se necesita egresado de la carerra de quimica para trabajar en laboratorios.'
);

INSERT INTO empresa_postulaciones (nombre_empresa, correo_empresa, fecha_postulacion, descripcion_corta, descripcion_completa)
VALUES 
(
    'Tecnologia Total', 
    'tec@empresa.com', 
    '2024-07-30', 
    'Pasante tiempo completo', 
    'Conocimientos en base de datos sql, PHP.'
);

INSERT INTO empresa_postulaciones (nombre_empresa, correo_empresa, fecha_postulacion, descripcion_corta, descripcion_completa)
VALUES 
(
    'Anonima', 
    'am@empresa.com', 
    '2024-07-30', 
    'Tiempo completo', 
    'Estudiante de contaduria con conocimientos en declaraciones.'
);



--Inserts tabla datos_buzon--

INSERT INTO datos_buzon (empre_buzon, detalle_corto, detalle_completo, fecha_buzon)
VALUES 
(
    'Anonimo',
	'Buen dia',
    'Muy buenos dias estimado.
	El motivo del correo es para indicarle que se acerque 
	a las oficina este dia lunes, en el horaio de las 10am', 
    '2024-07-30'
);

INSERT INTO datos_buzon (empre_buzon, detalle_corto, detalle_completo, fecha_buzon)
VALUES 
(
    'Anonimo',
	'Buenas tardes',
    'Muy buenos dias estimado.
	El motivo del correo es para indicarle que se acerque 
	a las oficina este dia lunes, en el horaio de las 10am', 
    '2024-07-30'
);

INSERT INTO datos_buzon (empre_buzon, detalle_corto, detalle_completo, fecha_buzon)
VALUES 
(
    'Anonimo S.A',
	'Buenas noches',
    'Muy buenos dias estimado.
	El motivo del correo es para indicarle que se acerque 
	a las oficina este dia lunes, en el horaio de las 10am', 
    '2024-07-30'
);

INSERT INTO datos_buzon (empre_buzon, detalle_corto, detalle_completo, fecha_buzon)
VALUES 
(
    'Anonimo S.A',
	'Buen dia',
    'Muy buenos dias estimado.
	El motivo del correo es para indicarle que se acerque 
	a las oficina este dia lunes, en el horaio de las 10am', 
    '2024-07-30'
);

INSERT INTO datos_buzon (empre_buzon, detalle_corto, detalle_completo, fecha_buzon)
VALUES 
(
    'Anonimo S.A',
	'Buenas tardes',
    'Muy buenos dias estimado.
	El motivo del correo es para indicarle que se acerque 
	a las oficina este dia lunes, en el horaio de las 10am', 
    '2024-07-30'
);






drop table datos_buzon;
drop table datos_estudiantes;
drop table empresa_postulaciones;
drop table foto_stu;


select * from datos_estudiantes;
select * from empresa_postulaciones;
select * from datos_buzon;
select * from foto_stu;
