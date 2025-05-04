// src/views/candidates/config/columns.js

export const columns = [
  { title: 'Perfil', field: 'name', sorter: true },
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
