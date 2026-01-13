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
            { value: 'MUY_BAJO', label: 'Muy Bajo' },
            { value: 'BAJO', label: 'Bajo' },
            { value: 'MEDIO_BAJO', label: 'Medio-Bajo' },
            { value: 'MEDIO', label: 'Medio' },
            { value: 'MEDIO_ALTO', label: 'Medio-Alto' },
            { value: 'ALTO', label: 'Alto' },
            { value: 'MUY_ALTO', label: 'Muy Alto' },
        ],
    },
];
