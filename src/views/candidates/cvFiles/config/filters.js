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
        label: 'Archivo Original',
        field: 'original_file',
        model: 'original_file',
        type: 'text',
        placeholder: 'Buscar',
        span: 8
    },
];
