// src/views/pcp/config/columns.js

export const columns = [

  { title: 'Nombre', field: 'name', sorter: true },
  { title: 'Descripción', field: 'description', sorter: true },
  { title: 'Selección por Defecto', field: 'is_default', type: 'boolean', sorter: true },

  {
    title: 'Acciones',
    field: 'actions',
    operation: {
      slots: true,
      align: 'center',
      width: 160,
      actions: [
        { label: 'Editar', type: 'link', event: 'edit', danger: false },
        { label: 'Eliminar', type: 'link', event: 'delete', danger: true },
        { label: 'Ver Detalle', type: 'link', event: 'open-detail', danger: false }
      ]
    }
  }
]

