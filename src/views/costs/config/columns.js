import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
      {
        title: '#',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Codigo',
        dataIndex: 'code',
        sorter: (a, b) => a.code - b.code,
    },
    
    {
        title: 'Detalle',
        dataIndex: 'detail',
        sorter: (a, b) => a.detail - b.detail,
    },
    {
        title: 'Modelo',
        dataIndex: 'model',
        sorter: (a, b) => a.model - b.model,
    },
    {
        title: 'Stock',
        dataIndex: 'cost_stock',
        sorter: (a, b) => a.cost_stock - b.cost_stock,
    },
    {
        title: 'Importe',
        dataIndex: 'cost_amount',
        sorter: (a, b) => a.cost_amount - b.cost_amount,
    },
    {
        title: 'Marca',
        dataIndex: 'product_brand',
        sorter: (a, b) => a.product_brand - b.product_brand,
    },
    {
        title: 'Activo',
        dataIndex: 'is_active',
        sorter: (a, b) => a.is_active - b.is_active,
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
