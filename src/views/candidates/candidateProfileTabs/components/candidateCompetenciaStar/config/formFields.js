// src/views/candidatelanguage/config/formFields.js
export const candidateFormFields = [
    {
        label: 'Competencia',
        field: 'competencia',
        type: 'api-select',
        mode: 'single',
        span: 12,
        required: true,
        endpoint: 'competency-types/',
        valueField: 'name',
        nameField: 'name',
    },
    {
        label: 'Nivel',
        field: 'nivel',
        type: 'input',
        span: 12,
        required: true,
    },
];
