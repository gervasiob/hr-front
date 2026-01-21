export const columns = [
  { title: 'Nombre', field: 'name', sorter: true },
  { title: 'Nombre en Inglés', field: 'name_eng', sorter: true },
  { title: 'Activo', field: 'active', type: 'boolean', sorter: true },
  {
    title: 'Acciones',
    field: 'actions',
    operation: {
      slots: true,
      align: 'center',
      width: 160,
      actions: [
        { label: 'Editar', type: 'link', event: 'edit', danger: false },
        { label: 'Eliminar', type: 'link', event: 'delete', danger: true }
      ]
    }
  }
]
