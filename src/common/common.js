export const ASEGURADORAS = [
    { value: '30', label: "ATM" },
    { "value": "46", "label": "CHUBB" },
    { "value": "50", "label": "DIGNA" },
    { "value": "33", "label": "EXPERTA" },
    { "value": "14", "label": "FEDERACION PATRONAL" },
    { "value": "44", "label": "HDI" },
    { "value": "20", "label": "INTEGRITY" },
    { "value": "2", "label": "LA CAJA" },
    { "value": "19", "label": "LA EQUITATIVA" },
    { "value": "21", "label": "LA HOLANDO" },
    { "value": "34", "label": "LA PERSEVERANCIA" },
    { "value": "16", "label": "LA SEGUNDA" },
    { "value": "10", "label": "MERCANTIL ANDINA" },
    { "value": "1", "label": "MERIDIONAL" },
    { "value": "22", "label": "NIVEL" },
    { "value": "4", "label": "PROVINCIA " },
    { "value": "9", "label": "RIVADAVIA" },
    { "value": "11", "label": "SAN CRISTOBAL" },
    { "value": "13", "label": "SMG" },
    { "value": "7", "label": "SURA " },
    { "value": "43", "label": "TRIUNFO" },
    { "value": "42", "label": "VICTORIA" }
];

export const TENDER_STATES = [
    {
        label: 'Adjudicado',
        value: 'A',
        color: 'volcano', // Rojo
        back: '#8FEF9E', //verde
    },
    {
        label: 'Entregado',
        value: 'D',
        color: 'green' // Naranja
    },
    {
        label: 'Evaluado',
        value: 'E',
        color: 'purple',
        back: '#D5BDF0',
    },
    {
        label: 'Cancelado',
        value: 'C',
        color: 'red',
    },
    {
        label: 'Ganado',
        value: 'U',
        color: '#F50085',
    },
    {
        label: 'Rechazado/Sin Resolucion',
        value: 'G',
        color: '#79979B',
    },
    {
        label: 'Documentación Observada',
        value: 'J',
        color: '#2B7D73',
    },
    {
        label: 'Pendiente',
        value: 'N',
        color: 'gold',
        back: '#F0E24A',
    },
    {
        label: 'Solicitud Cambio de Costo',
        value: 'O',
        color: '#789E15',
    },
    {
        label: 'Rechazado',
        value: 'R',
        color: 'default' // Rechazado
    },
    {
        label: 'Adjudicado Pendiente',
        value: 'S',
        color: '#C361CA',
    },
    {
        label: 'Licitado',
        value: 'V',
        color: 'blue'
    },
    {
        label: 'Listo para Licitar',
        value: 'Z',
        color: '#162957'
    },
    {
        label: 'Adjudicado/Rechazado',
        value: 'W',
        color: '#A52A2A',
    },
    {
        label: 'Perdida',
        value: 'LO',
        color: '#C5C308',
        back: '#D9B2C0',

    },
    {
        label: 'Test passed A',
        value: 'Test passed A',
        color: '#C5C308',
        back: '#D9B2C0',

    },
    {
        label: 'Test passed U',
        value: 'Test passed U',
        color: '#C5C308',
        back: '#D9B2C0',

    },
];
export const PRIORITY_VALUES = [
    {
        label: 1,
        value: 1,
        color: 'gold'
    },
    {
        label: 2,
        value: 2,
        color: 'blue'
    },
    {
        label: 3,
        value: 3,
        color: 'green'
    },
];
export const DELIVERY_TIMES = [
    {
        label: 'Inmediata',
        value: 1,
    },
    {
        label: 'Máximo 48hs',
        value: 2,
    },
    {
        label: 'Máximo 7 días',
        value: 3,
    },
    {
        label: 'Máximo 15 días',
        value: 4,
    },
    {
        label: '30 días o más',
        value: 5,
    },
    {
        label: '...',
        value: 18,
    },
];
export const TIRE_BRANDS = [
    { value: 1, label: "BRIDGESTONE" },
    { value: 2, label: "CONTINENTAL" },
    { value: 3, label: "DUNLOP" },
    { value: 4, label: "FATE" },
    { value: 5, label: "FEDERAL" },
    { value: 6, label: "FIRESTONE" },
    { value: 7, label: "BF GOODRICH" },
    { value: 8, label: "GOODYEAR" },
    { value: 9, label: "GT RADIAL" },
    { value: 10, label: "HANKOK" },
    { value: 11, label: "KUMHO" },
    { value: 12, label: "LING LONG" },
    { value: 13, label: "MICHELIN" },
    { value: 14, label: "NEXEN" },
    { value: 15, label: "PIRELLI" },
    { value: 16, label: "ROADSTONE" },
    { value: 17, label: "SUMITOMO" },
    { value: 18, label: "WEST LAKE" },
    { value: 19, label: "YOKOHAMA" },
    { value: 20, label: "CHAMPIRO" },
    { value: 21, label: "MAXXIS" },
    { value: 22, label: "GITI" },
    { value: 23, label: "FIREMAX" },
    { value: 24, label: "SAILUN" },
    { value: 25, label: "MOMO" },
    { value: 26, label: "PACE" },
    { value: 27, label: "TRIANGLE" },
    { value: 28, label: "TORQUE" },
    { value: 29, label: "BOTO TYRES" }
];

