// src/views/pcp/config/columns.js

export const columns = [
  {
    title: 'Nombre', field: 'name',
    width: 160,
    sorter: true
  },
  {
    title: 'Valor', field: 'value',
    width: 160,
    sorter: true
  },

  {
    title: 'Acciones',
    field: 'actions',
    operation: {
      slots: true,
      align: 'center',
      width: 160,
      actions: [
        {
          label: 'Editar',
          type: 'link',
          event: 'edit',
          danger: false
        },
        {
          label: 'Eliminar',
          type: 'link',
          event: 'delete',
          danger: true
        }
      ]
    }
  }
]

