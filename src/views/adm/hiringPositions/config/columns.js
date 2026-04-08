// src/views/candidates/config/columns.js

export const columns = [
  {
    title: 'Perfil', field: 'profile',
    cast: {
      source: 'primary-profiles/',
      valueField: 'id',
      labelField: 'name',
    },
  },
  {
    title: 'Sub Perfil', field: 'subprofile',
    cast: {
      source: 'sub-profiles/',
      valueField: 'id',
      labelField: 'name',
    },
  },
  {
    title: 'Seniority', field: 'seniority',
    cast: {
      source: 'seniority-levels/',
      valueField: 'id',
      labelField: 'name',
    },
  },
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
