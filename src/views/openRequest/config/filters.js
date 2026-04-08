export const filters = [
    {
        label: 'Cliente',
        field: 'client_id',
        model: 'client_id',
        mode: 'single',
        type: 'api-select',
        placeholder: 'Seleccionar Perfil',
        span: 8,
        apiSource: {
            endpoint: 'clients/',
            valueField: 'id',
            nameField: 'name'
        }
    },
    {
        label: 'Cliente Secundario',
        field: 'second_client_id',
        model: 'second_client_id',
        mode: 'single',
        type: 'api-select',
        placeholder: 'Seleccionar Perfil',
        span: 8,
        apiSource: {
            endpoint: 'clients/',
            valueField: 'id',
            nameField: 'name'
        }
    },
    {
        label: 'Código Accenture',
        field: 'codigo',
        model: 'codigo',
        type: 'input',
        placeholder: 'Ingrese código',
        span: 8,
    },
    // {
    //     label: 'Comercial',
    //     field: 'comerciales',
    //     model: 'comerciales',
    //     mode: 'single',
    //     type: 'api-select',
    //     placeholder: 'Seleccionar Perfil',
    //     span: 8,
    //     apiSource: {
    //         endpoint: 'users/',
    //         valueField: 'id',
    //         nameField: 'username'
    //     }
    // },
    // {
    //     label: 'Seniority',
    //     field: 'seniority',
    //     model: 'seniority',
    //     type: 'api-select',
    //     placeholder: 'Seleccionar Seniority',
    //     span: 8,

    //     apiSource: {
    //         endpoint: 'seniority-levels/',
    //         valueField: 'id',
    //         nameField: 'name'
    //     }
    // },
    // {
    //     label: 'Contratado',
    //     field: 'hired',
    //     model: 'hired',
    //     type: 'checkbox',
    //     span: 8
    // },
    // {
    //     label: 'Oferta Enviada',
    //     field: 'offer_sent',
    //     model: 'offer_sent',
    //     type: 'checkbox',
    //     span: 8
    // },
    // {
    //     label: 'Feedback Enviado',
    //     field: 'feedback_sent',
    //     model: 'feedback_sent',
    //     type: 'checkbox',
    //     span: 8
    // }
]
