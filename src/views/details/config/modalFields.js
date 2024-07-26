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
        label: 'Número de Siniestro',
        type: 'input',
        default: 0,
    },
    {
        name: 'description',
        label: 'Description',
        type: 'input',
        default: '',
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