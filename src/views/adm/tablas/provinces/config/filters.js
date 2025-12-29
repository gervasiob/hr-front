export const filters = [
    {
        label: 'Nombre',
        field: 'name',
        model: 'name',
        type: 'text',
        placeholder: 'Buscar por nombre',
        span: 8
    },
    {
        label: 'Código',
        field: 'code',
        model: 'code',
        type: 'text',
        placeholder: 'Buscar por código',
        span: 8
    },
    {
        label: 'País',
        field: 'country',
        model: 'country',
        mode: 'multiple',
        type: 'api-select',
        placeholder: 'Seleccionar Perfil',
        span: 8,
        apiSource: {
            endpoint: 'catalog-countries/',
            valueField: 'id',
            nameField: 'name'
        }
    },
    // {
    //     label: 'Por defecto',
    //     field: 'is_default',
    //     model: 'is_default',
    //     type: 'checkbox',
    //     span: 8
    // }
]
