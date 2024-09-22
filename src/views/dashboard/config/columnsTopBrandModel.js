
export const tableColumnsTopBrandModel = [
    {
        title: 'Marca',
        dataIndex: 'brand',
        sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
        title: 'Modelo',
        dataIndex: 'vehicle',
        sorter: (a, b) => a.vehicle.localeCompare(b.vehicle),

    },

];
