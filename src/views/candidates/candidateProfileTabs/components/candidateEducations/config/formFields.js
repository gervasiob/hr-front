// src/views/candidatelanguage/config/formFields.js
export const candidateFormFields = [
    {
        label: 'Insittución',
        field: 'institution_name',
        type: 'input',
        span: 12,
        required: true,
    },
    {
        label: 'Grado Alcanzado',
        field: 'degree',
        type: 'input',
        span: 12,
        required: true,
    },
    {
        label: 'Estado',
        field: 'state',
        type: 'select',
            options: [
                {
                    label: 'FINALIZADO',
                    value: 'FINALIZADO',
                },
                {
                    label: 'EN PROCESO',
                    value: 'EN PROCESO',
                },
                {
                    label: 'ABANDONADO O STAND-BY',
                    value: 'ABANDONADO O STAND-BY',
                },
            ],
        span: 12,
        required: true,
    },
    // {
    //     label: 'Fecha de Inicio',
    //     field: 'start_date',
    //     type: 'date',
    //     span: 12,
    //     required: true,
    // },
    // {
    //     label: 'Fecha de Finalización',
    //     field: 'end_date',
    //     type: 'date',
    //     span: 12,
    //     required: true,
    // },

];
