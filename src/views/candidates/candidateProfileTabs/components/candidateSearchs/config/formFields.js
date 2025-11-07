// src/views/candidatelanguage/config/formFields.js
export const candidateFormFields = [
    // {
    //     label: 'Candidato',
    //     field: 'candidate_id',
    //     type: 'input',
    //     mode: 'single',
    //     span: 12,
    //     required: true,
    // },
    {
        label: 'Perfil',
        field: 'primary_profile',
        type: 'api-select',
        mode: 'single',
        span: 12,
        required: true,
        endpoint: 'primary-profiles/', // <- el endpoint real que usás
        valueField: 'id',
        nameField: 'name',
    },
    {
        label: 'Sub Perfil',
        field: 'sub_profile',
        type: 'api-select',
        mode: 'single',
        span: 12,
        required: true,
        endpoint: 'sub-profiles/', // <- el endpoint real que usás
        valueField: 'id',
        nameField: 'name',
        addField: 'primary_profile', // Depende del campo 'profile' y envía el parámetro 'primary_profile'
        dependsOn: 'primary_profile',
        dependsParam: 'primary_profile',
    },
    {
        label: 'Senirority',
        field: 'seniority',
        type: 'api-select',
        mode: 'single',
        span: 12,
        required: true,
        endpoint: 'seniority-levels/', // <- el endpoint real que usás
        valueField: 'id',
        nameField: 'name',
    },
    {
        label: 'Trabajo Actual',
        field: 'current_job',
        type: 'input',
        span: 12,
        required: true,
    },
    {
        label: 'Años de experiencia',
        field: 'experience_years',
        type: 'input',
        span: 12,
        required: true,
    },
    {
        label: 'Skills',
        field: 'skills_description',
        type: 'input',
        span: 12,
        required: true,
    },
];
