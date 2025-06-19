// src/views/pcp/config/filters.js
export const filters = [
    { label: 'Búsqueda', field: 'code', model: 'code', type: 'text', placeholder: 'Buscar por código', span: 8 },
    { label: 'Comercial', field: 'requester', model: 'requester', type: 'text', placeholder: 'Buscar por comercial', span: 8 },
    { label: 'Reclutadores', field: 'recruiter', model: 'recruiter', type: 'text', placeholder: 'Buscar por reclutador', span: 8 },
    { label: 'Cliente', field: 'client', model: 'client', type: 'text', placeholder: 'Buscar por cliente', span: 8 },
    { label: 'País', field: 'country', model: 'country', type: 'select', placeholder: 'Seleccionar país', span: 8 },
    { label: 'Perfil', field: 'profile', model: 'profile', type: 'select', placeholder: 'Seleccionar perfil', span: 8 },
    { label: 'Seniority', field: 'seniority', model: 'seniority', type: 'select', placeholder: 'Seleccionar seniority', span: 8 },
    { label: 'Modalidad', field: 'modality', model: 'modality', type: 'select', placeholder: 'Seleccionar modalidad', span: 8 },
    { label: 'Inglés requerido', field: 'english_required', model: 'english_required', type: 'checkbox', span: 8 },
    { label: 'Homeworking', field: 'homeworking', model: 'homeworking', type: 'checkbox', span: 8 },
    { label: 'Estado', field: 'current_state', model: 'current_state', type: 'select', placeholder: 'Seleccionar estado', span: 8 }
];

