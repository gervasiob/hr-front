// src/views/candidatelanguage/config/columns.js

export const columns = [
  {
    title: 'Candidato', field: 'candidate',
    cast: {
      source: 'candidates/',
      valueField: 'id',
      labelField: 'email',
    },
  },
  {
    title: 'Perfil', field: 'primary_profile',
    cast: {
      source: 'primary-profiles/',
      valueField: 'id',
      labelField: 'name',
    },
  },
  {
    title: 'Sub Perfil', field: 'sub_profile',
    cast: {
      source: 'sub-profiles/',
      valueField: 'id',
      labelField: 'name',
    },
  },
  { title: 'Nivel Sr', field: 'seniority', sorter: true },
  { title: 'Trabajo Actual', field: 'current_job', sorter: true },
  { title: 'Años de experiencia', field: 'experience_years', sorter: true },
  { title: 'Skills', field: 'skills_description', sorter: true },
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
