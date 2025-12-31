export const columns = [
  {
    title: 'Búsqueda',
    field: 'search',
    type: 'button',
    cast: {
      source: 'search-requests/',
      valueField: 'id',
      labelField: 'id',
    },
    buttonConfig: {
      target: '_blank', // Target del enlace (opcional, por defecto: '_self')
      getUrl: (value) => `/pcp/list?id=${value}`, // Función para generar la URL (opcional)
      onClick: (value, record) => { /* función al hacer click */ } // Manejador de click (opcional)
    }
  },
  {
    title: 'Código de búsqueda', field: 'search_code', sorter: true,
    width: 260,
  },
  {
    title: 'Descargar CV',
    field: 'actions',
    operation: {
      slots: true,
      align: 'center',
      width: 160,
      actions: [
        {
          label: '',
          type: 'link',
          event: 'download-cv',
          danger: false,
          icon: 'DownloadOutlined'
        }
      ]
    }
  },
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
  // { title: 'Preselección Comercial', field: 'preselected_commercial', type: 'boolean', sorter: true },
  // { title: 'Preselección Cliente', field: 'preselected_client', type: 'boolean', sorter: true },
  // { title: 'Entrevista Técnica', field: 'technical_interview', type: 'boolean', sorter: true },
  // { title: 'Psicotécnico', field: 'psychotechnical_test', type: 'boolean', sorter: true },
  // { title: 'Oferta Enviada', field: 'offer_sent', type: 'boolean', sorter: true },
  // { title: 'Contratado', field: 'hired', type: 'boolean', sorter: true },
  {
    title: 'Estado Actual',
    field: 'current_status_label',
    operation: {
      slots: true
    }
  },
  {
    title: 'Feedback',
    field: 'feedback',
    operation: {
      slots: true
    }
  },
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
        { label: 'Ver Informe', type: 'link', event: 'open-detail', danger: false },
        { label: 'Eliminar', type: 'link', event: 'delete', danger: true }
      ]
    }
  }
]
