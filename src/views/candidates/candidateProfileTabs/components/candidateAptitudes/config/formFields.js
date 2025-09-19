// src/views/candidatelanguage/config/formFields.js
export const candidateFormFields = [
    {
        label: 'Nombre',
        field: 'nombre',
        type: 'input',
        span: 12,
        required: true,
    },
    {
        label: 'Origen',
        field: 'origen',
        type: 'select',
            options: [
                {
                    label: 'Adquirida',
                    value: 'ADQUIRIDA',
                },
                {
                    label: 'Requerida',
                    value: 'REQUERIDA',
                },
            ],
        span: 12,
        required: true,
    },
];
