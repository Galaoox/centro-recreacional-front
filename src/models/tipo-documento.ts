export class TipoDocumento {
    id?: number;
    nombre?: string;

    constructor(data: Partial<TipoDocumento>) {
        this.id = data.id;
        this.nombre = data.nombre;
    }
}