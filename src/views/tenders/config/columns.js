export const tableColumns = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
        filters: [
            { text: '1', value: 1 },
            { text: '2', value: 2 },
            // Agrega más filtros según sea necesario
        ],
        onFilter: (value, record) => record.id === value,
    },
    {
        title: 'Aseguradora',
        dataIndex: 'company',
        key: 'company',
        sorter: (a, b) => a.company.localeCompare(b.company),

    },
    {
        title: 'Cotización',
        dataIndex: 'cotizacion',
        key: 'cotizacion',
        sorter: (a, b) => a.cotizacion - b.cotizacion,

    },
    {
        title: 'Rentabilidad',
        dataIndex: 'rentabilidad',
        key: 'rentabilidad',
        sorter: (a, b) => a.rentabilidad - b.rentabilidad,

    },
    {
        title: 'Estado',
        key: 'claim_state',
        dataIndex: 'claim_state',
        sorter: (a, b) => a.claim_state.localeCompare(b.claim_state),
    },
];
