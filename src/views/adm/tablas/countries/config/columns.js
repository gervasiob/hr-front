export const columns = [
  { title: 'Nombre', field: 'name', sorter: true },
  { title: 'Código', field: 'code', sorter: true },
  { title: 'Por defecto', field: 'is_default', type: 'boolean', sorter: true },
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
