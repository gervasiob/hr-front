// src/views/candidates/config/columns.js

export const columns = [
  { title: 'Key', field: 'key', sorter: true },
  { title: 'Label', field: 'label', sorter: true },
  { title: 'Path', field: 'path', sorter: true },
  { title: 'Nombre', field: 'name', sorter: true },
  { title: 'Título', field: 'title', sorter: true },
  { title: 'Ícono', field: 'icon', sorter: true },
  { title: 'Componente', field: 'component', sorter: true },
  { title: 'Oculto', field: 'hide_in_menu', type: 'boolean', sorter: true },
  { title: 'Órden', field: 'order', sorter: true },
  { title: 'Activo', field: 'is_active', type: 'boolean', sorter: true },
  {
    title: 'Padre', field: 'parent', sorter: true,
    cast: {
      source: 'menu-items/',
      valueField: 'id',
      labelField: 'key',
    },
    
   },
  {
    title: 'Roles', field: 'roles',
    type: 'tag',
    cast: {
      source: 'roles/',
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
