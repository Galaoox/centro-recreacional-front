export class TipoMembresia {
    id?: number;
    nombre?: string;
    descripcion?: string;
    valor?: number;

    constructor(data: Partial<TipoMembresia>) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.valor = data.valor;
    }
}