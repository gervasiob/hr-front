// src/views/candidatelanguage/config/columns.js

export const columns = [

  { title: 'Nombre', field: 'certification_name', sorter: true },
  { title: 'Institución', field: 'institution_name', sorter: true },
  { title: 'Fecha de Emisión', field: 'issue_date', sorter: true },
  { title: 'Fecha de Vencimiento', field: 'expiration_date', sorter: true },
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
