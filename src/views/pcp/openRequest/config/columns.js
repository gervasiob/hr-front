// src/views/pcp/config/columns.js

export const columns = [
  {
    title: 'Acciones',
    field: 'actions',
    width: 200,
    operation: {
      slots: true,
      align: 'center',
      actions: [
        { label: '', type: 'link', event: 'edit', danger: false, icon: 'EditOutlined' },

        {
          label: '',
          type: 'link',
          event: 'open-detail',
          danger: false,
          icon: 'EyeOutlined'
        },
        {
          label: '',
          type: 'link',
          event: 'open-candidates',
          danger: false,
          icon: 'UnorderedListOutlined'
        },
      ]
    }
  },
  {
    title: 'Búsqueda', field: 'id',
    width: 160,
    sorter: true
  },
  { title: 'Fecha Apertura', field: 'opening_date', type: 'datetime', sorter: true },
  {
    title: 'Comercial', field: 'comerciales',
    cast: {
      source: 'users/',
      valueField: 'id',
      labelField: 'username',
    },
    sorter: true
  },
  // responsable

  {
    title: 'Reclutadores', field: 'recruiter', sorter: true,
    cast: {
      source: 'users/',
      valueField: 'id',
      labelField: 'username',
    },
  },
  // días t
  { title: 'Cliente', field: 'client', sorter: true },
  {
    title: 'País', field: 'country', sorter: true,
    cast: {
      source: 'catalog-countries/',
      valueField: 'id',
      labelField: 'code',
    },
  },
  {
    title: 'Perfil', field: 'profile', sorter: true,
    cast: {
      source: 'primary-profiles/',
      valueField: 'id',
      labelField: 'name',
    },
  },
  {
    title: 'Subperfil', field: 'subprofile', sorter: true,
    cast: {
      source: 'sub-profiles/',
      valueField: 'id',
      labelField: 'name',
    },
  },
  {
    title: 'Seniority', field: 'seniority', sorter: true,
    cast: {
      source: 'seniority-levels/',
      valueField: 'id',
      labelField: 'name',
    },
  },
  {
    title: 'Modalidad', field: 'modality', sorter: true,
    cast: {
      source: 'catalog-modalities/',
      valueField: 'id',
      labelField: 'name',
    },
  },
  { title: 'Inglés requerido', field: 'english_required', type: 'boolean', sorter: true },
  { title: 'Tope salarial', field: 'salary_cap', sorter: true },
  {
    title: 'Tipo contratación', field: 'hiring_type', sorter: true,
    cast: {
      source: 'catalog-hiring-types/',
      valueField: 'id',
      labelField: 'name',
    },
  },
  { title: 'Quién Contrata?', field: 'hired_by', sorter: true },
  // wordpress
  // LinkedinFilled
  // cantidad de personas del mailing
  // pindeed
  // pfacebook
  // entrevistasRealizadas
  { title: 'Link Informe de Esfuerzo', field: 'effort_report_url', sorter: false },
  // tipo de cierre
  // { title: 'Homeworking', field: 'homeworking', type: 'boolean', sorter: true },
  // { title: 'Cobertura médica', field: 'health_coverage', type: 'boolean', sorter: true },
  // { title: 'Horario laboral', field: 'working_hours', sorter: true },
  // { title: 'Duración proyecto', field: 'project_duration', sorter: true },
  // { title: 'Ajustes salariales', field: 'salary_adjustments', sorter: true },
  // { title: 'Requiere idiomas', field: 'language_requirement', type: 'boolean', sorter: true },
  // { title: 'Beneficios', field: 'benefits', sorter: false },
  // { title: 'Estado', field: 'current_state', sorter: true },
  // { title: 'Reporte cierre', field: 'close_report', sorter: false },

  {
    title: 'Acciones',
    field: 'actions',
    width: 200,
    operation: {
      slots: true,
      align: 'center',
      actions: [
        { label: '', type: 'link', event: 'delete', danger: true, icon: 'DeleteOutlined' },

      ]
    }
  }
]

