export const vehicleList = [
    { name: 'Ford' },
    { name: 'Chevrolet' },
    { name: 'Toyota' },
];
import { TENDER_STATES } from "@/common/common";
import { getUserList } from "@/api/users/users";
import { ref } from "vue";
import { filterOption } from "ant-design-vue/es/vc-mentions/src/util";
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
        options: TENDER_STATES, // Aquí pasas la lista de vehículos para el select
        showSearch: true,
    },
    {
        label: 'Usuario',
        name: 'user',
        component: 'a-select',
        model: 'user',
        placeholder: 'Ingrese su búsqueda',
        options: USER_LIST, // Aquí pasas la lista de vehículos para el select
        showSearch: true,
    },
    {
        label: 'Localidad',
        name: 'city',
        component: 'a-input',
        model: 'city__icontains',
        placeholder: 'Ingrese un valor',
    },
]