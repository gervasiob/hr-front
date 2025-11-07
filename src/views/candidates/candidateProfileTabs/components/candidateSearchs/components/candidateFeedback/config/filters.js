export const filters = [
    {
        label: 'Reclutador',
        field: 'recruiter',
        model: 'recruiter',
        mode: 'single',
        type: 'api-select',
        placeholder: 'Seleccionar Perfil',
        span: 8,
        apiSource: {
            endpoint: 'users/',
            valueField: 'id',
            nameField: 'username'
        }
    },
    {
        label: 'Seniority',
        field: 'seniority',
        model: 'seniority',
        type: 'api-select',
        placeholder: 'Seleccionar Seniority',
        span: 8,

        apiSource: {
            endpoint: 'seniority-levels/',
            valueField: 'id',
            nameField: 'name'
        }
    },
    {
        label: 'Contratado',
        field: 'hired',
        model: 'hired',
        type: 'checkbox',
        span: 8
    },
    {
        label: 'Oferta Enviada',
        field: 'offer_sent',
        model: 'offer_sent',
        type: 'checkbox',
        span: 8
    },
    {
        label: 'Feedback Enviado',
        field: 'feedback_sent',
        model: 'feedback_sent',
        type: 'checkbox',
        span: 8
    }
]
