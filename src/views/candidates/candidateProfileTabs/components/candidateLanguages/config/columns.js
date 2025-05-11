// src/views/candidatelanguage/config/columns.js

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
    title: 'Idioma', field: 'language_id',
    cast: {
      source: 'languages/',
      valueField: 'id',
      labelField: 'name',
    },
  },
  { title: 'Nivel Escrito', field: 'written_level', sorter: true },
  { title: 'Nivel Oral', field: 'oral_level', sorter: true },
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
