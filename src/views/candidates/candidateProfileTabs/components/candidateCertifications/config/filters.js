// src/views/candidatelanguage/config/filters.js

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
            nameField: 'first_name'
        }
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
    {
        label: 'Nivel Sr',
        field: 'seniority',
        model: 'seniority',
        type: 'text',
        placeholder: 'Buscar',
        span: 8
    },
    {
        label: 'Trabajo Actual',
        field: 'current_job',
        model: 'current_job',
        type: 'text',
        placeholder: 'Buscar',
        span: 8
    },
    {
        label: 'Años de Experiencia',
        field: 'experience_years',
        model: 'experience_years',
        type: 'text',
        placeholder: 'Buscar',
        span: 8
    },
    {
        label: 'Skills',
        field: 'skills_description',
        model: 'skills_description',
        type: 'text',
        placeholder: 'Buscar',
        span: 8
    },
];
