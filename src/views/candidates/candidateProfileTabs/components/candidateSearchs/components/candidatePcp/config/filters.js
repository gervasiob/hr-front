// src/views/pcp/config/filters.js
export const filters = [
    { label: 'Búsqueda', field: 'id', model: 'id', type: 'text', placeholder: 'Buscar por ID', span: 8 },
    {
        label: 'Comercial', field: 'comerciales', model: 'comerciales', type: 'api-select', placeholder: 'Buscar por comercial', span: 8,
        mode: 'multiple',
        apiSource: {
            endpoint: 'users/',
            valueField: 'id',
            nameField: 'username',
            additionalFilters: {
                roleId: 6
            }
        }
     },
    {
        label: 'Reclutador',
        field: 'recruiter',
        model: 'recruiter',
        mode: 'single',
        type: 'api-select',
        placeholder: 'Seleccionar Reclutador',
        span: 8,
        apiSource: {
            endpoint: 'users/',
            valueField: 'id',
            nameField: 'username'
        }
    },
    
    { label: 'Cliente', field: 'client', model: 'client', type: 'text', placeholder: 'Buscar por cliente', span: 8 },
    {
        label: 'País', field: 'country', model: 'country',
        placeholder: 'Seleccionar país', span: 8,
        type: 'api-select',
        mode: 'single',
        apiSource: {
            endpoint: 'catalog-countries/', // <- el endpoint real que usás
            valueField: 'id',       // <- nombre del campo que se usará como `value`
            nameField: 'code',      // <- nombre del campo que se usará como `label`
            addField: 'name',
        }
    },
    {
        label: 'Perfil', field: 'profile', model: 'profile', type: 'api-select', placeholder: 'Seleccionar perfil', span: 8,
        mode: 'single',
        apiSource: {
            endpoint: 'primary-profiles/', // <- el endpoint real que usás
            valueField: 'id',       // <- nombre del campo que se usará como `value`
            nameField: 'name',      // <- nombre del campo que se usará como `label`
        }

    },
    {
        label: 'Seniority', field: 'seniority', model: 'seniority', type: 'api-select', placeholder: 'Seleccionar seniority', span: 8,
        mode: 'single',
        apiSource: {
            endpoint: 'seniority-levels/', // <- el endpoint real que usás
            valueField: 'id',       // <- nombre del campo que se usará como `value`
            nameField: 'name',      // <- nombre del campo que se usará como `label`
        }

     },
    {
        label: 'Modalidad', field: 'modality', model: 'modality', type: 'api-select', placeholder: 'Seleccionar modalidad', span: 8,
        mode: 'single',
        apiSource: {
            endpoint: 'catalog-modalities/', // <- el endpoint real que usás
            valueField: 'id',       // <- nombre del campo que se usará como `value`
            nameField: 'name',      // <- nombre del campo que se usará como `label`
        }
     },
    {
        label: 'Estado',
        field: 'current_state',
        model: 'current_state',
        mode: 'single',
        type: 'api-select',
        placeholder: 'Seleccionar Perfil',
        span: 8,
        apiSource: {
            endpoint: 'catalog-search-states/',
            valueField: 'id',
            nameField: 'name'
        }
    },
];

