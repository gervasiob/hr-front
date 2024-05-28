import { ASEGURADORAS, TENDER_STATES } from "@/common/common";

export const tableColumns = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Aseguradora',
        dataIndex: 'company',
        key: 'company',
        sorter: (a, b) => a.company.localeCompare(b.company),
        filters: ASEGURADORAS.map((item) => ({ text: item.label, value: item.label })),
        onFilter: (value, record) => record.company === value,
    },
    {
        title: 'Cotización',
        dataIndex: 'cotizacion',
        key: 'cotizacion',
        sorter: (a, b) => a.cotizacion - b.cotizacion,

    },
    {
        title: 'Rentabilidad',
        dataIndex: 'rentabilidad',
        key: 'rentabilidad',
        sorter: (a, b) => a.rentabilidad - b.rentabilidad,

    },
    {
        title: 'Estado',
        key: 'claim_state',
        dataIndex: 'claim_state',
        sorter: (a, b) => a.claim_state.localeCompare(b.claim_state),
        filters: TENDER_STATES.map((item) => ({ text: item.label, value: item.value })),
        onFilter: (value, record) => record.claim_state === value,
    },
];
