// src/views/candidatelanguage/config/columns.js

export const columns = [
  {
    title: 'Institución', field: 'institution_name', sorter: true
  },
  { title: 'Grado Alcanzado', field: 'degree', sorter: true },
  { title: 'Fecha de Inicio', field: 'start_date', sorter: true },
  { title: 'Fecha de Finalización', field: 'end_date', sorter: true },
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
