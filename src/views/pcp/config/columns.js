// src/views/candidates/config/columns.js

export const columns = [
  { title: 'Nombre', field: 'first_name', sorter: true },
  { title: 'Apellido', field: 'last_name', sorter: true },
  { title: 'Email', field: 'email', sorter: true },
  { title: 'Cuil', field: 'cuil', sorter: true },
  { title: 'Blacklist', field: 'is_blacklisted', type: 'boolean', sorter: true },
  { title: 'Disponible', field: 'available_to_apply', type: 'boolean', sorter: true },
  { title: 'Fecha de actualización', field: 'last_updated', type: 'datetime', sorter: true },
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
        },
        {
          label: 'Ver Perfil',
          type: 'link',
          event: 'open-profile',
          danger: false
        }

      ]
    }
  }
]
