export const modalFields = [
    {
        name: 'brand',
        label: 'Marca',
        type: 'input',
        default: '',
        rules: {
            brand: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
    {
        name: 'model',
        label: 'Modelo',
        type: 'input',
        default: '',
        rules: {
            model: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
];