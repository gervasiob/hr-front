export const candidateFormFields = [
    {
        label: 'Mail del Candidato',
        field: 'candidate',
        type: 'api-select',
        span: 12,
        required: true,
        mode: 'single',
        endpoint: 'candidates/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'email', 
    },
    {
        label: 'Reclutador',
        field: 'recruiter',
        type: 'api-select',
        span: 12,
        required: true,
        mode: 'single',
        endpoint: 'users/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'username', 
    },
    {
        label: 'Seniority',
        field: 'seniority',
        type: 'api-select', span: 12,
        required: true,
        mode: 'single',
        endpoint: 'seniority-levels/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name',      // <- nombre del campo que se usará como `label`
    },
    {
        label: 'Fecha de Postulación',
        field: 'applied_date',
        type: 'date',
        span: 12
    },
    {
        label: 'Feedback',
        field: 'feedback',
        type: 'select',
        span: 12,
        options: [
            { label: 'En Proceso', value: 'EN PROCESO' },
            { label: 'Stand By', value: 'STAND BY' },
            { label: 'Descartado', value: 'DESCARTADO' },
        ],
    },
    {
        label: 'Feedback Enviado',
        field: 'feedback_sent',
        type: 'switch',
        span: 12
    },
    {
        label: 'Candidato Observaciones',
        field: 'candidate_reason',
        type: 'textarea',
        span: 12
    },
]
