export class Horarios {
    id?: number;
    nombre?: string;
    descripcion?: string;
    horaInicial?: string;
    horaFinal?: string;

    constructor(data: Partial<Horarios>) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.horaInicial = data.horaInicial;
        this.horaFinal = data.horaFinal;
    }
}