interface FormError {
    name: any[];
    warnings: any[];
    errors: any[];
}


export function formIsValid(fields: FormError[]): boolean {
    return fields.every(field => field.errors.length === 0);
}