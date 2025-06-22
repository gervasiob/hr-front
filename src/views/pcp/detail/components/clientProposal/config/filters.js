export const filters = [
    {
        label: 'Empresa Contratante',
        field: 'hiring_company',
        model: 'hiring_company',
        type: 'text',
        placeholder: 'Buscar por empresa',
        span: 8
    },
    {
        label: 'Forma de Contratación',
        field: 'contract_type',
        model: 'contract_type',
        type: 'text',
        placeholder: 'Buscar por tipo de contrato',
        span: 8
    },
    {
        label: 'Zona de Trabajo',
        field: 'work_location',
        model: 'work_location',
        type: 'text',
        placeholder: 'Buscar por zona',
        span: 8
    },
    {
        label: 'Idioma Requerido',
        field: 'language_required',
        model: 'language_required',
        type: 'checkbox',
        span: 8
    },
    {
        label: 'Idioma',
        field: 'language',
        model: 'language',
        type: 'text',
        placeholder: 'Buscar por idioma',
        span: 8
    }
]
