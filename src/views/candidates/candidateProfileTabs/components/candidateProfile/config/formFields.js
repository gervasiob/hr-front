// src/views/candidatelanguage/config/formFields.js
export const candidateFormFields = [
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
        label: 'Seniority',
        field: 'seniority_level',
        type: 'api-select',
        mode: 'single',
        span: 12,
        required: true,
        endpoint: 'seniority-levels/', // <- el endpoint real que usás
        valueField: 'id',
        nameField: 'name',
        castResponseTo: 'integer',
    },
    {
        label: 'Trabajo Actual',
        field: 'current_job',
        type: 'input',
        span: 12,
        required: true,
    },
    // {
    //     label: 'Años de experiencia',
    //     field: 'experience_years',
    //     type: 'input',
    //     span: 12,
    //     required: true,
    // },
    {
        label: 'Skills',
        field: 'skills_description_arr',
        type: 'tag',

        span: 12,
        required: true,
    },
    {
        label: 'Seleccionado',
        field: 'is_selected',
        type: 'checkbox',
        span: 12,
        required: false,
    },
];
