// src/views/candidates/config/columns.js

export const columns = [
    { title: 'Usuario', field: 'username', sorter: true },
    {
        title: 'Roles', field: 'roles',
        type: 'tag',
        cast: {
            source: 'roles/',
            valueField: 'id',
            labelField: 'name',
        },
    },
    {
        title: 'Acciones',
        field: 'actions',
        operation: {
            slots: true,
            align: 'center',
            width: 160,
            actions: [
                {
                    label: 'Editar',
                    type: 'link',
                    event: 'edit',
                    danger: false
                },
                {
                    label: 'Eliminar',
                    type: 'link',
                    event: 'delete',
                    danger: true
                }
            ]
        }
    }
]
