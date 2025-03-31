export const vehicleList = [
    { name: 'Ford' },
    { name: 'Chevrolet' },
    { name: 'Toyota' },
];
import { HAS_IMAGE, TENDER_STATES, YES_NO } from "@/common/common";
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
        label: 'Aseguradora',
        name: 'company_name__icontains',
        component: 'a-input',
        model: 'company_name__icontains',
        placeholder: 'Ingrese su búsqueda',
    },
    {
        label: 'Modelo',
        name: 'tender_vehicle',
        component: 'a-input',
        model: 'tender_vehicle',
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
        value: 'N',
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
        name: 'tender_city',
        component: 'a-input',
        model: 'tender_city',
        placeholder: 'Ingrese un valor',
    },
    {
        label: 'Provincia',
        name: 'tender_province',
        component: 'a-input',
        model: 'tender_province',
        placeholder: 'Ingrese un valor',
    },
    {
        label: 'Tiene Imagen',
        name: 'has_image',
        component: 'a-select',
        model: 'has_image',
        placeholder: 'Ingrese su búsqueda',
        options: YES_NO,
        showSearch: false,
    },
]