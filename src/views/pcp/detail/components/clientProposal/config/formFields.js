export const candidateFormFields = [
    {
        label: 'Forma de Contratación',
        field: 'contract_type',
        type: 'api-select', span: 12,
        required: true,
        mode: 'single',
        endpoint: 'catalog-hiring-types/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name',      // <- nombre del campo que se usará como `label`
    },
    {
        label: 'Empresa Contratante',
        field: 'hiring_company',
        type: 'input',
        span: 12,
        required: true
    },
    {
        label: 'Tope Salarial Bruto',
        field: 'salary_cap',
        type: 'input',
        span: 12
    },
    {
        label: 'Homeworking',
        field: 'homeworking',
        type: 'switch',
        span: 12
    },
    {
        label: 'Prepaga',
        field: 'health_coverage',
        type: 'switch',
        span: 12
    },
    {
        label: 'Jornada Laboral',
        field: 'working_hours',
        type: 'input',
        span: 12
    },
    {
        label: 'Zona de Trabajo',
        field: 'work_location',
        type: 'input',
        span: 12
    },
    {
        label: 'Duración del Proyecto',
        field: 'project_duration',
        type: 'input',
        span: 12
    },
    {
        label: 'Guardias',
        field: 'on_call',
        type: 'input',
        span: 12
    },
    {
        label: 'Ajustes Salariales',
        field: 'salary_adjustments',
        type: 'input',
        span: 12
    },
    {
        label: 'Idioma Requerido',
        field: 'language_required',
        type: 'switch',
        span: 12
    },
    {
        label: 'Idioma',
        field: 'language',
        type: 'input',
        span: 12
    },
    {
        label: 'Nivel de Idioma',
        field: 'language_level',
        type: 'input',
        span: 12
    },
    {
        label: 'Otros Beneficios',
        field: 'other_benefits',
        type: 'textarea',
        span: 24
    }
]
