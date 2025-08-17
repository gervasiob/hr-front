export const columns = [
  {
    title: 'Forma de Contratación', field: 'contract_type', sorter: true,
    cast: {
      source: 'catalog-hiring-types/',
      valueField: 'id',
      labelField: 'name',
    },
   },
  { title: 'Empresa Contratante', field: 'hiring_company', sorter: true },
  { title: 'Tope Salarial Bruto', field: 'salary_cap', sorter: true },
  { title: 'Homeworking', field: 'homeworking', type: 'boolean', sorter: true },
  { title: 'Prepaga', field: 'health_coverage', type: 'boolean', sorter: true },
  { title: 'Jornada Laboral', field: 'working_hours', sorter: true },
  { title: 'Zona de Trabajo', field: 'work_location', sorter: true },
  { title: 'Duración del Proyecto', field: 'project_duration', sorter: true },
  { title: 'Guardias', field: 'on_call', sorter: true },
  { title: 'Ajustes Salariales', field: 'salary_adjustments', sorter: true },
  { title: 'Idioma Requerido', field: 'language_required', type: 'boolean', sorter: true },
  { title: 'Idioma', field: 'language', sorter: true },
  { title: 'Nivel de Idioma', field: 'language_level', sorter: true },
  { title: 'Otros Beneficios', field: 'other_benefits', sorter: false },
  {
    title: 'Acciones',
    field: 'actions',
    operation: {
      slots: true,
      align: 'center',
      width: 160,
      actions: [
        { label: 'Editar', type: 'link', event: 'edit', danger: false, icon: 'EditOutlined' },
        { label: 'Eliminar', type: 'link', event: 'delete', danger: true, icon: 'DeleteOutlined' }
      ]
    }
  }
]
