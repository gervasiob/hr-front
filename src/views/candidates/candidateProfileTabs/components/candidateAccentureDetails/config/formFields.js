// src/views/candidateAccentureDetails/config/formFields.js

export const candidateFormFields = [
    {
      label: 'Tarifa por Hora',
      field: 'hourly_rate',
      type: 'input',
      span: 12,
      required: false,
      placeholder: 'Tarifa por Hora trabajada (Bruto*2,1)/160'
    },
    {
      label: 'Gastos de Prepaga',
      field: 'health_insurance_expense',
      type: 'input',
      span: 12,
      required: false,
    },
    {
      label: 'Notas Adicionales',
      field: 'additional_notes',
      type: 'textarea',
      span: 24,
      required: false,
    placeholder: 'Otros datos a tener en cuenta (Ej: Vacaciones Programadas)',
    },
    {
      label: '¿Ex Empleado de Accenture?',
      field: 'is_former_accenture_employee',
      type: 'checkbox',
      span: 12,
      required: false,
      placeholder: 'Detalles',
    },
    {
      label: 'Detalle Ex Accenture',
      field: 'former_accenture_details',
      type: 'textarea',
      span: 12,
      required: false,
      placeholder: 'Detalles',
    },
    {
      label: '¿Trabajó como Subcontratado?',
      field: 'worked_as_contractor_for_accenture',
      type: 'checkbox',
      span: 12,
      required: false,
    },
    {
      label: 'Detalle',
      field: 'accenture_contractor_details',
      type: 'textarea',
      span: 12,
      required: false,
    },
  ];