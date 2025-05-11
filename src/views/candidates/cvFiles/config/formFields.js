// src/views/candidatelanguage/config/formFields.js
export const candidateFormFields = [
    {
        label: 'Candidato',
        field: 'candidate_id',
        type: 'api-select',
        mode: 'single',
        span: 12,
        required: true,
        endpoint: 'candidates/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name',      // <- nombre del campo que se usará como `label`
    },
    {
        label: 'Archivo Original',
        field: 'original_file',
        type: 'input',
        span: 12,
        required: true,
    },
    {
        label: 'Activo',
        field: 'is_active',
        type: 'switch',
        span: 12,
        required: true,
    },
];
