export const modalFields = [
    {
        name: 'recipient_number',
        label: 'Teléfono',
        type: 'input',
        default: '',
        rules: {
            recipient_number: [{ required: true, message: 'Por favor ingrese un número de destinatario', trigger: 'change' }]
        }
    },
    {
        name: 'sku',
        label: 'SKU',
        type: 'input',
        default: '',
        rules: {
            sku: [{ required: true, message: 'Por favor ingrese un SKU', trigger: 'change' }]
        }
    },
    {
        name: 'requested_at',
        label: 'Fecha de solicitud',
        type: 'datePicker',
        default: null,
        rules: {
            requested_at: [{ required: true, message: 'Por favor seleccione una fecha', trigger: 'change' }]
        }
    },
    {
        name: 'cost_amount',
        label: 'Costo',
        type: 'inputNumber',
        default: null,
        rules: {
            cost_amount: [{ required: true, message: 'Por favor ingrese un costo', trigger: 'change' }]
        }
    },
    {
        name: 'confirmed',
        label: 'Confirmado',
        type: 'switch', // Usar switch para valores booleanos
        default: false,
        rules: {
            confirmed: [{ required: false }] // No es obligatorio, pero se puede validar si se necesita
        }
    },
    {
        name: 'confirmed_at',
        label: 'Fecha de confirmación',
        type: 'datePicker',
        default: null,
        rules: {
            confirmed_at: [{ required: false }] // No es obligatorio
        }
    },
    {
        name: 'message_id',
        label: 'ID del mensaje',
        type: 'input',
        default: '',
        rules: {
            message_id: [{ required: true, message: 'Por favor ingrese el ID del mensaje', trigger: 'change' }]
        }
    },
    {
        name: 'vendor_id',
        label: 'ID del proveedor',
        type: 'inputNumber',
        default: null,
        rules: {
            vendor_id: [{ required: true, message: 'Por favor ingrese el ID del proveedor', trigger: 'change' }]
        }
    },
    {
        name: 'detail_id',
        label: 'ID del detalle',
        type: 'inputNumber',
        default: null,
        rules: {
            detail_id: [{ required: false }]
        }
    }
];
