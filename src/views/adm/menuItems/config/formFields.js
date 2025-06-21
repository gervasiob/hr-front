// Form fields for menu items
export const candidateFormFields = [
    { label: 'Clave', field: 'key', type: 'input', span: 12, required: true },
    { label: 'Etiqueta', field: 'label', type: 'input', span: 12, required: true },
    {
        label: 'Ruta', field: 'path', type: 'input', span: 12, required: true,
        rules: {
            path: [
                { required: true, message: 'La ruta es requerida', trigger: 'change' },
                { pattern: /^\//, message: 'Debe comenzar con /', trigger: 'change' }
            ]
        }
    },
    { label: 'Nombre', field: 'name', type: 'input', span: 12, required: true },
    { label: 'Título', field: 'title', type: 'input', span: 12, required: true },
    { label: 'Icono', field: 'icon', type: 'input', span: 12, required: false },
    { label: 'Componente', field: 'component', type: 'input', span: 12, required: false },
    { label: 'Orden', field: 'order', type: 'number', span: 12, required: true },
    {
        label: 'Ocultar en menú',
        field: 'hide_in_menu',
        type: 'switch',
        span: 12,
        required: false,
        defaultValue: false
    },
    {
        label: 'Activo',
        field: 'is_active',
        type: 'switch',
        span: 12,
        required: false,
        defaultValue: true
    },
    {
        label: 'Menú padre',
        field: 'parent',
        type: 'api-select',
        span: 12,
        required: false,
        endpoint: 'menu-items/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'key',      // <- nombre del campo que se usará como `label`
    },
    {
        label: 'Roles',
        field: 'roles',
        type: 'api-select',
        span: 12,
        required: true,
        mode: 'multiple',
        endpoint: 'roles/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name', 
    }
];
