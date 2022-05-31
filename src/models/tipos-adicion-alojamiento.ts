export class TipoAdicionAlojamientos {
    id?: number;
    nombre?: string;
    descripcion?: string;
    valor?: number;

    constructor(data: Partial<TipoAdicionAlojamientos>) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.valor = data.valor;
    }
}