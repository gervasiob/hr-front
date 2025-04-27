export const modalFields = [
    {
        name: 'name',
        label: 'Nombre del Rol',
        type: 'input',
        default: '',
        rules: {
            name: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
];