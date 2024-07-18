import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
    {
        title: '#',
      
        dataIndex: 'id',
   
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Nombre',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
        title: 'Puntos',
        dataIndex: 'points',
        sorter: (a, b) => a.points - b.points,
    },
    {
        title: 'Validacion de puntos',
        dataIndex: 'validation_points',
        sorter: (a, b) => a.validation_points - b.validation_points,
    },
    {
        title: 'Invalidacion de puntos',
        dataIndex: 'invalidation_points',
        sorter: (a, b) => a.invalidation_points - b.invalidation_points,
    },
    {
        title: 'Orden de Clasificacion',
        dataIndex: 'sort_order',
        sorter: (a, b) => a.sort_order - b.sort_order,
    },
    {
        title: 'Operation',
        dataIndex: 'operation',     
    },
];
