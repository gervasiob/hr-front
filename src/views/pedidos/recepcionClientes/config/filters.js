import { TENDER_STATES, YES_NO } from "@/common/common";
import { getUserList } from "@/api/users/users";
import { ref } from "vue";

const userList = ref([])
userList.value = await getUserList();
const USER_LIST = userList.value.map((item) => {
    return {
        value: item.value,
        label: item.name,
    }
})

export const filters = [
    {
        label: 'Nro Siniestro',
        name: 'claim_id',
        component: 'a-input',
        model: 'claim_id',
        placeholder: 'Ingrese su búsqueda',
    },
    {
        label: 'Modelo',
        name: 'vehicle',
        component: 'a-input',
        model: 'vehicle__icontains',
        placeholder: 'Ingrese su búsqueda',
    },
    {
        label: 'Patente',
        name: 'domain',
        component: 'a-input',
        model: 'domain__icontains',
        placeholder: 'Ingrese un valor',
    },
    {
        label: 'Estado',
        name: 'quote_state',
        component: 'a-select',
        model: 'quote_state',
        placeholder: 'Ingrese su búsqueda',
        options: TENDER_STATES,
        showSearch: true,
        value: 'U',
    },
    {
        label: 'Usuario',
        name: 'user',
        component: 'a-select',
        model: 'user',
        placeholder: 'Ingrese su búsqueda',
        options: USER_LIST,
        showSearch: true,
    },
    {
        label: 'Localidad',
        name: 'city',
        component: 'a-input',
        model: 'city__icontains',
        placeholder: 'Ingrese un valor',
    },
    {
        label: 'Tipo de Mercadería',
        name: 'type',
        component: 'a-input',
        model: 'type__icontains',
        placeholder: 'Ingrese un valor',
    },
    {
        label: 'Envío',
        name: 'fletero',
        component: 'a-select',
        model: 'fletero',
        options: YES_NO,
        value: true,
        visible: false,
    },
    {
        label: 'Recepción Cliente',
        name: 'cliente_recepcion',
        component: 'a-select',
        model: 'checklist_cliente_recepcion',
        options: YES_NO,
        value: false,
    },
]