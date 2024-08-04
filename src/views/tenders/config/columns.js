import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";
import { formatCurrency, formatNumber } from '@/utils/utils.js';
const customCurrencyFormat = (record, index, column) => {
    record.total_quoted = formatCurrency(record.total_quoted)
    return {
        style: {
            textAlign: 'right',
        },
    }
}
export const tableColumns = [
    {
        title: 'Fecha',
        dataIndex: 'claim_date',
        key: 'claim_date',
        sorter: (a, b) => {
            const dateA = new Date(a.claim_date);
            const dateB = new Date(b.claim_date);
            return dateA - dateB; // Devuelve un número negativo, cero o positivo
        },
    },
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Número Siniestro',
        dataIndex: 'claim_id',
        key: 'claim_id',
        sorter: (a, b) => a.claim_id - b.claim_id,
    },
    {
        title: 'Patente',
        dataIndex: 'domain',
        key: 'domain',
        sorter: (a, b) => a.domain.localeCompare(b.domain),
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
        sorter: (a, b) => a.total_quoted - b.total_quoted,
        customCell: customCurrencyFormat,

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
