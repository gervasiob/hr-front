import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
    {
        title: '#',
      
        dataIndex: 'id',
   
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'SKU',
        dataIndex: 'sku',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Nombre',
        dataIndex: 'name',
    },
    {
        title: 'Grupo',
        dataIndex: 'group',
        sorter: (a, b) => a.fee - b.fee,
    },
    {
        title: 'Tipo',
        dataIndex: 'type',     
    },
    {
        title: 'Cantidad',
        dataIndex: 'quantity',     
    },
    {
        title: 'Precio',
        dataIndex: 'amount',     
    },
    // {
    //     title: 'Fecha de Creación',
    //     dataIndex: 'created_at',     
    // },
    // {
    //     title: 'Fecha de Actulización',
    //     dataIndex: 'updated_at',     
    // },
    {
        title: 'Operation',
        dataIndex: 'operation',     
    },
];
