export const columns = [
  {
    title: 'Mail del Candidato', field: 'candidate', sorter: true,
    cast: {
      source: 'candidates/',
      valueField: 'id',
      labelField: 'email',
    }, 
   },
  {
    title: 'Reclutador', field: 'recruiter', sorter: true,
    cast: {
      source: 'users/',
      valueField: 'id',
      labelField: 'username',
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
  { title: 'Fecha de Postulación', field: 'applied_date', type: 'datetime', sorter: true },
  { title: 'Preselección Comercial', field: 'preselected_commercial', type: 'boolean', sorter: true },
  { title: 'Preselección Cliente', field: 'preselected_client', type: 'boolean', sorter: true },
  { title: 'Entrevista Técnica', field: 'technical_interview', type: 'boolean', sorter: true },
  { title: 'Psicotécnico', field: 'psychotechnical_test', type: 'boolean', sorter: true },
  { title: 'Oferta Enviada', field: 'offer_sent', type: 'boolean', sorter: true },
  { title: 'Contratado', field: 'hired', type: 'boolean', sorter: true },
  { title: 'Feedback Enviado', field: 'feedback_sent', type: 'boolean', sorter: true },
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
