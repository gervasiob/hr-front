export const filters = [
    {
        label: 'Candidato',
        field: 'candidate',
        model: 'candidate',
        mode: 'single',
        type: 'api-select',
        placeholder: 'Seleccionar Perfil',
        span: 8,
        apiSource: {
            endpoint: 'candidates/',
            valueField: 'id',
            nameField: 'email'
        }
    },
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
        type: 'select',
        placeholder: 'Seleccionar seniority',
        span: 8
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
