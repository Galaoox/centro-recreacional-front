export class TiposEntradas {
    id?: number;
    nombre?: string;
    descripcion?: string;
    valor?: number;

    constructor(data: Partial<TiposEntradas>) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.valor = data.valor;
    }
}