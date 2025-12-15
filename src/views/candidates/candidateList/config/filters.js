// src/views/candidates/config/filters.js

export const filters = [
    {
        label: 'Nombre',
        field: 'first_name',
        model: 'first_name',
        type: 'text',
        placeholder: 'Buscar por nombre',
        span: 8
    },
    {
        label: 'Apellido',
        field: 'last_name',
        model: 'last_name',
        type: 'text',
        placeholder: 'Buscar por nombre',
        span: 8
    },
    {
        label: 'Email',
        field: 'email',
        model: 'email',
        type: 'text',
        placeholder: 'Buscar por email',
        span: 8
    },
    {
        label: 'Blacklist',
        field: 'is_blacklisted',
        model: 'is_blacklisted',
        type: 'checkbox',
        // checkboxLabel: 'Inactivo',
        span: 8
    },
    {
        label: 'Disponible',
        field: 'available_to_apply',
        model: 'available_to_apply',
        type: 'checkbox',
        defaultValue: true,
        span: 8
    },
    // {
    //     label: 'Perfil',
    //     field: 'primary_profile',
    //     model: 'primary_profile',
    //     type: 'select',
    //     options: [
    //         { label: 'Programador', value: 'Programador' },
    //         { label: 'Analista', value: 'Analista' },
    //         { label: 'Soporte', value: 'Soporte' }
    //     ],
    //     placeholder: 'Seleccionar perfil',
    //     span: 8
    // },
    // {
    //     label: 'Disponible',
    //     field: 'available_to_apply',
    //     model: 'available_to_apply',
    //     type: 'select',
    //     options: [
    //         { label: 'Sí', value: true },
    //         { label: 'No', value: false }
    //     ],
    //     placeholder: 'Disponible para postular',
    //     span: 8
    // },
    // {
    //     label: 'Idiomas',
    //     field: 'languages',
    //     model: 'languages',
    //     type: 'tag',
    //     placeholder: 'Idiomas',
    //     span: 8
    // }
];
