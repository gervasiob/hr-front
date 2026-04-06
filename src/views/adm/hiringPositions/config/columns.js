// src/views/candidates/config/columns.js

export const columns = [
  { title: 'Sub Perfil', field: 'name', sorter: true },
  {
    title: 'Perfil', field: 'primary_profile',
    cast: {
      source: 'primary-profiles/',
      valueField: 'id',
      labelField: 'name',
    },
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
