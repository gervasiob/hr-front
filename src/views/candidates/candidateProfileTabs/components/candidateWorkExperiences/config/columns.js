// src/views/candidatelanguage/config/columns.js

export const columns = [

  { title: 'Empresa', field: 'company_name', sorter: true },
  { title: 'Puesto', field: 'position_title', sorter: true },
  { title: 'Fecha de Inicio', field: 'start_date', sorter: true },
  { title: 'Fecha de Finalización', field: 'end_date', sorter: true },
  { title: 'Descripción', field: 'description', sorter: true },
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