export const MODELS = [
    {
        label: 'm1',
        value: 1,
    },
    {
        label: 'm2',
        value: 2,
    },
    {
        label: 'Otro',
        value: 3,
    },
];
export const LLANTA_TYPES = [
    {
        label: 'Llanta de Chapa',
        value: 'CHAPA',
    },
    {
        label: 'Llanta de Aleación',
        value: 'ALEACION',
    },
];
export const TIRE_TREAD = [
    { value: 13, label: "13" },
    { value: 14, label: "14" },
    { value: 15, label: "15" },
    { value: 16, label: "16" },
    { value: 17, label: "17" },
    { value: 18, label: "18" },
    { value: 19, label: "19" },
    { value: 20, label: "20" },
    { value: 24, label: "24" }
];
export const TIRE_HEIGHT = [
    { value: 30, label: "30" },
    { value: 35, label: "35" },
    { value: 40, label: "40" },
    { value: 45, label: "45" },
    { value: 50, label: "50" },
    { value: 55, label: "55" },
    { value: 60, label: "60" },
    { value: 65, label: "65" },
    { value: 70, label: "70" },
    { value: 75, label: "75" },
    { value: 80, label: "80" },
    { value: 85, label: "85" }
];
export const TIRE_WIDTH = [
    { value: 145, label: "145" },
    { value: 155, label: "155" },
    { value: 165, label: "165" },
    { value: 175, label: "175" },
    { value: 185, label: "185" },
    { value: 195, label: "195" },
    { value: 205, label: "205" },
    { value: 215, label: "215" },
    { value: 225, label: "225" },
    { value: 235, label: "235" },
    { value: 245, label: "245" },
    { value: 255, label: "255" },
    { value: 265, label: "265" },
    { value: 275, label: "275" },
    { value: 285, label: "285" },
    { value: 295, label: "295" },
    { value: 305, label: "305" },
    { value: 400, label: "400" },
    { value: 420, label: "420" },
    { value: 540, label: "540" }
];
export const DAYTONAS = [
    { value: 1, businessName: "DAYTONA", completeAddress: "OLAYA 1870", idClaimsProvider: 54049722, virtualOffice: "N" },
    { value: 2, businessName: "DAYTONA", completeAddress: "BOEDO", idClaimsProvider: 54049774, virtualOffice: "S" },
    { value: 3, businessName: "DAYTONA", completeAddress: "AV. DIRECTORIO 1601", idClaimsProvider: 54049732, virtualOffice: "N" }
];
export const QUOTE_DETAILS = [
    { value: 'modelo exacto', label: "Modelo Exacto" },
    { value: 'S', label: "Modelo Similar" },
];
export const GROUPS = [
    { value: 'Neumatico', label: "Neumático" },
    { value: 'Llanta', label: "Llanta" },
    { value: 'Bulones', label: "Bulones" },
    { value: 'Centros', label: "Centros" },
    { value: 'Malacate', label: "Malacate" },
    { value: 'Taza de llanta', label: "Taza de llanta" },
    { value: 'Llave de rueda', label: "Llave de rueda" },
    { value: 'Sensor de presion', label: "Sensor de presión" },
    { value: 'Valvula', label: "Válvula" },
    { value: 'Balanceo', label: "Balanceo" },
    { value: 'Otros', label: "Otros" },
];
export const VENDOR_TYPE = [
    { value: 0, name: 'Proveedor' },
    { value: 1, name: 'Cía Aseguradora' },
    { value: 2, name: 'Sucursal Daytona' },
    { value: 3, name: 'Sedes' },
    { value: 4, name: 'Transporte' },
];
export const YES_NO = [{ value: false, label: 'NO', name: 'NO' }, { value: true, label: 'SI', name: 'SI' }];
export const HAS_IMAGE = [{ value: 'N', label: 'NO', name: 'NO' }, { value: 'S', label: 'SI', name: 'SI' }];
export const BRANDS = [
    { value: 25, label: "ALFA ROMEO" },
    { value: 3, label: "AUDI" },
    { value: 2, label: "BMW" },
    { value: 8, label: "CHEVROLET" },
    { value: 15, label: "CITROEN" },
    { value: 27, label: "DODGE" },
    { value: 1, label: "FIAT" },
    { value: 7, label: "FORD" },
    { value: 11, label: "HYUNDAI" },
    { value: 26, label: "JAGUAR" },
    { value: 20, label: "JEEP" },
    { value: 12, label: "KIA" },
    { value: 24, label: "LEXUS" },
    { value: 22, label: "LAND ROVER" },
    { value: 19, label: "MAZDA" },
    { value: 4, label: "MERCEDES-BENZ" },
    { value: 29, label: "MITSUBISHI" },
    { value: 9, label: "NISSAN" },
    { value: 13, label: "PEUGEOT" },
    { value: 23, label: "PORSCHE" },
    { value: 14, label: "RENAULT" },
    { value: 28, label: "RAM" },
    { value: 16, label: "SUZUKI" },
    { value: 18, label: "SUBARU" },
    { value: 21, label: "TESLA" },
    { value: 5, label: "TOYOTA" },
    { value: 10, label: "VOLKSWAGEN" },
    { value: 19, label: "VOLVO" }
];
