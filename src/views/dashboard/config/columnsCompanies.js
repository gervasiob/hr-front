
const customAdjudicated = () => {
   
    return {
        style: {
            textAlign: 'right',
        },
    }
}
const customParticipation = () => {

    return {
        style: {
            textAlign: 'right',
        },
    };
};

const customFormat = () => {

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
        sorter: (a, b) => a.company.localeCompare(b.company),
    },
    {
        title: 'Adjudicado',
        dataIndex: 'adjudicado',
        sorter: (a, b) => a.adjudicado - b.adjudicado,
        customCell: customFormat,
    },
    {
        title: 'Cotizado',
        dataIndex: 'cotizado',
        sorter: (a, b) => a.cotizado - b.cotizado,
        customCell: customFormat,
    },
    {
        title: 'Finalizado',
        dataIndex: 'finalizado',
        sorter: (a, b) => a.finalizado - b.finalizado,
        customCell: customFormat,

    },
    {
        title: 'Pendiente',
        dataIndex: 'pendiente',
        sorter: (a, b) => a.pendiente - b.pendiente,
        customCell: customFormat,
    },
    {
        title: 'Total',
        dataIndex: 'total',
        sorter: (a, b) => a.total - b.total,
        customCell: customFormat,

    },
    {
        title: 'Adjudicado',
        dataIndex: 'adjudicated',
        sorter: (a, b) => a.adjudicated.localeCompare(b.adjudicated),
        customCell: customAdjudicated,

    },
    {
        title: 'Participation',
        dataIndex: 'participation',
        sorter: (a, b) => a.participation.localeCompare(b.participation),
        customCell: customParticipation,
    },

];
