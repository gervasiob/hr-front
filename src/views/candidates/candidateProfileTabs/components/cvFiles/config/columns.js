// src/views/cvFiles/config/columns.js

export const columns = [
  {
    title: 'Candidato', field: 'candidate_id',
    cast: {
      source: 'candidates/',
      valueField: 'id',
      labelField: 'name',
    },
  },
  {
    title: 'Archivo CV', field: 'original_cv',
  },
  {
    title: 'CV con Formato', field: 'formatted_cv_id',
    cast: {
      source: 'formatted_cvs/',
      valueField: 'id',
      labelField: 'name',
    },
  },
  { title: 'Fecha Actualizado', field: 'uploaded_at', sorter: true },
  { title: 'Activo', field: 'is_active', sorter: true },
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
