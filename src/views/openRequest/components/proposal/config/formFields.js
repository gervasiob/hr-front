export const candidateFormFields = [
    // Forma de contratación
    {
      label: 'Forma de contratación',
      field: 'catalog_hiring_types',
      type: 'api-select',
      required: true,
      span: 6,
      endpoint: 'catalog-hiring-types/',
      valueField: 'id',
      nameField: 'name',
    },
  
    // Tipo de búsqueda
    {
      label: 'Tipo de búsqueda',
      field: 'search_types',
      type: 'api-select',
      required: true,
      span: 6,
      endpoint: 'search-types/',
      valueField: 'id',
      nameField: 'name',
    },
  
    // Contrata
    {
      label: 'Contrata',
      field: 'hire_client',
      type: 'api-select',
      required: true,
      span: 6,
      endpoint: 'clients/',
      valueField: 'id',
      nameField: 'name',
    },
  
    // Tope salarial
    {
      label: 'Tope Salarial Bruto',
      field: 'salary_max',
      type: 'input',
      span: 6,
      required: true,
      disabledField: 'disable_salary_max',
    },
    {
      label: 'Sin Tope',
      field: 'disable_salary_max',
      type: 'checkbox',
      span: 3,
    },
  
    // Moneda
    {
      label: 'Moneda',
      field: 'currency',
      type: 'api-select',
      required: true,
      span: 6,
      endpoint: 'currencies/',
      valueField: 'id',
      nameField: 'name',
    },
  
    // Modalidad
    {
      label: 'Modalidad de Jornada',
      field: 'catalog_modalities',
      type: 'api-select',
      required: true,
      span: 6,
      endpoint: 'catalog-modalities/',
      valueField: 'id',
      nameField: 'name',
    },
  
    // Subtipo híbrido (solo si modalidad = híbrido)
    {
      label: 'Modalidad Híbrida',
      field: 'hybrid_type',
      type: 'select',
      span: 6,
      options: [
        { label: '4x1', value: '4x1' },
        { label: '3x2', value: '3x2' },
        { label: '2x3', value: '2x3' },
        { label: '1x4', value: '1x4' },
        { label: 'Otros', value: 'otros' },
      ],
      showIf: {
        field: 'catalog_modalities',
        value: 'hybrid', // ajustá según ID real
      },
    },
  
    // Horario
    {
      label: 'Horario',
      field: 'working_hours',
      type: 'input',
      span: 6,
    },
  
    // Prepaga
    {
      label: 'Prepaga',
      field: 'health_coverage',
      type: 'checkbox',
      span: 3,
    },
    {
      label: 'Empresa de salud',
      field: 'health_company',
      type: 'input',
      span: 6,
      showIf: {
        field: 'health_coverage',
        value: true,
      },
    },
  
    // Zona (solo si no es remoto)
    {
      label: 'Zona de trabajo',
      field: 'work_zone',
      type: 'input',
      span: 6,
      required: true,
      hideIf: {
        field: 'catalog_modalities',
        value: 'remote', // ajustar ID real
      },
    },
  
    // Duración proyecto
    {
      label: 'Duración del proyecto',
      field: 'project_duration',
      type: 'input',
      span: 6,
    },
  
    // Guardias
    {
      label: 'Guardias',
      field: 'guards',
      type: 'select',
      span: 6,
      options: [
        { label: 'Activa', value: 'activa' },
        { label: 'Pasiva', value: 'pasiva' },
      ],
    },
    {
      label: 'Horas',
      field: 'hrs',
      type: 'input',
      span: 4,
    },
    {
      label: 'Turno',
      field: 'shift',
      type: 'select',
      span: 4,
      options: [
        { label: 'Mañana', value: 'mañana' },
        { label: 'Tarde', value: 'tarde' },
        { label: 'Noche', value: 'noche' },
      ],
    },
  
    // Ajustes salariales
    {
      label: 'Ajustes salariales',
      field: 'salary_adjustments_check',
      type: 'checkbox',
      span: 4,
    },
    {
      label: 'Detalle ajustes',
      field: 'salary_adjustments',
      type: 'input',
      span: 8,
      showIf: {
        field: 'salary_adjustments_check',
        value: true,
      },
    },
  
    // Idiomas
    
    {
      label: 'Idioma',
      field: 'search_requests_languages',
      type: 'api-select',
      mode: 'single',
      span: 12,
      required: true,
      endpoint: 'languages/', // <- el endpoint real que usás
      valueField: 'id',
      nameField: 'name',
  },
  {
      label: 'Nivel',
      field: 'language_level',
      type: 'api-select',
      mode: 'single',
      span: 12,
      required: true,
      endpoint: 'written-level/', // <- el endpoint real que usás
      valueField: 'id',
      nameField: 'name',
  },
 
    // {
    //   label: 'Idioma',
    //   field: 'search_requests_languages',
    //   type: 'select',
    //   span: 6,
    //   mode: 'multiple',
    //   options: [
    //     { label: 'Inglés', value: 'ingles' },
    //     { label: 'Chino', value: 'chino' },
    //     { label: 'Portugués', value: 'portugues' },
    //   ],
    // },
    // {
    //   label: 'Nivel',
    //   field: 'language_level',
    //   type: 'select',
    //   span: 6,
    //   options: [
    //     { label: 'Intermedio', value: 'intermedio' },
    //     { label: 'Avanzado', value: 'avanzado' },
    //   ],
    // },
  
    // Beneficios
    {
      label: 'Beneficios y observaciones',
      field: 'benefits',
      type: 'textarea',
      span: 24,
    },
  ];