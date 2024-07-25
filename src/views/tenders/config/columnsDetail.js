import { ASEGURADORAS, TENDER_STATES } from "@/common/common";

export const tableColumns = [
    {
        title: 'GRUPO',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: 'SKU',
        dataIndex: 'sku',
        key: 'sku',
    },
    {
        title: 'DESCRIPCION',
        dataIndex: 'llanta_type',
        key: 'llanta_type',
    },
    {
        title: 'PROVEEDOR',
        dataIndex: 'vendor_id',
        key: 'vendor_id',
    },
    {
        title: 'OC',
        key: 'po',
        dataIndex: 'po',
    },
    {
        title: 'PRECIO S/IVA',
        key: 'price_wo_iva',
        dataIndex: 'price_wo_iva',
        render: (text, record) => {
            return parseFloat(record.price / (1.21)).toFixed(2);
        },
    },
    {
        title: 'PRECIO C/IVA',
        key: 'price',
        dataIndex: 'price',
    },
    {
        title: 'CANTIDAD',
        key: 'quantity',
        dataIndex: 'quantity',
    },
    {
        title: 'TOTAL SIN IVA',
        key: 'amount_wo_iva',
        dataIndex: 'amount_wo_iva',
    },
    {
        title: 'TOTAL + FEE',
        key: 'total',
        dataIndex: 'total',
        render: (text, record) => {
            return record.price * record.quantity;
        },
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
    },
];
