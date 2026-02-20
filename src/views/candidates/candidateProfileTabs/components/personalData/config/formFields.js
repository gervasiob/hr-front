// src/views/candidates/config/formFields.js
import dayjs from 'dayjs'
export const candidateFormFields = [
    { label: 'Nombre', field: 'first_name', type: 'input', span: 12, required: true },
    { label: 'Apellido', field: 'last_name', type: 'input', span: 12, required: true },
    { label: 'DNI', field: 'dni', type: 'input', span: 12, required: false },
    { label: 'Fecha de nacimiento', field: 'birth_date', type: 'date', span: 12, required: false },
    {
        label: 'Edad', field: 'age', type: 'input', span: 12, required: false,
        calculateFrom: {
            dependsOn: 'birth_date',
            compute: function (birthDate) {
                const today = dayjs()
                const birth = dayjs(birthDate)
                return birth.isValid() ? today.diff(birth, 'year') : 0
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
    {
        label: 'Email', field: 'email', type: 'input', span: 12, required: true,
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        patternMessage: 'El email no es válido.'
     },
    {
        label: 'Email Alternativo', field: 'alt_email', type: 'input', span: 12,
        pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
        patternMessage: 'El email no es válido.'
     },
    { label: 'Teléfono / Celular', field: 'phone', type: 'input', span: 12, required: true,
              pattern: '^\\d+$',
        patternMessage: 'El teléfono debe comenzar con el signo + seguido de números.'
    },
    {
        label: 'País', field: 'country_fk', type: 'api-select', span: 12, required: true,
        endpoint: 'catalog-countries/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name',      // <- nombre del campo que se usará como `label`
    },
    {
        label: 'Provincia', field: 'province_fk', type: 'api-select', span: 12, required: true,
        endpoint: 'catalog-provinces/', // <- el endpoint real que usás
        valueField: 'id',       // <- nombre del campo que se usará como `value`
        nameField: 'name',      // <- nombre del campo que se usará como `label`

        addField: 'country', // Depende del campo 'profile' y envía el parámetro 'primary_profile'
        dependsOn: 'country_fk',
        dependsParam: 'country',
    },
    { label: 'Zona / Barrio', field: 'zone', type: 'input', span: 12, required: false },
    { label: 'Dirección', field: 'address', type: 'input', span: 12, required: false },
    { label: 'Habilitado para aplicar', field: 'available_to_apply', type: 'switch', span: 12 },
    { label: 'Blacklist', field: 'is_blacklisted', type: 'switch', span: 12 },
    { label: 'Razones de Blacklist', field: 'blacklist_reason', type: 'textarea', span: 24 },
    { label: 'Salario Actual', field: 'current_salary', type: 'input', span: 12 },
    { label: 'Salario Esperado', field: 'expected_salary', type: 'input', span: 12 },
    { label: 'Disponibilidad de Ingreso (días)', field: 'availability_days', type: 'input', span: 12, required: true },
    { label: 'Obra social', field: 'social_insurance', type: 'input', span: 12 },
    { label: 'Bonos', field: 'bonuses', type: 'input', span: 12 },
    { label: 'Capacitaciones', field: 'trainings', type: 'input', span: 12 },
    { label: 'Observaciones', field: 'notes', type: 'textarea', span: 24 },

];
