import { VENDOR_TYPE } from "@/common/common";
export const modalFields = [
    {
        name: 'product_feedback',
        label: 'Calificación',
        type: 'rate',
        desc: ['Muy Malo', 'Malo', 'Regular', 'Bueno', 'Muy Bueno'],
        color: 'red',
        default: null,
    },
    {
        name: 'social_name',
        label: 'Razón Social',
        type: 'input',
        default: '',
        rules: {
            social_name: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
    {
        name: 'comercial_name',
        label: 'Nombre de Fantasía',
        type: 'input',
        default: '',
        rules: {
            comercial_name: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
    {
        name: 'subsidiary',
        label: 'Sucursal',
        type: 'input',
        default: null,
    },
    {
        name: 'cuit',
        label: 'CUIT',
        type: 'input',
        default: '',
        rules: {
            cuit: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
    {
        name: 'vendor_type',
        label: 'Tipo',
        type: 'select',
        mode: 'single',
        default: [],
        options: VENDOR_TYPE.map((item) => {
            return {
                value: item.value,
                name: item.label,
            }
        }),
        rules: {
            vendor_type: [{ required: true, message: 'Por favor seleccione un valor', trigger: 'change', },
            ]
        }
    },
    {
        name: 'mail',
        label: 'Mail',
        type: 'input',
        default: '',
        rules: {
            mail: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
    {
        name: 'phone',
        label: 'Teléfono',
        type: 'input',
        default: null,
    },
    {
        name: 'wapp',
        label: 'N° Whatsapp',
        type: 'input',
        default: null,
    },
    {
        name: 'address',
        label: 'Dirección',
        type: 'input',
        default: null,
        rules: {
            address: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
    {
        name: 'city',
        label: 'Ciudad',
        type: 'input',
        default: null,
    },
    {
        name: 'province',
        label: 'Provincia',
        type: 'input',
        default: '',
        rules: {
            province: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
    {
        name: 'cp',
        label: 'Código Postal',
        type: 'input',
        default: null,
    },
    {
        name: 'freight',
        label: 'Flete',
        type: 'input',
        default: 0,
    },
    {
        name: 'additional_percentage',
        label: 'Porcentaje Adicional',
        type: 'input',
        default: 0,
    },
    {
        name: 'additional_amount',
        label: 'Importe Adicional',
        type: 'input',
        default: 0,
    },
    {
        name: 'fee_margen',
        label: 'Fee Margen',
        type: 'input',
        default: 0,
    },
    {
        name: 'fee_financial',
        label: 'Fee Financiero',
        type: 'input',
        default: 0,
    },


];