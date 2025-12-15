// src/views/candidatelanguage/config/formFields.js
export const candidateFormFields = [
    {
        label: 'Idioma',
        field: 'language',
        type: 'api-select',
        mode: 'single',
        span: 12,
        required: true,
        endpoint: 'languages/', // <- el endpoint real que usás
        valueField: 'id',
        nameField: 'name',
    },
    {
        label: 'Nivel Escrito',
        field: 'written_level_obj',
        type: 'api-select',
        mode: 'single',
        span: 12,
        required: true,
        endpoint: 'written-level/', // <- el endpoint real que usás
        valueField: 'id',
        nameField: 'name',
    },
    {
        label: 'Nivel Hablado',
        field: 'oral_level_obj',
        type: 'api-select',
        mode: 'single',
        span: 12,
        required: true,
        endpoint: 'oral-level/', // <- el endpoint real que usás
        valueField: 'id',
        nameField: 'name',
    },
];
