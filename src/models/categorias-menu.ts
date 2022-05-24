export class CategoriasMenu {
    id?: number;
    nombre?: string;
    descripcion?: string;

    constructor(data: Partial<CategoriasMenu>) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
    }
}