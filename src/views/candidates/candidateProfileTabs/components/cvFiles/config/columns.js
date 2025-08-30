// src/views/cvFiles/config/columns.js

export const columns = [
  { title: 'Fecha Actualizado', field: 'uploaded_at', sorter: true },
  { title: 'Activo', field: 'is_active', type: 'boolean', sorter: true },
  {
    title: 'Archivo CV', field: 's3_url',
  },
  // {
  //   title: 'CV con Formato', field: 'candidate',
  //   cast: {
  //     source: 'formatted-cvs/',
  //     valueField: 'id',
  //     labelField: 'name',
  //   },
  // },
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
