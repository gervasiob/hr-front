// src/views/users/config/formFields.js

export const candidateFormFields = [
    { label: 'Usuario', field: 'username', type: 'input', span: 12, required: true },
    { label: 'Email', field: 'email', type: 'input', span: 12, required: true },
    { label: 'Password', field: 'password', type: 'input', span: 12, required: true },

    {
        label: 'Roles',
        field: 'roles',
        type: 'api-select',
        mode: 'multiple',
        span: 12,
        required: true,
        endpoint: 'roles/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name',      // <- nombre del campo que se usará como `label`
    },
];
