import { ASEGURADORAS, TENDER_STATES } from "@/common/common";

export const tableColumns = [
    {
        title: 'Grupo',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'Sku',
        dataIndex: 'sku',
        key: 'sku',
    },
    {
        title: 'Tipo Llanta',
        dataIndex: 'llanta_type',
        key: 'llanta_type',
    },
    {
        title: 'Proveedor',
        dataIndex: 'vendor_id',
        key: 'vendor_id',
    },
    {
        title: 'OC',
        key: 'po',
        dataIndex: 'po',
    },
    {
        title: 'Precio',
        key: 'price',
        dataIndex: 'price',
    },
    {
        title: 'Cantidad',
        key: 'quantity',
        dataIndex: 'quantity',
    },
    {
        title: 'Total',
        key: 'total',
        dataIndex: 'total',
        render: (text, record) => {
            return record.price * record.quantity;
        },
    },
    {
        title: 'Total Sin Iva',
        key: 'ammount_wo_iva',
        dataIndex: 'ammount_wo_iva',
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
    },
];
