export const tableColumns = [
    {
        title: '#',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Marca',
        dataIndex: 'brand',
        sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
        title: 'Modelo',
        dataIndex: 'model',
        sorter: (a, b) => a.model.localeCompare(b.model),
    },
    {
        title: 'Operation',
        dataIndex: 'operation',     
    },
];
