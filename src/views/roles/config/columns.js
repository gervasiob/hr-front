import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Rol',
        dataIndex: 'name', // Usamos la nueva propiedad company_name
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Usuarios',
        dataIndex: 'users',
        key: 'users',
        sorter: (a, b) => a.users - b.users,

    },
    {
        title: 'Operation',
        dataIndex: 'operation',
    },
];
