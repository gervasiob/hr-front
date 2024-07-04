import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
    {
        title: '#',
      
        dataIndex: 'id',
   
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Usuario',
      
        dataIndex: 'username',

        sorter: (a, b) => a.username.localeCompare(b.username),
   
    },
    {
        title: 'Email',

        dataIndex: 'email',
    },
    {
        title: 'Rol',

        dataIndex: 'name', // Usamos la nueva propiedad company_name
        
        sorter: (a, b) => a.name.roles.localeCompare(b.name.roles),
    },
    {
        title: 'Operation',
        dataIndex: 'operation',     
    },
];
