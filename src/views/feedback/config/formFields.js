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
        label: 'Preselección Comercial',
        field: 'preselected_commercial',
        type: 'switch',
        span: 12
    },
    {
        label: 'Preselección Cliente',
        field: 'preselected_client',
        type: 'switch',
        span: 12
    },
    {
        label: 'Entrevista Técnica',
        field: 'technical_interview',
        type: 'switch',
        span: 12
    },
    {
        label: 'Psicotécnico',
        field: 'psychotechnical_test',
        type: 'switch',
        span: 12
    },
    {
        label: 'Oferta Enviada',
        field: 'offer_sent',
        type: 'switch',
        span: 12
    },
    {
        label: 'Contratado',
        field: 'hired',
        type: 'switch',
        span: 12
    },
    {
        label: 'Feedback Enviado',
        field: 'feedback_sent',
        type: 'switch',
        span: 12
    }
]
