import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
    {
        title: 'Código',
        dataIndex: 'Sku',
    },
    {
        title: 'Cantidad',
        dataIndex: 'Cantidad',
    },
    {
        title: 'Descripción',
        dataIndex: 'Descripcion',
    },
    {
        title: 'Pr. Unit.',
        dataIndex: 'CostoUnitario',
    },
    {
        title: 'Total',
        dataIndex: 'total',
        render: (text, record) => {
            return record.CostoUnitario * record.Cantidad;
        },
    },
];
