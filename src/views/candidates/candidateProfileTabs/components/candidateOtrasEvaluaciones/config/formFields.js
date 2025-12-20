// src/views/candidatelanguage/config/formFields.js
export const candidateFormFields = [
    {
        label: 'Motivación',
        field: 'motivacion',
        type: 'input',
        span: 12,
        required: true,
    },
    {
        label: 'Zona',
        field: 'zona',
        type: 'input',
        span: 6,
        required: true,
    },
    {
        label: 'Disponibilidad in Situ',
        field: 'disponibilidad_in_situ',
        type: 'checkbox',
        span: 6,
        required: false,
    },
    {
        label: 'Comentario',
        field: 'comentario',
        type: 'textarea',
        span: 24,
        required: true,
    },
];
