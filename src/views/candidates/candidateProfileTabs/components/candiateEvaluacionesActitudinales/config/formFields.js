// src/views/candidatelanguage/config/formFields.js
export const candidateFormFields = [
    {
        label: 'Actitud',
        field: 'attitudes',
        type: 'api-select',
        mode: 'single',
        span: 6,
        required: true,
        endpoint: 'attitudes/?active=true', // <- el endpoint real que usás
        valueField: 'id',
        nameField: 'name',
        castPost: 'array', // convierte el valor ingresado en el input a un valor específico en el payload
    },
    {
        label: 'Puntaje',
        field: 'puntaje',
        type: 'input',
        span: 3,
        required: true,
    },
    {
        label: 'Comentario',
        field: 'comentario',
        type: 'input',
        span: 15,
        required: true,
    },
];
