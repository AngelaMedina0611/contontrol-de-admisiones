// Clase que representa a un usuario del sistema
class Usuario {
    constructor(nombre, edad, tipo, deseaInscribirse, tutor = null) {
        this.nombre = nombre; // Nombre del usuario
        this.edad = edad; // Edad del usuario
        this.tipo = tipo; // Tipo de usuario: 'estudiante', 'docente', 'profesional' o 'visitante'
        this.deseaInscribirse = deseaInscribirse; // Indica si el usuario desea inscribirse a actividades
        this.tutor = edad < 16 ? tutor : null; // Si es menor de 16, se requiere un tutor
        this.actividadesInscritas = []; // Lista de actividades en las que está inscrito
    }
}

// Clase que representa una actividad (taller o charla)
class Actividad {
    constructor(nombre, tipo, cupo, edadMinima = 0) {
        this.nombre = nombre; // Nombre de la actividad
        this.tipo = tipo; // Tipo de actividad: 'taller' o 'charla'
        this.cupo = cupo; // Cupo máximo de participantes
        this.edadMinima = edadMinima; // Edad mínima requerida para participar
        this.inscritos = []; // Lista de usuarios inscritos
    }

    // Método para inscribir un usuario en esta actividad
    inscribir(usuario) {
        if (usuario.actividadesInscritas.length >= 3) {
            // No puede inscribirse si ya tiene 3 actividades
            return { exito: false, mensaje: 'No puede inscribirse en más de 3 actividades.' };
        }
        if (usuario.edad < this.edadMinima) {
            // Rechaza si el usuario no cumple con la edad mínima
            return { exito: false, mensaje: `No cumple con la edad mínima de ${this.edadMinima}.` };
        }
        if (this.cupo <= this.inscritos.length) {
            // Rechaza si la actividad ya está llena
            return { exito: false, mensaje: 'Actividad llena.' };
        }
        if (usuario.tipo === 'visitante' && this.tipo !== 'charla') {
            // Los visitantes solo pueden asistir a charlas
            return { exito: false, mensaje: 'Los visitantes solo pueden asistir a charlas.' };
        }

        // Si pasa todos los filtros, se inscribe al usuario
        this.inscritos.push(usuario);
        usuario.actividadesInscritas.push(this);
        return { exito: true, mensaje: 'Inscripción exitosa.' };
    }
 }
// Clase que representa el sistema general de inscripción
 class Sistema {
    constructor() {
        this.usuarios = []; // Lista de usuarios registrados
        this.actividades = []; // Lista de actividades disponibles
        this.noInscritosPorCupo = []; // Usuarios que no pudieron inscribirse por falta de cupo
    }
    
    
    //Método para registrar un usuario
    registrarUsuario(usuario) {
        if (usuario.edad < 16 && !usuario.tutor) {
            // Si es menor de 16 y no tiene tutor, no se registra
            console.warn(Usuario `${usuario.nombre} requiere tutor.`);
            return;
        }
        this.usuarios.push(usuario); // Se añade el usuario a la lista
    }
}
