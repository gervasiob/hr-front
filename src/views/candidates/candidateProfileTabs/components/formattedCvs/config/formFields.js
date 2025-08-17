// formattedCvs/config/formFields.js

export const candidateFormFields = [
    {
        field: 'full_name',
        label: 'Nombre Completo',
        type: 'input',
        required: true,
        span: 12
    },
    {
        field: 'phone_number',
        label: 'Teléfono',
        type: 'input',
        required: true,
        span: 12
    },
    { label: 'Zona / Barrio', field: 'zone', type: 'input', span: 12, required: false },
    {
        field: 'address',
        label: 'Dirección',
        type: 'textarea',
        required: true,
        span: 24
    },
    {
        field: 'profile',
        label: 'Perfil',
        type: 'input',
        required: true,
        span: 8
    },
    {
        field: 'sub_profile',
        label: 'Subperfil',
        type: 'input',
        required: true,
        span: 8
    },
    {
        field: 'seniority',
        label: 'Seniority',
        type: 'input',
        required: true,
        span: 8
    },
    {
        field: 'experience_years',
        label: 'Años de experiencia',
        type: 'input',
        required: true,
        span: 8
    },
    {
        field: 'languages',
        label: 'Idiomas',
        type: 'tag',
        required: true,
        span: 12
    },
    {
        field: 'technical_skills',
        label: 'Conocimientos técnicos',
        type: 'tag',
        required: true,
        span: 12
    },
    {
        field: 'summary',
        label: 'Resumen profesional',
        type: 'textarea',
        required: true,
        span: 24
    },
    {
        field: 'parsed_at',
        label: 'Fecha de creación',
        type: 'date',
        required: true,
        span: 24
    }
];
