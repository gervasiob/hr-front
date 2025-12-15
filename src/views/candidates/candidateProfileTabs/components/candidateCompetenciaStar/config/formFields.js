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
        span: 12,
        required: true,
        type: 'select',
        default: 'BAJO',
        options: [
            // { value: 'MUY_BAJO', label: 'Muy Bajo' },
            { value: 'BAJO', label: 'Bajo' },
            { value: 'MEDIO', label: 'Medio' },
            { value: 'ALTO', label: 'Alto' },
        ],
    },
];
