// src/views/candidates/config/filters.js

export const filters = [
    {
        label: 'Sub Perfil',
        field: 'name',
        model: 'name',
        type: 'text',
        placeholder: 'Buscar por nombre',
        span: 8
    },
    {
        label: 'Perfil',
        field: 'primary_profile',
        model: 'primary_profile',
        mode: 'multiple',
        type: 'api-select',
        placeholder: 'Seleccionar Perfil',
        span: 8,
        apiSource: {
            endpoint: 'primary-profiles/',
            valueField: 'id',
            nameField: 'name'
        }
    },
];
