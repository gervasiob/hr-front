import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Estado',
        key: 'quote_state',
        dataIndex: 'quote_state',
        sorter: (a, b) => a.quote_state.localeCompare(b.quote_state),
        filters: TENDER_STATES.map((item) => ({ text: item.label, value: item.value })),
        onFilter: (value, record) => record.quote_state === value,
    },
    {
        title: 'N° Siniestro',
        dataIndex: 'claim_id',
        key: 'claim_id',
        sorter: (a, b) => a.claim_id - b.claim_id,
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
        dataIndex: 'total_quoted',
        key: 'total_quoted',
        sorter: (a, b) => a.cotizacion - b.cotizacion,

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
        onFilter: (value, record) => record.priority === value,
    },
];
