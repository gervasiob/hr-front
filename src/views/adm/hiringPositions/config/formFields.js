// src/views/sub-profiles/config/formFields.js
export const candidateFormFields = [
    {
        label: 'Perfil',
        field: 'profile',
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
        field: 'subprofile',
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
        field: 'seniority',
        type: 'api-select',
        mode: 'single',
        span: 12,
        required: true,
        endpoint: 'seniority-levels/', // <- el endpoint real que usás
        valueField: 'id',
        nameField: 'name',
        castResponseTo: 'integer',
    },
];
