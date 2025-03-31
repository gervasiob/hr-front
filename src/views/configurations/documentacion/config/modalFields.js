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
        name: 'description',
        label: 'Descripción',
        type: 'input',
        default: null,
    },
];