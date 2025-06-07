// src/views/sub-profiles/config/formFields.js
export const candidateFormFields = [
    { label: 'Sub Perfil', field: 'name', type: 'input', span: 12, required: true },
    {
        label: 'Perfil',
        field: 'primary_profile',
        type: 'api-select',
        mode: 'single',
        span: 12,
        required: true,
        endpoint: 'primary-profiles/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name',      // <- nombre del campo que se usará como `label`
    },
];
