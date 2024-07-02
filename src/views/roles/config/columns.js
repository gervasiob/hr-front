import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
    {
        title: '#',
      
        dataIndex: 'id',
   
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Rol',

        dataIndex: 'name', // Usamos la nueva propiedad company_name
        
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Operation',
        dataIndex: 'operation',     
    },
];
