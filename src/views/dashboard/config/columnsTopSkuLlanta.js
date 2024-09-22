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
export const tableColumnsTopSkuLlanta = [
       {
        title: 'SKU',
        dataIndex: 'sku',
        sorter: (a, b) => a.sku - b.sku,
    },
    {
        title: 'Descripcion de la Llanta',
        dataIndex: 'llanta_type',
        // sorter: (a, b) => a.llanta_type - b.llanta_type,
        
    },

];
