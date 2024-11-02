import { GROUPS } from "@/common/common";
import { getVendorList } from "@/api/vendors/vendors";
const vendorList = await getVendorList();
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
        name: 'name',
        label: 'Descripción',
        type: 'input',
        default: '',
        rules: {
            name: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
    {
        name: 'group',
        label: 'Grupo',
        default: 'Neumático',
        type: 'select',
        options: GROUPS,
        rules: {
            group: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
    {
        name: 'type',
        label: 'Tipo',
        type: 'input',
        default: null,
    },
    {
        name: 'quantity',
        label: 'Cantidad',
        type: 'input',
        default: 0,
    },
    {
        name: 'minimum_stock',
        label: 'Stock Mínimo',
        type: 'input',
        default: 0,
    },
    {
        name: 'available_stock',
        label: 'Stock Disponible',
        type: 'input',
        default: 0,
    },
    {
        name: 'amount',
        label: 'Precio',
        type: 'input',
        default: 0,
    },
    {
        name: 'vendors',
        label: 'Proveedores',
        type: 'select',
        default: null,
        options: vendorList,
    },
];