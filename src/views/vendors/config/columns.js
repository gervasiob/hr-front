import { ASEGURADORAS, TENDER_STATES, PRIORITY_VALUES } from "@/common/common";

export const tableColumns = [
    {
        title: '#',
        dataIndex: 'id',
   
        sorter: (a, b) => a.id - b.id,
        fixed: 'left',
        width: 80,
    },
    {
        title: 'Nombre',
        dataIndex: 'social_name',
        sorter: (a, b) => a.social_name.localeCompare(b.social_name),
        fixed: 'left',
        width: 210,
    },
    {
        title: 'Tipo',
        dataIndex: 'vendor_type',
        fixed: 'left',
        width: 210,
    },
    {
        title: 'Grupo',
        dataIndex: 'type_group',
        fixed: 'left',
        width: 210,
    },
    {
        title: 'Marcas',
        dataIndex: 'marcas',
        fixed: 'left',
        width: 210,
    },
    // {
    //     title: 'Subsidiaria',
    //     dataIndex: 'subsidiary',
    //     sorter: (a, b) => a.subsidiary - b.subsidiary,
    // },
    // {
    //     title: 'CUIT',
    //     dataIndex: 'cuit',
    //     sorter: (a, b) => a.cuit - b.cuit,
    // },
    // {
    //     title: 'e-Mail',
    //     dataIndex: 'mail',
    //     sorter: (a, b) => a.mail - b.mail,
    // },
    // {
    //     title: 'Telefono',
    //     dataIndex: 'phone',
    //     sorter: (a, b) => a.phone - b.phone,
    // },
    // {
    //     title: 'Whatsapp',
    //     dataIndex: 'wapp',
    //     sorter: (a, b) => a.wapp - b.wapp,
    // },
    // {
    //     title: 'Usuario',
    //     dataIndex: 'user',
    //     sorter: (a, b) => a.user - b.user,
    // },
    // {
    //     title: 'Clave',
    //     dataIndex: 'password',
    //     sorter: (a, b) => a.password - b.password,
    // },
    // {
    //     title: 'Dirección',
    //     dataIndex: 'address',
    //     sorter: (a, b) => a.address - b.address,
    // },
    // {
    //     title: 'Cuidad',
    //     dataIndex: 'city',
    //     sorter: (a, b) => a.city - b.city,
    // },
    // {
    //     title: 'Provincia',
    //     dataIndex: 'province',
    //     sorter: (a, b) => a.province - b.province,
    // },
    // {
    //     title: 'Cod. Postal',
    //     dataIndex: 'cp',
    //     sorter: (a, b) => a.cp - b.cp,
    // },
    // {
    //     title: 'Link a Maps',
    //     dataIndex: 'maps_link',
    //     sorter: (a, b) => a.maps_link - b.maps_link,
    // },
    // {
    //     title: 'Porcentaje Adicional',
    //     dataIndex: 'additional_percentage',
    //     sorter: (a, b) => a.additional_percentage - b.additional_percentage,
    // },
    // {
    //     title: 'Monto Adicional',
    //     dataIndex: 'additional_amount',
    //     sorter: (a, b) => a.additional_amount - b.additional_amount,
    // },
    {
        title: 'Fee Margen (%)',
        dataIndex: 'fee_margen',
        sorter: (a, b) => a.fee_margen - b.fee_margen,
        width: 80,
    },
    {
        title: 'Fee Financiero (%)',
        dataIndex: 'fee_financial',
        sorter: (a, b) => a.fee_financial - b.fee_financial,
        width: 80,
    },
    // {
    //     title: 'Estado de Proveedor',
    //     dataIndex: 'vendor_state',
    //     sorter: (a, b) => a.vendor_state - b.vendor_state,
    //     width: 80,
    // },
    // {
    //     title: 'Observación Proveedor',
    //     dataIndex: 'vendor_obs',
    //     sorter: (a, b) => a.vendor_obs - b.vendor_obs,
    // },
    // {
    //     title: 'Observación Producto',
    //     dataIndex: 'product_feedback',
    //     sorter: (a, b) => a.product_feedback - b.product_feedback,
    // },
    {
        title: 'Operation',
        dataIndex: 'operation',
        fixed: 'right',
        width: 100,     
    },
];
