export const columns = [
  { title: 'Descripción del Puesto', field: 'job_description', sorter: false },
  { title: 'Skills Requeridas', field: 'required_skills', sorter: false },
  { title: 'Skills Opcionales', field: 'optional_skills', sorter: false },
  { title: 'Soft Skills', field: 'soft_skills', sorter: false },
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
