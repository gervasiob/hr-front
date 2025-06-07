export const filters = [
    {
        field: 'key',
        label: 'Clave',
        type: 'input',
        placeholder: 'Buscar por clave'
    },
    {
        field: 'label',
        label: 'Etiqueta',
        type: 'input',
        placeholder: 'Buscar por etiqueta'
    },
    {
        field: 'path',
        label: 'Ruta',
        type: 'input',
        placeholder: 'Buscar por ruta'
    },
    {
        field: 'title',
        label: 'Título',
        type: 'input',
        placeholder: 'Buscar por título'
    },
    {
        field: 'icon',
        label: 'Icono',
        type: 'input',
        placeholder: 'Buscar por icono'
    },
    {
        field: 'hide_in_menu',
        label: 'Oculto en menú',
        type: 'select',
        options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' }
        ]
    },
    {
        field: 'order',
        label: 'Orden',
        type: 'input',
        placeholder: 'Buscar por orden'
    },
    {
        field: 'is_active',
        label: 'Activo',
        type: 'select',
        options: [
            { value: true, label: 'Sí' },
            { value: false, label: 'No' }
        ]
    },
    {
        field: 'parent',
        label: 'Menú padre',
        type: 'api-select',
        apiSource: {
            endpoint: 'menu-items',
            valueField: 'id',
            nameField: 'label'
        },
        placeholder: 'Seleccionar menú padre'
    },
    {
        field: 'roles',
        label: 'Roles',
        type: 'api-select',
        mode: 'multiple',
        apiSource: {
            endpoint: 'roles',
            valueField: 'id',
            nameField: 'name'
        },
        placeholder: 'Seleccionar roles'
    }
];
