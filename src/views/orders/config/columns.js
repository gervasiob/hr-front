import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
    {
        title: 'Razon Social',
        dataIndex: 'razon_social',
        sorter: (a, b) => a.razon_social - b.razon_social,
    },
    {
        title: 'CUIT',
        dataIndex: 'cuit',
        sorter: (a, b) => a.cuit - b.cuit,
    },
    {
        title: 'Provincia',
        dataIndex: 'provincia',
        sorter: (a, b) => a.provincia - b.provincia,
    },
    {
        title: 'Sede',
        dataIndex: 'sede',
        sorter: (a, b) => a.sede - b.sede,
    },
    {
        title: 'ID Orden',
        dataIndex: 'orden_id',
        sorter: (a, b) => a.orden_id - b.orden_id,
    },
    {
        title: 'Fecha de Entrega',
        dataIndex: 'fecha_entrega',
        sorter: (a, b) => a.fecha_entrega - b.fecha_entrega
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
    },
];
