import { TENDER_STATES } from "@/common/common";
const getValue = (value, list) => {
    const item = list.find((item) => item.value === value);
    return item ? item.label : value;
}
export const generalDescriptionFields = [
    { label: "Nro Siniestro", model: "claim_id" },
    { label: "Compañía", model: "company_name" },
    {
        label: "Estado",
        model: "quote_state",
        transform: (value) => getValue(value, TENDER_STATES),
    },
    { label: "Dominio", model: "domain" },
    { label: "Chasis", model: "chasis" },
    { label: "Marca", model: "brand" },
    { label: "Modelo", model: "vehicle" },
    { label: "Año Vehículo", model: "vehicle_year" },
    { label: "Fecha", model: "claim_date" },
    { label: "Plataforma", model: "platform" },
];