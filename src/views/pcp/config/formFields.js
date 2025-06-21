// src/views/pcp/config/formFields.js
export const candidateFormFields = [
    { label: 'Búsqueda', field: 'code', type: 'input', span: 12, required: true },
    { label: 'Fecha Apertura', field: 'opening_date', type: 'date', span: 12, required: true },
    { label: 'Comercial', field: 'requester', type: 'input', span: 12, required: true },
    {
        label: 'Reclutadores', field: 'recruiter',
        type: 'api-select',
        span: 12,
        required: true,
        mode: 'single',
        endpoint: 'users/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'username',      // <- nombre del campo que se usará como `label`
        addField: 'role',
    },
    { label: 'Cliente', field: 'client', type: 'input', span: 12, required: true },
    {
        label: 'País', field: 'country',
        type: 'api-select', span: 12, 
        required: true,
        mode: 'single',
        endpoint: 'catalog-countries/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'code',      // <- nombre del campo que se usará como `label`
        addField: 'name',
     },
    {
        label: 'Perfil', field: 'profile',
        type: 'api-select',
        span: 12,
        required: true,
        endpoint: 'primary-profiles/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name',      // <- nombre del campo que se usará como `label`
     },
    {
        label: 'Subperfil', field: 'subprofile',
        type: 'api-select',
        span: 12,
        required: true,
        endpoint: 'sub-profiles/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name',      // <- nombre del campo que se usará como `label`
     },
    {
        label: 'Seniority', field: 'seniority',
        type: 'api-select', span: 12,
        required: true,
        mode: 'multiple',
        endpoint: 'seniority-levels/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name',      // <- nombre del campo que se usará como `label`
    },
    {
        label: 'Modalidad', field: 'modality', 
        type: 'api-select', span: 12,
        required: true,
        mode: 'single',
        endpoint: 'catalog-modalities/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name',      // <- nombre del campo que se usará como `label`
    },
    { label: 'Inglés requerido', field: 'english_required', type: 'switch', span: 12 },
    { label: 'Tope salarial', field: 'salary_cap', type: 'input', span: 12 },
    {
        label: 'Tipo contratación', field: 'hiring_type', 
        type: 'api-select',
        span: 12,
        required: true,
        endpoint: 'catalog-hiring-types/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name',      // <- nombre del campo que se usará como `label`
     },
    { label: 'Quién Contrata?', field: 'hired_by', type: 'input', span: 12 },
    { label: 'Homeworking', field: 'homeworking', type: 'switch', span: 12 },
    { label: 'Cobertura médica', field: 'health_coverage', type: 'switch', span: 12 },
    { label: 'Horario laboral', field: 'working_hours', type: 'input', span: 12 },
    { label: 'Duración proyecto', field: 'project_duration', type: 'input', span: 12 },
    { label: 'Ajustes salariales', field: 'salary_adjustments', type: 'input', span: 12 },
    { label: 'Requiere idiomas', field: 'language_requirement', type: 'switch', span: 12 },
    { label: 'Beneficios', field: 'benefits', type: 'textarea', span: 24 },
    {
        label: 'Estado', field: 'current_state', 
        type: 'api-select', span: 12,
        required: true,
        mode: 'single',
        endpoint: 'catalog-search-states/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name',      // <- nombre del campo que se usará como `label`
     },
    { label: 'Reporte cierre', field: 'close_report', type: 'textarea', span: 24 },
    { label: 'Link Informe de Esfuerzo', field: 'effort_report_url', type: 'input', span: 24 },
];
