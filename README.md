
# CONTROL DE ADMISIONES EN UNA FERIA TECNOLOGICA 

Este proyecto tiene como objetivo desarrollar un sistema de control de admisiones e inscripciones para una feria tecnológica, automatizando el registro de participantes, control de acceso a actividades, y generación de reportes administrativos.

**📋 Descripción General**
Este sistema fue diseñado con base en una entrevista con el coordinador de logística del evento. Se identificaron cuatro tipos de usuarios y diferentes reglas de acceso a actividades. El sistema automatiza el proceso de inscripción y genera reportes útiles para la organización del evento.





## DOCUMENTACIÓN 

[Documentación](https://https://word.cloud.microsoft/open/onedrive/?docId=2EFC5EC94D1A9CE9%21sfc657f19f98147ee8d503457dc91a8d7&driveId=2EFC5EC94D1A9CE9)


## License

[MIT](https://choosealicense.com/licenses/mit/)


## REQUERIMIENTOS FUNCIONALES 

- Registrar usuarios con nombre, edad, tipo y tutor si es necesario. 
- Clasificar usuarios como: estudiante, docente, profesional o visitante. 
- Permitir inscripción a actividades con restricciones:
    - Edad mínima. 
    -  Cupo máximo.
    - Límite de 3 actividades por persona.
    - Solo docentes tienen prioridad automática.
    - Visitantes solo pueden asistir a charlas.
- Consultas y reportes durante y después del evento:
    - Listado de asistentes por tipo.
    - Participantes por actividad.
    - Actividades más solicitadas.
    - Usuarios rechazados por falta de cupo.
    - Porcentaje de usuarios inscritos en 3 actividades. 
## ESTRUCTURA DEL CODIGO
### Clase Usuario**
- Representa a cada persona registrada en el sistema.
- new Usuario(nombre, edad, tipo, deseaInscribirse, tutor = null)
- Tutor obligatorio si es menor de 16 años. 
- Puede inscribirse hasta en 3 actividades.
#### ACTIVIDAD 
- Define una charla o taller. 
    - new Actividad(nombre, tipo, cupo, edadMinima = 0) 
    - Charlas: acceso libre (según restricciones). 
    - Talleres: pueden tener edad mínima y cupo limitado.
#### SISTEMA
- Controlador principal del sistema.
    - Registra usuarios. 
    - Agrega actividades. 
    - Procesa inscripciones según reglas. 
    - Genera reportes y consultas.
 #### VALIDACIÓN Y REGLAS
    - Máximo de 3 actividades por usuario. 
    - Usuarios menores de 16 requieren tutor. 
    - Visitantes solo pueden acceder a charlas.
    - ️ Actividades con cupo lleno rechazan inscripciones.
    - Edad mínima debe cumplirse.
    -  Docentes se inscriben automáticamente a la primera actividad disponible.
## ESTRUCTURA DEL SISTEMA
### CLASES PRINCIPALES
#### CLASS USUARIO
 - Representa a un usuario del sistema. Atributos clave:
    - nombre: Nombre del usuario. 
    - edad: Edad del usuario. 
    - tipo: Tipo de usuario (estudiante, docente, profesional, visitante). 
    - deseaInscribirse: Booleano que indica si desea inscribirse a actividades.   
    - tutor: Tutor obligatorio si el usuario es menor de 16 años. 
    - actividadesInscritas: Lista de actividades en las que está inscrito.
#### ACTIVIDAD
- Representa una actividad, que puede ser una charla o un taller. Atributos:
    -  nombre: Nombre de la actividad.
    -  tipo: Tipo de actividad (charla o taller).
    -  cupo: Cupo máximo de participantes.
     -  edadMinima: Edad mínima para inscribirse.
    -  inscritos: Lista de usuarios inscritos.
#### METODO CLAVE
- inscribir(usuario): Intenta inscribir a un usuario en la actividad respetando reglas de elegibilidad y cupo.
#### SISTEMA
- Coordina la interacción entre usuarios y actividades
    - usuarios: Lista de usuarios registrados.
    - actividades: Lista de actividades disponibles.
    - noInscritosPorCupo: Usuarios que no pudieron inscribirse por falta de cupo.
### METODOS PRINCIPALES
- registrarUsuario(usuario): Registra un nuevo usuario, validando requisitos.
    - agregarActividad(actividad): Agrega una actividad al sistema.
    - procesarInscripciones(): Procesa todas las solicitudes de inscripción según reglas específicas.
    - reporteFinal(): Genera estadísticas del proceso (usuarios por tipo, demanda por actividad, etc.).
    - listarParticipantesPorActividad(nombreActividad): Devuelve nombres de los participantes de una actividad.
    - listarAsistentesPorTipo(tipo): Devuelve todos los usuarios de un tipo dado.
### REGLAS DE INSCRIPCIÓN
- Un usuario puede inscribirse en hasta 3 actividades.
    - Los visitantes solo pueden asistir a charlas.
    - Los docentes se inscriben automáticamente a la primera actividad disponible.
    - Los estudiantes menores de 16 años necesitan tutor.
    - Cada actividad puede tener una edad mínima.
     - Si una actividad está llena, se registra que el usuario no pudo inscribirse por cupo.
## FUNCIONALIDADES ADICIONALES
- procesarInscripciones(): ejecuta todo el proceso de inscripción automáticamente según las reglas.
    - listarParticipantesPorActividad(nombre): muestra quién está inscrito en cada actividad.
    - listarAsistentesPorTipo(tipo): filtra los usuarios por su perfil.
    - reporteFinal(): genera estadísticas internas para análisis posterior.
## REPORTES  
- El método reporteFinal() (actualmente     definido pero sin console.log o return) calcula:

    - Total de usuarios por tipo. 

    - Demanda por actividad. 
    - Edades de inscritos por actividad. 
    - Cuántos usuarios se inscribieron en       3  actividades. 

    - Puedes extenderlo fácilmente para visualizar estos datos.
## MEJORAS SUGERIDAS 

- Imprimir o retornar el reporte final. 

- Validar duplicación en inscripciones. 

- Crear una interfaz visual o API para interacción externa. 
## AUTORIA  
Proyecto desarrollado como parte de la materia algoritmo 1 – Proyectos Final 
 Entrevista ficticia adaptada para fines académicos. 
 integrantes:
 - Manuel Raigosa 
 - Gustavo Valencia
 - Angela Maria Medina Ruiz




## EJEMPLOS DE USO 

![App Screenshot](assets/screenshorts/modo.png)



## TECNOLOGIAS USADAS

**BAKEND** : JAVASCRIPT

**PRUEBAS** :  Node.JS

**CONTROL DE VERSIONES**  : GIT + GITHUBO


## INSTALACIÓN

```bash
 git clone https://github.com/AngelaMedina0611/
 contontrol-de-admisiones.git 
 cd control-de-admisiones


    