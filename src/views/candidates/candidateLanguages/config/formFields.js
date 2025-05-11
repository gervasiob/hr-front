// src/views/candidatelanguage/config/formFields.js
export const candidateFormFields = [
    {
        label: 'Candidato',
        field: 'candidate',
        type: 'api-select',
        mode: 'single',
        span: 12,
        required: true,
        endpoint: 'candidates/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'email',      // <- nombre del campo que se usará como `label`
    },
    {
        label: 'Idioma',
        field: 'language',
        type: 'api-select',
        mode: 'single',
        span: 12,
        required: true,
        endpoint: 'languages/', // <- el endpoint real que usás
        valueField: 'id',
        nameField: 'name',
    },
    {
        label: 'Nivel Escrito',
        field: 'written_level',
        type: 'input',
        span: 12,
        required: true,
    },
    {
        label: 'Nivel Hablado',
        field: 'oral_level',
        type: 'input',
        span: 12,
        required: true,
    },
];
