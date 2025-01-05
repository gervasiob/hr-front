export const tableColumns = [
    {
        title: '#',
        dataIndex: 'vendor_id',
        sorter: (a, b) => a.vendor_id - b.vendor_id,
    },
    {
        title: 'Aseguradora',
        dataIndex: 'comercial_name',
        sorter: (a, b) => a.comercial_name.localeCompare(b.comercial_name),
    },

    {
        title: 'Documentos',
        dataIndex: 'documents',
        width: 500,
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
    },
];
