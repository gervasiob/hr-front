import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Aseguradora',
        dataIndex: 'company_name', // Usamos la nueva propiedad company_name
        key: 'company_name',
        sorter: (a, b) => a.company_name.localeCompare(b.company_name),
        filters: ASEGURADORAS.map((item) => ({ text: item.label, value: item.label })),
        onFilter: (value, record) => record.company_name === value,
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
        key: 'quote_state',
        dataIndex: 'quote_state',
        sorter: (a, b) => a.claim_state.localeCompare(b.claim_state),
        filters: TENDER_STATES.map((item) => ({ text: item.label, value: item.value })),
        onFilter: (value, record) => record.claim_state === value,
    },
    {
        title: 'Agente',
        key: 'agent',
        dataIndex: 'agent',
        sorter: (a, b) => a.agent.localeCompare(b.agent),
        // filters: TENDER_STATES.map((item) => ({ text: item.label, value: item.value })),
        // onFilter: (value, record) => record.claim_state === value,
    },
    {
        title: 'Prioridad',
        key: 'priority',
        dataIndex: 'priority',
        sorter: (a, b) => a.id - b.id,
        sorter: (a, b) => a.priority - b.priority,
        filters: PRIORITY_VALUES.map((item) => ({ text: item.label, value: item.value })),
        onFilter: (value, record) => record.claim_state === value,
    },
    {
        title: 'Ranking',
        key: 'ranking',
        dataIndex: 'ranking',
        sorter: (a, b) => a.ranking - b.ranking,
        // filters: TENDER_STATES.map((item) => ({ text: item.label, value: item.value })),
        // onFilter: (value, record) => record.claim_state === value,
    },
];
