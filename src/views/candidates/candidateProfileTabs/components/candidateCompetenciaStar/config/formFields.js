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
            { value: 'MUY BAJO', label: 'Muy Bajo' },
            { value: 'BAJO', label: 'Bajo' },
            { value: 'MEDIO-BAJO', label: 'Medio-Bajo' },
            { value: 'MEDIO', label: 'Medio' },
            { value: 'MEDIO-ALTO', label: 'Medio-Alto' },
            { value: 'ALTO', label: 'Alto' },
            { value: 'MUY ALTO', label: 'Muy Alto' },
        ],
    },
];
