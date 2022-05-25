export class atracciones {
    id?: number;
    nombre?: string;
    descripcion?: string;

    constructor(data: Partial<atracciones>) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
    }
}