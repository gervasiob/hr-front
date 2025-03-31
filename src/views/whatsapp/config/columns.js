export const tableColumns = [
    {
        title: '#',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id, // Number sorting
    },
    {
        title: 'Teléfono',
        dataIndex: 'recipient_number',
        sorter: (a, b) => a.recipient_number.localeCompare(b.recipient_number), // String sorting
    },
    {
        title: 'SKU',
        dataIndex: 'sku',
        sorter: (a, b) => a.sku.localeCompare(b.sku), // String sorting
    },
    {
        title: 'Costo',
        dataIndex: 'cost_amount',
        sorter: (a, b) => a.cost_amount - b.cost_amount, // Number sorting
    },
    {
        title: 'Confirmado',
        dataIndex: 'confirmed',
        sorter: (a, b) => a.confirmed - b.confirmed, // Boolean sorting
    },
    {
        title: 'Solicitado el',
        dataIndex: 'requested_at',
        sorter: (a, b) => new Date(a.requested_at) - new Date(b.requested_at), // Date sorting
    },
    {
        title: 'Confirmado el',
        dataIndex: 'confirmed_at',
        sorter: (a, b) => new Date(a.confirmed_at) - new Date(b.confirmed_at), // Date sorting
    },
    // {
    //     title: 'ID del mensaje',
    //     dataIndex: 'message_id',
    //     sorter: (a, b) => a.message_id.localeCompare(b.message_id), // String sorting
    // },
    {
        title: 'ID del proveedor',
        dataIndex: 'vendor_id',
        sorter: (a, b) => a.vendor_id - b.vendor_id, // Number sorting
    },
    {
        title: 'ID del detalle',
        dataIndex: 'detail_id',
        sorter: (a, b) => a.detail_id - b.detail_id, // Number sorting
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
    },
];
