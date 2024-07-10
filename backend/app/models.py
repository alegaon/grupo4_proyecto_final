from app.database import get_db


class Task:
    def __init__(self, id_task=None, nombre=None, descripcion=None, fecha_creacion=None, completada=None, activa=None, comida=False, embarcacion=False, guia=False, equipos=False,
                 carnada=False, wifi=False, hospedaje=False, atencion=False, salvavidas=False):
        self.id_task = id_task
        self.nombre = nombre
        self.descripcion = descripcion
        self.fecha_creacion = fecha_creacion
        self.completada = completada
        self.activa = activa
        self.comida = comida
        self.embarcacion = embarcacion
        self.guia = guia
        self.equipos = equipos
        self.carnada = carnada
        self.wifi = wifi
        self.hospedaje = hospedaje
        self.atencion = atencion
        self.salvavidas = salvavidas


    @staticmethod
    def __get_tasks_by_query(query):
        db = get_db()
        cursor = db.cursor()
        cursor.execute(query)
        rows = cursor.fetchall()
    
        tasks = []
        for row in rows:
            tasks.append(
                Task(
                    id_task=row[0],
                    nombre=row[1],
                    descripcion=row[2],
                    fecha_creacion=row[3],
                    completada=row[4],
                    activa=row[5],
                    comida=row[6],
                    embarcacion=row[7],
                    guia=row[8],
                    equipos=row[9],
                    carnada=row[10],
                    wifi=row[11],
                    hospedaje=row[12],
                    atencion=row[13],
                    salvavidas=row[14]
                )
            )
        cursor.close()
        return tasks

    @staticmethod
    def get_all_pending():
        return Task.__get_tasks_by_query(
            """ 
                SELECT * 
                FROM tareas 
                WHERE activa = true AND completada = false
                ORDER BY fecha_creacion DESC
            """)

    @staticmethod
    def get_all_completed():
        return Task.__get_tasks_by_query(
            """ SELECT * FROM tareas WHERE activa = true AND completada = true
                ORDER BY fecha_creacion DESC""")

    @staticmethod
    def get_all_archived():
        return Task.__get_tasks_by_query(
            """ SELECT * FROM tareas WHERE activa = false
                ORDER BY fecha_creacion DESC""")
    
    @staticmethod
    def get_by_id(id_task):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM tareas WHERE id = %s", (id_task,))
        row = cursor.fetchone()
        cursor.close()

        if row:
            return Task(
                id_task=row[0],
                nombre=row[1],
                descripcion=row[2],
                fecha_creacion=row[3],
                completada=row[4],
                activa=row[5],
                comida=row[6],
                embarcacion=row[7],
                guia=row[8],
                equipos=row[9],
                carnada=row[10],
                wifi=row[11],
                hospedaje=row[12],
                atencion=row[13],
                salvavidas=row[14]
            )
        return None

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_task: # Actualizar Tarea existente
            cursor.execute(
                """
                    UPDATE tareas
                    SET nombre = %s, descripcion = %s, completada = %s, activa = %s, comida = %s, embarcacion = %s, guia = %s, equipos = %s, carnada = %s, 
                    wifi = %s, hospedaje = %s, atencion = %s, salvavidas = %s 
                    WHERE id = %s
                """,
                (self.nombre, self.descripcion, self.completada, self.activa, self.id_task, self.comida, self.embarcacion, self.guia, self.equipos, self.carnada,
                    self.wifi, self.hospedaje, self.atencion, self.salvavidas))

        else: # Crear Tarea nueva
            cursor.execute(
                """
                    INSERT INTO tareas
                    (nombre, descripcion, fecha_creacion, completada, activa, comida, embarcacion, guia, equipos, carnada, wifi, hospedaje, atencion, salvavidas)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """,
                (self.nombre, self.descripcion, self.fecha_creacion, self.completada, self.activa, self.comida, self.embarcacion, self.guia, self.equipos, self.carnada,
                    self.wifi, self.hospedaje, self.atencion, self.salvavidas))
            self.id_task = cursor.lastrowid
        db.commit()
        cursor.close()

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE tareas SET activa = false WHERE id = %s", (self.id_task,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id': self.id_task,
            'nombre': self.nombre,
            'descripcion': self.descripcion,
            'fecha_creacion': self.fecha_creacion.strftime('%Y-%m-%d'),
            'completada': self.completada,
            'activa': self.activa,
            'comida': self.comida,
            'embarcacion': self.embarcacion,
            'guia': self.guia,
            'equipos': self.equipos,
            'carnada': self.carnada,
            'wifi': self.wifi,
            'hospedaje': self.hospedaje,
            'atencion': self.atencion,
            'salvavidas': self.salvavidas
        }