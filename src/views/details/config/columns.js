import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
    {
        title: '#',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'SKU',
        dataIndex: 'sku',
        sorter: (a, b) => a.sku.localeCompare(b.sku),
    },
    {
        title: 'Id de Licitación',
        dataIndex: 'quote_id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Cantidad',
        dataIndex: 'quantity',
        sorter: (a, b) => a.quantity - b.quantity,
    },
    {
        title: 'Precio',
        dataIndex: 'price',
        sorter: (a, b) => a.price - b.price,     
    },
    {
        title: 'Precio S/IVA',
        dataIndex: 'amount_wo_iva',
        sorter: (a, b) => a.amount_wo_iva - b.amount_wo_iva,     
    },
    {
        title: 'Precio Total',
        dataIndex: 'total_amount',
        sorter: (a, b) => a.total_amount - b.total_amount,     
    },
    {
        title: 'Fecha de Creación',
        dataIndex: 'created_at',
        sorter: (a, b) => a.created_at -b.created_at
    },
    {
        title: 'Fecha de Actualización',
        dataIndex: 'updated_at',
        sorter: (a, b) => a.updated_at - b.updated_at  
    },
    {
        title: 'Operation',
        dataIndex: 'operation',     
    },
];
