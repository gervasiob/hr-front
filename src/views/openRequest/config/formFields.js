export const candidateFormFields = [
    // {
    //     label: 'Mail del Candidato',
    //     field: 'candidate',
    //     type: 'api-select',
    //     span: 8,
    //     required: true,
    //     mode: 'single',
    //     endpoint: 'candidates/', // <- el endpoint real que usás
    //     valueField: 'id',       // <- nombre del campo que se usará como `value`
    //     nameField: 'email', 
    // },
    {
        label: 'Comercial',
        field: 'comerciales',
        type: 'api-select',
        span: 8,
        required: true,
        mode: 'single',
        endpoint: 'users/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'username', 
    },
    {
        label: 'Cliente Final',
        field: 'client_id',
        type: 'api-select',
        span: 8,
        required: true,
        mode: 'single',
        endpoint: 'clients/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name', 
    },
    {
        label: 'Cliente Secundario',
        field: 'second_client_id',
        type: 'api-select',
        span: 8,
        required: true,
        mode: 'single',
        endpoint: 'clients/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name', 
    },
    {
        label: 'Código Accenture',
        field: 'codigo',
        type: 'input',
        span: 12
    },
    {
        label: 'Fecha de Creación',
        field: 'applied_date',
        type: 'date',
        span: 8,
        readonly: true,
    },
    {
        label: 'Descripción de Tareas',
        field: 'task_description',
        type: 'textarea',
        span: 12
    },
    {
        label: 'Requerimientos Técnicos',
        field: 'tech_requirements',
        type: 'textarea',
        span: 12
    },
    {
        label: 'Skills Excluyentes',
        field: 'skills',
        type: 'tag',
        span: 12,
        required: true,
    },
    {
        label: 'Requisitos Soft',
        field: 'soft_requirements',
        type: 'textarea',
        span: 12
    },
    {
        label: 'Competencias Soft',
        field: 'soft_skills',
        type: 'tag',
        span: 12,
        required: true,
    },
    {
        label: 'Estado',
        field: 'second_client_id',
        type: 'api-select',
        span: 8,
        required: true,
        mode: 'single',
        endpoint: 'clients/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name', 
    },
    {
        label: 'Estados',
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