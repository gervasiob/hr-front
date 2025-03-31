
const customCurrencyFormat = (record, index, column) => {
 
    return {
        style: {
            textAlign: 'right',
        },
    }
}
export const tableColumns = [
    {
        title: '#',
        dataIndex: 'id',
        sorter: (a, b) => a.id - b.id,
    },
    {
        title: 'Nombre',
        dataIndex: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
    },

    {
        title: 'Activo',
        dataIndex: 'enable',
    },
    {
        title: 'Valor',
        dataIndex: 'value',
        sorter: (a, b) => a.value - b.value,
    },
    {
        title: 'Estado',
        dataIndex: 'state',
        sorter: (a, b) => a.state.localeCompare(b.state),
    },
    {
        title: 'Descripción',
        dataIndex: 'description',
      
    },
    {
        title: 'Texto',
        dataIndex: 'text',
    },
    {
        title: 'Valores',
        dataIndex: 'values',
    },
    {
        title: 'Operation',
        dataIndex: 'operation',
    },
];
