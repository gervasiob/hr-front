export const modalFields = [
    {
        name: 'sku',
        label: 'SKU',
        type: 'input',
        default: '',
        rules: {
            sku: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
    {
        name: 'quote_id',
        label: 'Número Siniestro',
        type: 'input',
        default: 0,
        rules: {
            quote_id: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
    {
        name: 'description',
        label: 'Description',
        type: 'input',
        default: '',
        rules: {
            description: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
    {
        name: 'quantity',
        label: 'Cantidad',
        type: 'input',
        default: 0,
        rules: {
            quantity: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
];