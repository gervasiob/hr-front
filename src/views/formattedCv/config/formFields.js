// src/views/candidates/config/formattedCVFields.js

export const formFields = [
    { label: 'Idiomas', field: 'languages', type: 'tag', span: 24 },
    { label: 'Conocimientos Técnicos', field: 'skills', type: 'tag', span: 24 },
    {
        label: 'Educación',
        field: 'educations',
        type: 'table',
        span: 24,
        columns: [
            { title: 'Institución', dataIndex: 'institution', key: 'institution' },
            { title: 'Título', dataIndex: 'degree', key: 'degree' },
            { title: 'Año', dataIndex: 'year', key: 'year' }
        ]
    },
    {
        label: 'Experiencia Laboral',
        field: 'experiences',
        type: 'table',
        span: 24,
        columns: [
            { title: 'Empresa', dataIndex: 'company', key: 'company' },
            { title: 'Puesto', dataIndex: 'position', key: 'position' },
            { title: 'Desde', dataIndex: 'start_date', key: 'start_date' },
            { title: 'Hasta', dataIndex: 'end_date', key: 'end_date' }
        ]
    },
    {
        label: 'Certificaciones',
        field: 'certifications',
        type: 'table',
        span: 24,
        columns: [
            { title: 'Nombre', dataIndex: 'name', key: 'name' },
            { title: 'Entidad', dataIndex: 'entity', key: 'entity' },
            { title: 'Fecha', dataIndex: 'date', key: 'date' }
        ]
    }
];
