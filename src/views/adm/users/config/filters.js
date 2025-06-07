// src/views/candidates/config/filters.js

export const filters = [
    {
        label: 'Usuario',
        field: 'username',
        model: 'username',
        type: 'text',
        placeholder: 'Buscar por usuario',
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
        label: 'Rol',
        field: 'roles',
        model: 'roles',
        mode: 'multiple',
        type: 'api-select',
        placeholder: 'Seleccionar',
        span: 8,
        apiSource: {
            endpoint: 'roles/',
            valueField: 'id',
            nameField: 'name'
        },
    },
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
