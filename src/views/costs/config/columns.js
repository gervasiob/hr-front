
const customCurrencyFormat = (record, index, column) => {
 
    return {
        style: {
            textAlign: 'right',
        },
    }
}
export const tableColumns = [
    {
        title: '#',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Codigo',
        dataIndex: 'code',
        // sorter: (a, b) => a.code.localeCompare(b.code),
    },

    {
        title: 'Detalle',
        dataIndex: 'detail',
        // sorter: (a, b) => a.detail.localeCompare(b.detail),
    },
    {
        title: 'Modelo',
        dataIndex: 'model',
        // sorter: (a, b) => a.model.localeCompare(b.model),
    },
    {
        title: 'Marca',
        dataIndex: 'product_brand',
        // sorter: (a, b) => a.product_brand.localeCompare(b.product_brand),
    },
    {
        title: 'Stock',
        dataIndex: 'cost_stock',
        sorter: (a, b) => a.cost_stock - b.cost_stock,
        customCell: customCurrencyFormat,
      
    },
    {
        title: 'Importe',
        dataIndex: 'cost_amount',
        sorter: (a, b) => a.cost_amount - b.cost_amount,
        customCell: customCurrencyFormat,
    },
    {
        title: 'Activo',
        dataIndex: 'is_active',
        // sorter: (a, b) => a.is_active.localeCompare(b.is_active),
    },
    // {
    //     title: 'marca tiempo',
    //     dataIndex: 'timestamps',
    //     sorter: (a, b) => a.timestamps - b.timestamps,
    // },
    // {
    //     title: 'Importe',
    //     dataIndex: 'import_batch',
    //     sorter: (a, b) => a.import_batch - b.import_batch,
    // },
    {
        title: 'Operation',
        dataIndex: 'operation',
    },
];
