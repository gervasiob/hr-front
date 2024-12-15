import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
    {
        title: 'Razon Social',
        dataIndex: 'razon_social',
        sorter: (a, b) => a.razon_social.localeCompare(b.razon_social),
    },
    // {
    //     title: 'CUIT',
    //     dataIndex: 'cuit',
    //     sorter: (a, b) => a.cuit - b.cuit,
    // },
    // {
    //     title: 'Provincia',
    //     dataIndex: 'provincia',
    //     sorter: (a, b) => a.provincia - b.provincia,
    // },
    // {
    //     title: 'Sede',
    //     dataIndex: 'sede',
    //     sorter: (a, b) => a.sede - b.sede,
    // },
    {
        title: 'Nro Orden de Compra',
        dataIndex: 'orden_id',
        sorter: (a, b) => a.orden_id.localeCompare(b.orden_id),
    },
    {
        title: 'Remito',
        dataIndex: 'remito',
        sorter: (a, b) => a.remito.localeCompare(b.remito),
    },
    {
        title: 'Sku',
        dataIndex: 'dsku',
        sorter: (a, b) => a.dsku.localeCompare(b.dsku),
    },
    {
        title: 'Descripción',
        dataIndex: 'dDescripcion',
        sorter: (a, b) => a.dDescripcion.localeCompare(b.dDescripcion),
    },
    {
        title: 'Cantidad',
        dataIndex: 'dCantidad',
        sorter: (a, b) => a.dCantidad.localeCompare(b.dCantidad),
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
    },
];
