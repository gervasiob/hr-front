import { getRoleList } from '@/api/roles/roles.js';
const roleList = await getRoleList();
export const modalFields = [
    {
        name: 'username',
        label: 'Nombre',
        type: 'input',
        default: '',
        rules: {
            username: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
    },
    {
        name: 'email',
        label: 'Mail',
        type: 'input',
        default: '',
    },

    {
        name: 'roles',
        label: 'Rol',
        type: 'select',
        mode: 'multiple',
        default: [],
        options: roleList,
        rules: {
            roles: [{ required: true, message: 'Por favor seleccione un valor', trigger: 'change', },
            ]
        }
    },
];