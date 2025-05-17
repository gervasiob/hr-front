// src/views/candidatelanguage/config/formFields.js
export const candidateFormFields = [

    {
        label: 'Nombre',
        field: 'certification_name',
        type: 'input',
        span: 12,
        required: true,
    },
    {
        label: 'Institución',
        field: 'institution_name',
        type: 'input',
        span: 12,
        required: true,
    },
    {
        label: 'Fecha de Emisión',
        field: 'issue_date',
        type: 'date',
        span: 12,
        required: true,
    },
    {
        label: 'Fecha de Vencimiento',
        field: 'expiration_date',
        type: 'date',
        span: 12,
        required: false,
    },
];
