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

    // Método para registrar un usuario
    registrarUsuario(usuario) {
        if (usuario.edad < 16 && !usuario.tutor) {
            // Si es menor de 16 y no tiene tutor, no se registra
            console.warn(`Usuario ${usuario.nombre} requiere tutor.`);
            return;
        }
        this.usuarios.push(usuario); // Se añade el usuario a la lista
    }

    // Método para agregar una nueva actividad
    agregarActividad(actividad) {
        this.actividades.push(actividad);
    }

    // Método que procesa la inscripción de usuarios a actividades
    procesarInscripciones() {
        for (const usuario of this.usuarios) {
            if (!usuario.deseaInscribirse) continue; // Ignora si no desea inscribirse

            // Filtra las actividades candidatas según el tipo de usuario
            let actividadesCandidatas = this.actividades.filter(act => {
                if (usuario.tipo === 'visitante') return act.tipo === 'charla'; // visitantes solo a charlas
                if (usuario.tipo === 'docente') return true; // docentes pueden en todas
                if (usuario.tipo === 'estudiante') return usuario.edad >= 16; // estudiantes mayores de 16
                return true; // profesionales también pueden en todas
            });

            // Prioridad para docentes: se inscriben automáticamente en la primera actividad disponible
            if (usuario.tipo === 'docente') {
                const resultado = actividadesCandidatas[0]?.inscribir(usuario);
                if (!resultado?.exito) {
                    this.noInscritosPorCupo.push(usuario); // Si no pudo inscribirse, lo guarda
                }
                continue;
            }

            // Para otros tipos de usuario, intenta inscribirse en varias actividades
            for (const actividad of actividadesCandidatas) {
                if (usuario.actividadesInscritas.length >= 3) break; // No más de 3 actividades
                const resultado = actividad.inscribir(usuario);
                if (!resultado.exito && resultado.mensaje === 'Actividad llena.') {
                    this.noInscritosPorCupo.push(usuario); // Guarda si no se inscribió por cupo lleno
                }
            }
        }
    }

    // Genera un reporte con estadísticas finales
    reporteFinal() {
        const asistentesPorPerfil = {}; // Cantidad de usuarios por tipo
        const demandaPorActividad = {}; // Cuántos se inscribieron por actividad
        const edadesPorActividad = {}; // Edades de inscritos por actividad
        let totalUsuariosCompletos = 0; // Usuarios con 3 actividades

        for (const usuario of this.usuarios) {
            asistentesPorPerfil[usuario.tipo] = (asistentesPorPerfil[usuario.tipo] || 0) + 1;
            if (usuario.actividadesInscritas.length === 3) totalUsuariosCompletos++;

            for (const act of usuario.actividadesInscritas) {
                demandaPorActividad[act.nombre] = (demandaPorActividad[act.nombre] || 0) + 1;
                if (!edadesPorActividad[act.nombre]) edadesPorActividad[act.nombre] = [];
                edadesPorActividad[act.nombre].push(usuario.edad);
            }
        }

        // Calcula la edad promedio de los participantes por actividad
        const edadesPromedio = {};
        for (const [nombre, edades] of Object.entries(edadesPorActividad)) {
            const sum = edades.reduce((a, b) => a + b, 0);
            edadesPromedio[nombre] = (sum / edades.length).toFixed(1);
        }

        return {
            asistentesPorPerfil, // Número de usuarios por tipo
            actividadesMasDemandadas: Object.entries(demandaPorActividad)
                .sort((a, b) => b[1] - a[1]), // Actividades ordenadas por demanda
            edadesPromedio, // Edad promedio por actividad
            porcentajeCompletaron: ((totalUsuariosCompletos / this.usuarios.length) * 100).toFixed(2) + '%' // % de usuarios con 3 inscripciones
        };
    }

    // Lista los nombres de los participantes de una actividad específica
    listarParticipantesPorActividad(nombreActividad) {
        const actividad = this.actividades.find(a => a.nombre === nombreActividad);
        return actividad ? actividad.inscritos.map(u => u.nombre) : [];
    }

    // Lista todos los usuarios de un tipo específico
    listarAsistentesPorTipo(tipo) {
        return this.usuarios.filter(u => u.tipo === tipo);
    }
}

// Crea una instancia del sistema
const sistema = new Sistema();

sistema.agregarActividad(new Actividad('Taller de Robótica Avanzada', 'taller', 10, 18));
sistema.agregarActividad(new Actividad('Charla de Innovación', 'charla', 20));
sistema.agregarActividad(new Actividad('Taller de Programación Básica', 'taller', 15, 16));

sistema.registrarUsuario(new Usuario('Ana', 20, 'estudiante', true));
sistema.registrarUsuario(new Usuario('Luis', 17, 'estudiante', true));
sistema.registrarUsuario(new Usuario('Carlos', 35, 'docente', true));
sistema.registrarUsuario(new Usuario('Marta', 30, 'profesional', true));
sistema.registrarUsuario(new Usuario('Tomás', 15, 'estudiante', true, 'Padre'));
sistema.registrarUsuario(new Usuario('Lucía', 25, 'visitante', true));

sistema.procesarInscripciones();

console.log(sistema.reporteFinal());
console.log('Participantes en Charla de Innovación:', sistema.listarParticipantesPorActividad('Charla de Innovación'));
console.log('No inscritos por falta de cupo:', sistema.noInscritosPorCupo.map(u => u.nombre));