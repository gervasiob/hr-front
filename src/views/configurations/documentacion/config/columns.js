export const tableColumns = [
    {
        title: '#',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Nombre',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
        title: 'Descripción',
        dataIndex: 'description',
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
    },
];
