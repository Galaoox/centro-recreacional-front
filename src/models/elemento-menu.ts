export class ElementoMenu {
    id?: number;
    nombre?: string;
    descripcion?: string;
    valor?: number;
    categoriaMenuId?: number;

    constructor(data: Partial<ElementoMenu>) {
        this.id = data.id;
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.valor = data.valor;
        this.categoriaMenuId = data.categoriaMenuId;
    }
}