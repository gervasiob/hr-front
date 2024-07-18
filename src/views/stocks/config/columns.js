import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
      {
        title: 'SKU',
        dataIndex: 'sku',
        sorter: (a, b) => a.sku - b.sku,
    },
    {
        title: 'Nombre de Producto',
        dataIndex: 'product_name',
        sorter: (a, b) => a.product_name.localeCompare(b.product_name),
    },
    
    {
        title: 'Cantidad',
        dataIndex: 'quantity',
        sorter: (a, b) => a.quantity - b.quantity,
    },
    {
        title: 'ID',
        dataIndex: 'id_geo',
        sorter: (a, b) => a.id_geo - b.id_geo,
    },
    {
        title: 'Operation',
        dataIndex: 'operation',     
    },
];
