export const modalFields = [
    {
        name: 'name',
        label: 'Plataforma',
        type: 'input',
        default: '',
        rules: {
            name: [{ required: true, message: 'Por favor ingrese la plataforma', trigger: 'change', }]
        }
    },
    {
        name: 'url',
        label: 'URL',
        type: 'input',
        default: null,
    },
    {
        name: 'base_url',
        label: 'Base URL',
        type: 'input',
        default: null,
    },
    {
        name: 'user',
        label: 'Usuario',
        type: 'input',
        default: null,
    },
    {
        name: 'password',
        label: 'Password',
        type: 'input',
        default: null,
    },
    {
        name: 'token',
        label: 'Token',
        type: 'input',
        default: null,
    },
    {
        name: 'fee',
        label: 'Fee',
        type: 'input',
        default: 0,
        rules: {
            fee: [{ required: true, message: 'Por favor un valor numerico. Entre 0 y 1.000', trigger: 'change', },
                {
                    min: 0,
                    max: 1000,
                    message: 'Debe ser un valor entre 0 y 1.000',
                    trigger: 'blur',
                },
            ]
        }
    },
    {
        name: 'cookie',
        label: 'Cookie',
        type: 'select',
        default: false,
        options: [
            { name: 'Sí', value: true },
            { name: 'No', value: false },
        ],
    },
];