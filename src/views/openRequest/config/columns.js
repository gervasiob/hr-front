export const columns = [
  {
    title: 'Comercial',
    field: 'comerciales',
    sorter: true,
    cast: {
      source: 'users/',
      valueField: 'id',
      labelField: 'username'
    }
  },
  {
    title: 'Cliente',
    field: 'client_id',
    sorter: true,
    cast: {
      source: 'clients/',
      valueField: 'id',
      labelField: 'name'
    }
  },
  {
    title: 'Cliente Secundario',
    field: 'second_client_id',
    sorter: true,
    width: 80,
    cast: {
      source: 'clients/',
      valueField: 'id',
      labelField: 'name'
    }
  },
  {
    title: 'Codigo Accenture',
    field: 'codigo',
    sorter: true,
    width: 80
  },

  // {
  //   title: 'Reclutador', field: 'recruiter', sorter: true,
  //   cast: {
  //     source: 'users/',
  //     valueField: 'id',
  //     labelField: 'username',
  //   },
  // },
  // {
  //   title: 'Seniority', field: 'seniority', sorter: true,
  //   cast: {
  //     source: 'seniority-levels/',
  //     valueField: 'id',
  //     labelField: 'name',
  //   },
  // },
  { title: 'Fecha de Postulación', field: 'applied_date', type: 'datetime', sorter: true },
  // { title: 'Preselección Comercial', field: 'preselected_commercial', type: 'boolean', sorter: true },
  // { title: 'Preselección Cliente', field: 'preselected_client', type: 'boolean', sorter: true },
  // { title: 'Entrevista Técnica', field: 'technical_interview', type: 'boolean', sorter: true },
  // { title: 'Psicotécnico', field: 'psychotechnical_test', type: 'boolean', sorter: true },
  // { title: 'Oferta Enviada', field: 'offer_sent', type: 'boolean', sorter: true },
  // { title: 'Contratado', field: 'hired', type: 'boolean', sorter: true },
  // {
  //   title: 'Estado Actual',
  //   field: 'current_status_label',
  //   operation: {
  //     slots: true
  //   }
  // },
  // {
  //   title: 'Feedback',
  //   field: 'feedback',
  //   operation: {
  //     slots: true
  //   }
  // },
  // { title: 'Feedback Enviado', field: 'feedback_sent', type: 'boolean', sorter: true },
  {
    title: 'Acciones',
    field: 'actions',
    operation: {
      slots: true,
      align: 'center',
      width: 160,
      actions: [
        { label: 'Ver', type: 'link', event: 'view-open-request', danger: false, icon: 'eye' },
        { label: 'Editar', type: 'link', event: 'edit', danger: false },
        // { label: 'Feedback', type: 'link', event: 'open-feedback', danger: false },
        // { label: 'Ver Informe', type: 'link', event: 'open-detail', danger: false },
        { label: 'Eliminar', type: 'link', event: 'delete', danger: true }
      ]
    }
  }
];
