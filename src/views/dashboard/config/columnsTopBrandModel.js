
export const tableColumnsTopBrandModel = [
       {
        title: 'Marca',
        dataIndex: 'brand',
        sorter: (a, b) => a.brand.localCompare(b.brand),
    },
    {
        title: 'Modelo',
        dataIndex: 'vehicle',
        // sorter: (a, b) => a.adjudicado - b.adjudicado,
        
    },

];
