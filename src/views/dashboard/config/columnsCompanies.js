import { formatCurrency, formatNumber } from '@/utils/utils.js';
const customAdjudicated = (record, index, column) => {
    record.adjudicated = record.adjudicated*100 + "%";
    
    return {
        style: {
            textAlign: 'right',
        },
    }
}
const customParticipation = (record, index, column) => {
    record.participation = record.participation*100 + "%";
    
    return {
        style: {
            textAlign: 'right',
        },
    }
}
const customFormat = (record, index, column) => {

    return {
        style: {
            textAlign: 'right',
        },
    }
}
export const tableColumnsCompanies = [
       {
        title: 'Compañia',
        dataIndex: 'company',
        // sorter: (a, b) => a.company.localeCompare(b.company),
    },
    {
        title: 'Adjudicado',
        dataIndex: 'adjudicado',
        // sorter: (a, b) => a.adjudicado - b.adjudicado,
        customCell: customFormat,
    },
    {
        title: 'Cotizado',
        dataIndex: 'cotizado',
        // sorter: (a, b) => a.cotizado - b.cotizado,
        customCell: customFormat,
    },
    {
        title: 'Finalizado',
        dataIndex: 'finalizado',
        // sorter: (a, b) => a.finalizado - b.finalizado,
        customCell: customFormat,
     
    },
    {
        title: 'Pendiente',
        dataIndex: 'pendiente',
        // sorter: (a, b) => a.pendiente - b.pendiente,
        customCell: customFormat, 
    },
    {
        title: 'Total',
        dataIndex: 'total',
        // sorter: (a, b) => a.total - b.total,
        customCell: customFormat,
   
    },
    {
        title: 'Adjudicado',
        dataIndex: 'adjudicated',
        // sorter: (a, b) => a.adjudicated - b.adjudicated,
        customCell: customAdjudicated,

    },
    {
        title: 'Participation',
        dataIndex: 'participation',
        // sorter: (a, b) => a.participation - b.participation,
        customCell: customParticipation,
    },

];
