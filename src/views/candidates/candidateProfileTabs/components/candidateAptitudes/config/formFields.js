// src/views/candidatelanguage/config/formFields.js
export const candidateFormFields = [
    {
        label: 'Aptitud',
        field: 'nombre',
        type: 'input',
        mode: 'single',
        span: 8,
        required: true,
    },
    {
        label: 'Dónde la adquirió?',
        field: 'acquired',
        type: 'textarea',
        span: 12,
        required: false,
    },
    {
        label: 'Años de Experiencia',
        field: 'exp_years',
        type: 'number',
        span: 4,
        required: false,
    },
    // {
    //     label: 'Origen',
    //     field: 'origen',
    //     type: 'select',
    //         options: [
    //             {
    //                 label: 'Adquirida',
    //                 value: 'ADQUIRIDA',
    //             },
    //             {
    //                 label: 'Requerida',
    //                 value: 'REQUERIDA',
    //             },
    //         ],
    //     span: 12,
    //     required: true,
    // },
];
