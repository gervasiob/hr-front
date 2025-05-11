// src/views/candidatelanguage/config/filters.js

export const filters = [
    {
        title: 'Candidato', field: 'canidate_id',
        cast: {
            source: 'candidates/',
            valueField: 'id',
            labelField: 'name',
        },
    },
    {
        title: 'Perfil', field: 'primary_profile_id',
        cast: {
            source: 'primary-profiles/',
            valueField: 'id',
            labelField: 'name',
        },
    },
    {
        title: 'Sub Perfil', field: 'sub_profile_id',
        cast: {
            source: 'sub-profiles/',
            valueField: 'id',
            labelField: 'name',
        },
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
