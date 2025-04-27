import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
    {
        title: '#',
      
        dataIndex: 'id',
   
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Plataforma',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'URL',
        dataIndex: 'url',
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
