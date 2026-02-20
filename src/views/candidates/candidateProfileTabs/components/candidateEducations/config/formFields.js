// src/views/candidatelanguage/config/formFields.js
export const candidateFormFields = [
    {
        label: 'Institución',
        field: 'institution_name',
        type: 'input',
        span: 12,
        required: true,
    },
    {
        label: 'Nombre de la Formación Realizada',
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
