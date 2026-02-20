// src/views/candidatelanguage/config/formFields.js
export const candidateFormFields = [
    {
        label: 'Motivación por el puesto',
        field: 'motivacion',
        type: 'input',
        span: 12,
        required: true,
    },
    {
        label: 'Nivel de Rotación',
        field: 'attrition',
        type: 'input',
        span: 12,
        required: false,
    },
    {
        label: 'Disponibilidad de ir a las Oficinas',
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
        required: false,
    },
];
