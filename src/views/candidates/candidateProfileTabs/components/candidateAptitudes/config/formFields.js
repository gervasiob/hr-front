// src/views/candidatelanguage/config/formFields.js
export const candidateFormFields = [
    {
        label: 'Actitud',
        field: 'nombre',
        type: 'api-select',
        mode: 'single',
        span: 12,
        required: true,
        endpoint: 'attitudes/?active=true', // <- el endpoint real que usás
        valueField: 'id',
        nameField: 'name',
    },
    {
        label: 'Dónde la adquirió?',
        field: 'acquired',
        type: 'input',
        span: 12,
        required: false,
    },
    {
        label: 'Años de Experiencia',
        field: 'exp_years',
        type: 'number',
        span: 12,
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
