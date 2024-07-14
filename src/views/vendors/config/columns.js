import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
    {
        title: '#',
      
        dataIndex: 'id',
   
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Nombre',
        dataIndex: 'comercial_name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Tipo',
        dataIndex: 'vendor_type',
    },
    {
        title: 'Fee',
        dataIndex: 'fee',
        sorter: (a, b) => a.fee - b.fee,
    },
    {
        title: 'Operation',
        dataIndex: 'operation',     
    },
];
