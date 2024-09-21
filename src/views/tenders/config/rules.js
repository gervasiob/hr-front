const validateNumber = (rule, value) => {
    if (!value) {
        return Promise.resolve(); // Si está vacío, lo maneja la regla 'required'
    }
    // Validar si es un número
    if (!/^\d+$/.test(value)) {
        return Promise.reject('El valor debe ser un número');
    }
    return Promise.resolve();
};
export const formRules = {
    claim_id: [
        { required: true, message: 'Ingrese un valor' },
        { validator: validateNumber, message: 'El valor debe ser un número' }
    ],
    company_id: [
        { required: true, message: 'Ingrese un valor' }
    ],
    quote_state: [
        { required: true, message: 'Ingrese un valor' }
    ],
    add_domain: [
        { required: true, message: 'Ingrese un valor' }
    ],
    chasis: [
        { required: false, message: 'Ingrese un valor' }
    ],
    marca: [
        { required: false, message: 'Ingrese un valor' }
    ],

    add_claim_date: [
        { required: true, message: 'Ingrese un valor' }
    ],

    user: [
        { required: true, message: 'Ingrese un valor' }
    ],
    platform: [
        { required: true, message: 'Ingrese un valor' }
    ],
    brand: [
        {
            required: true,
            message: 'Debe seleccionar opción',
            trigger: 'change',
        },
        // {
        //     min: 3,
        //     max: 5,
        //     message: 'Length should be 3 to 5',
        //     trigger: 'blur',
        // },
    ],
    delivery_time: [
        {
            required: true,
            message: 'Debe seleccionar una opción',
            trigger: 'change',
        },
    ],
    llanta_type: [
        {
            required: true,
            message: 'Debe seleccionar una opción',
            trigger: 'change',
        },
    ],
    original_parts: [
        {
            required: true,
            message: 'Debe seleccionar una opción',
            trigger: 'change',
        },
    ],
    spare_tire_amount: [
        {
            required: true,
            message: 'Debe ingresar un valor',
            trigger: 'change',
        },
    ],
    tire_height: [
        {
            required: true,
            message: 'Debe seleccionar una opción',
            trigger: 'change',
        },
    ],
    tire_model: [
        {
            required: true,
            message: 'Debe seleccionar una opción',
            trigger: 'change',
        },
    ],
    tire_quoted: [
        {
            required: true,
            message: 'Debe ingresar un valor',
            trigger: 'change',
        },
    ],
    tire_tread: [
        {
            required: true,
            message: 'Debe seleccionar una opción',
            trigger: 'change',
        },
    ],
    tire_width: [
        {
            required: true,
            message: 'Debe seleccionar una opción',
            trigger: 'change',
        },
    ],
    obs: [
        {
            required: true,
            message: 'Debe colocar una observación',
            trigger: 'change',
        },
    ],
    date1: [
        {
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
            type: 'object',
        },
    ],
    type: [
        {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
        },
    ],
    resource: [
        {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
        },
    ],
    desc: [
        {
            required: true,
            message: 'Please input activity form',
            trigger: 'blur',
        },
    ],
};