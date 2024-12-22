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
        title: 'Nro Siniestro',
        dataIndex: 'quote_id',
        sorter: (a, b) => a.quote_id.localeCompare(b.quote_id),
    },
    {
        title: 'Remito',
        dataIndex: 'remito',
        sorter: (a, b) => a.remito.localeCompare(b.remito),
    },
    {
        title: 'Sku',
        dataIndex: 'dSku',
        sorter: (a, b) => a.dSku.localeCompare(b.dSku),
    },
    {
        title: 'Descripción',
        dataIndex: 'dDescripcion',
        sorter: (a, b) => a.dDescripcion.localeCompare(b.dDescripcion),
    },
    {
        title: 'Patente',
        dataIndex: 'patente',
        sorter: (a, b) => a.patente.localeCompare(b.patente),
    },
    {
        title: 'Nota de Pedido',
        dataIndex: 'pedido',
        sorter: (a, b) => a.pedido.localeCompare(b.pedido),
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
    },
];
