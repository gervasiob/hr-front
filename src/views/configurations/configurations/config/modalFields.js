export const modalFields = [
    {
        name: 'name',
        label: 'Nombre',
        type: 'input',
        default: null,
        rules: {
            name: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
    {
        name: 'enable',
        label: 'Activo',
        type: 'select',
        default: false,
        options: [
            { name: 'Sí', value: true },
            { name: 'No', value: false },
        ],
    },
    {
        name: 'value',
        label: 'Valor',
        type: 'input',
        default: 0,
    },
    {
        name: 'description',
        label: 'Description',
        type: 'input',
        default: null,
    },
    {
        name: 'text',
        label: 'Texto',
        type: 'input',
        default: null,
    },
    {
        name: 'Values',
        label: 'Valores',
        type: 'input',
        default: null,
    },

];