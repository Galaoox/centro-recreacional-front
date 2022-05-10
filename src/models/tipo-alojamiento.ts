export class TipoAlojamiento {
    id?: number;
    nombre?: string;
    descripcion?: string;
    capacidadPersonas?: number;
    cantidadDisponibles?: number;
    valor?: number;
    imagen?: string;

    constructor(data: Partial<TipoAlojamiento>) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.capacidadPersonas = data.capacidadPersonas;
        this.cantidadDisponibles = data.cantidadDisponibles;
        this.valor = data.valor;
        this.imagen = data.imagen;
    }
}