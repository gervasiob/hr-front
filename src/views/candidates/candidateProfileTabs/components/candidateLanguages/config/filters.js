// src/views/candidatelanguage/config/filters.js

export const filters = [
    {
        label: 'Candidato', field: 'canidate_id',
        model: 'candidate_id',
        mode: 'multiple',
        type: 'api-select',
        placeholder: 'Seleccionar Perfil',
        span: 8,
        apiSource: {
            endpoint: 'candidates/',
            valueField: 'id',
            nameField: 'name'
        }
    },
    {
        label: 'Idioma', field: 'language_id',
        mode: 'multiple',
        type: 'api-select',
        placeholder: 'Seleccionar Perfil',
        span: 8,
        apiSource: {
            endpoint: 'languages/',
            valueField: 'id',
            nameField: 'name'
        }
    },
    {
        label: 'Nivel Escrito',
        field: 'written_level',
        model: 'written_level',
        type: 'text',
        placeholder: 'Buscar',
        span: 8
    },
    {
        label: 'Nivel Oral',
        field: 'oral_level',
        model: 'oral_level',
        type: 'text',
        placeholder: 'Buscar',
        span: 8
    },
];
