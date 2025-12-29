export const candidateFormFields = [
    {
        label: 'Nombre',
        field: 'name',
        type: 'input',
        span: 12,
        required: true
    },
    {
        label: 'Código',
        field: 'code',
        type: 'input',
        span: 12,
        required: true
    },
    {
        label: 'País',
        field: 'country',
        type: 'api-select',
        mode: 'single',
        span: 12,
        required: true,
        endpoint: 'catalog-countries/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name',      // <- nombre del campo que se usará como `label`
    },
    // {
    //     label: 'Por defecto',
    //     field: 'is_default',
    //     type: 'switch',
    //     span: 12
    // }
]
