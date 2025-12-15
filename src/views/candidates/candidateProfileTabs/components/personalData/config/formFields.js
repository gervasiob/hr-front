// src/views/candidates/config/formFields.js
import dayjs from 'dayjs'
export const candidateFormFields = [
    { label: 'Nombre', field: 'first_name', type: 'input', span: 12, required: true },
    { label: 'Apellido', field: 'last_name', type: 'input', span: 12, required: true },
    { label: 'DNI', field: 'dni', type: 'input', span: 12, required: false },
    { label: 'Fecha de nacimiento', field: 'birth_date', type: 'date', span: 12, required: false },
    {
        label: 'Edad', field: 'age', type: 'input', span: 12, required: true,
        calculateFrom: {
            dependsOn: 'birth_date',
            compute: function (birthDate) {
                const today = dayjs()
                const birth = dayjs(birthDate)
                return birth.isValid() ? today.diff(birth, 'year') : null
            }
        }
    },
    { label: 'CUIL', field: 'cuil', type: 'input', span: 12, required: false },
    {
        label: 'Género', field: 'gender', type: 'select', span: 12, required: true, options: [
            { label: 'Masculino', value: 'M' },
            { label: 'Femenino', value: 'F' },
            { label: 'Otro', value: 'O' }
        ]
    },
    { label: 'Email', field: 'email', type: 'input', span: 12, required: true },
    { label: 'Email Alternativo', field: 'alt_email', type: 'input', span: 12 },
    { label: 'Teléfono / Celular', field: 'phone', type: 'input', span: 12, required: true,
        rules: {
            name: [{ required: true, message: 'Por favor ingrese un valor', trigger: 'change', }]
        }
     },
    { label: 'Dirección', field: 'address', type: 'input', span: 12, required: true },
    { label: 'Zona / Barrio', field: 'zone', type: 'input', span: 12, required: true },
    { label: 'Provincia', field: 'province', type: 'input', span: 12, required: true },
    { label: 'País', field: 'country', type: 'api-select', span: 12,
        endpoint: 'catalog-countries/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name',      // <- nombre del campo que se usará como `label`
     },
    { label: 'Blacklist', field: 'is_blacklisted', type: 'switch', span: 12 },
    { label: 'Razones de Blacklist', field: 'blacklist_reason', type: 'textarea', span: 24 },
    { label: 'Habilitado para aplicar', field: 'available_to_apply', type: 'switch', span: 12 },
    { label: 'Días habilitado', field: 'availability_days', type: 'input', span: 12 },
    { label: 'Salario Actual', field: 'current_salary', type: 'input', span: 12 },
    { label: 'Salario Esperado', field: 'expected_salary', type: 'input', span: 12 },
    { label: 'Disponibilidad de Ingreso (días)', field: 'availability_days', type: 'input', span: 12 },
    { label: 'Obra social', field: 'social_insurance', type: 'input', span: 12 },
    { label: 'Bonos', field: 'bonuses', type: 'input', span: 12 },
    { label: 'Capacitaciones', field: 'trainings', type: 'input', span: 12 },
    { label: 'Observaciones', field: 'notes', type: 'textarea', span: 24 },


    // Secciones relacionadas
    // {
    //     label: 'Educación', field: 'educations', type: 'table', span: 24, columns: [
    //         { title: 'Institución', dataIndex: 'institution', key: 'institution' },
    //         { title: 'Título', dataIndex: 'degree', key: 'degree' },
    //         { title: 'Año', dataIndex: 'year', key: 'year' }
    //     ]
    // },
    // {
    //     label: 'Experiencia Laboral', field: 'experiences', type: 'table', span: 24, columns: [
    //         { title: 'Empresa', dataIndex: 'company', key: 'company' },
    //         { title: 'Puesto', dataIndex: 'position', key: 'position' },
    //         { title: 'Desde', dataIndex: 'start_date', key: 'start_date' },
    //         { title: 'Hasta', dataIndex: 'end_date', key: 'end_date' }
    //     ]
    // },
    // {
    //     label: 'Certificaciones', field: 'certifications', type: 'table', span: 24, columns: [
    //         { title: 'Nombre', dataIndex: 'name', key: 'name' },
    //         { title: 'Entidad', dataIndex: 'entity', key: 'entity' },
    //         { title: 'Fecha', dataIndex: 'date', key: 'date' }
    //     ]
    // }
];
