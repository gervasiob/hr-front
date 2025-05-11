// src/views/candidateProfile/config/filters.js

export const filters = [
    {
        label: 'Candidato',
        field: 'candidate',
        model: 'candidate',
        mode: 'multiple',
        type: 'api-select',
        placeholder: 'Seleccionar Perfil',
        span: 8,
        apiSource: {
            endpoint: 'candidates/',
            valueField: 'id',
            nameField: 'email'
        }
    },
    {
        label: 'Perfil',
        field: 'primaryprofile',
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
    {
        label: 'Sub Perfil',
        field: 'sub_profile',
        model: 'sub_profile',
        mode: 'multiple',
        type: 'api-select',
        placeholder: 'Seleccionar Perfil',
        span: 8,
        apiSource: {
            endpoint: 'sub-profiles/',
            valueField: 'id',
            nameField: 'name'
        }
    },
];
