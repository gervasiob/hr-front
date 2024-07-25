import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
      {
        title: 'SKU',
        dataIndex: 'sku',
        sorter: (a, b) => a.sku - b.sku,
    },
    {
        title: 'Nombre de Producto',
        dataIndex: 'producto',
        sorter: (a, b) => a.producto.localeCompare(b.producto),
    },
    
    {
        title: 'Stock',
        dataIndex: 'stock',
        sorter: (a, b) => a.stock - b.stock,
    },
    // {
    //     title: 'Operation',
    //     dataIndex: 'operation',     
    // },
];
