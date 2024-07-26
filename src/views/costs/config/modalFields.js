import { TIRE_BRANDS } from "@/common/common";
export const modalFields = [
    {
        name: 'code',
        label: 'SKU',
        type: 'input',
        default: '',
        rules: {
            code: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
    {
        name: 'detail',
        label: 'Detalle',
        type: 'input',
        default: null,
        rules: {
            detail: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
    {
        name: 'model',
        label: 'Modelo',
        type: 'input',
        default: '',
    },
    {
        name: 'cost_stock',
        label: 'Stock Inicial',
        type: 'input',
        default: 0,
    },
    {
        name: 'cost_amount',
        label: 'Costo',
        type: 'input',
        default: 0,
    },
    {
        name: 'product_brand',
        label: 'Marca',
        type: 'select',
        default: null,
        options: TIRE_BRANDS.map((item) => {
            return {
                name: item.label,
                value: item.label,
            }
        }),
        rules: {
            product_brand: [{ required: true, message: 'Por favor seleccione un valor.', trigger: 'change', },
            ]
        }
    },
    {
        name: 'is_active',
        label: 'Activo',
        type: 'select',
        default: true,
        options: [
            { name: 'Sí', value: true },
            { name: 'No', value: false },
        ],
    },
];