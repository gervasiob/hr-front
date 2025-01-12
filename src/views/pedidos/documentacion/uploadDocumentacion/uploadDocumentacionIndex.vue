<template>
    <div class="page">
        <h2>Bienvenido a Neumasur</h2>
        <h4>En la siguiente página le solicitaremos que carge los siguientes documentos</h4>

        <div class="information">
            <a-descriptions class="description-group" :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" bordered
                :labelStyle="{ fontWeight: 'bolder', fontSize: '16px' }" :style="{ padding: '1%' }">
                <a-descriptions-item v-for="field in descriptionFields" :key="field.model" :label="field.label"
                    class="a-descriptions-item">
                    <div class="item-d">
                        {{ getFieldValue(field) }}
                    </div>
                </a-descriptions-item>
            </a-descriptions>
        </div>

        <div v-for="doc in requiredDocuments" :key="doc.id" class="document-upload">
            <h3>{{ doc.name }}</h3>
            <a-upload-dragger v-model:fileList="fileLists[doc.id]" :name="doc.name" class="upload" :multiple="false"
                :custom-request="handleUploadWrapper(doc.id)" list-type="picture-card" :max-count="1"
                :accept="'image/*,.pdf'" @drop="handleDrop">
                <p class="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p class="ant-upload-text">Arrastrar o Clickear para cargar archivo</p>
                <p class="ant-upload-hint"></p>
            </a-upload-dragger>
        </div>
    </div>
</template>

<script>
import { apiVendorDocumentUpload, apiVendorDocumentUploadView, getRequiredDocuments, uploadDocumentFile, vendorUploadDocuments } from '@/api/documentacion/documentacion';
import { getQuotes } from '@/api/quotes/quotes';
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
    name: 'UploadDocuments',
    components: {
        InboxOutlined,
    },
    setup() {
        const descriptionFields = [
            { label: "Nro Siniestro", model: "claim_id" },
            { label: "Nombre", model: "name" },
            { label: "Patente", model: "domain" },
            { label: "Vehículo", model: "vehicle" },
        ];
        const getFieldValue = (field) => {
            // const data = props.dataSource || {};
            const rawValue = field.model in data.value ? data.value[field.model] : 'Sin Datos';
            return field.transform ? field.transform(rawValue) : rawValue;
        };
        const data = ref([]);
        const handleChange = info => {
            const status = info.file.status;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        };
        function handleDrop(e) {
            console.log(e);
        }
        const route = useRoute();
        let claimId = ref(route.params.id);
        const requiredDocuments = ref([]);
        const fileLists = ref({});
        const vendorId = ref(null);
        const quoteId = ref(null);
        const fetchData = async () => {
            try {
                const quote = await getQuotes({ claim_id: claimId.value });
                if (quote.results.length === 0) {
                    return;
                }
                quoteId.value = quote.results[0].id;
                const resRequired = await getRequiredDocuments(null, quoteId.value);
                data.value = {
                    ...resRequired, 
                    claim_id: claimId.value,
                };
                requiredDocuments.value = resRequired.required_documents;
                vendorId.value = resRequired.vendor_id;
                // Inicializar fileLists para cada documento
                requiredDocuments.value.forEach((doc) => {
                    fileLists.value[doc.id] = [];
                });
                const params = {
                    quote_id: quoteId.value,
                }
                const resDocuments = await apiVendorDocumentUploadView('get', params);
                console.log('res doc', resDocuments);
                resDocuments.results.forEach((doc) => {
                    if (fileLists.value[doc.document_type]) {
                        fileLists.value[doc.document_type].push({
                            uid: doc.id, // Identificador único para el archivo
                            name: doc.file_url.split('/').pop(), // Nombre del archivo extraído de la URL
                            status: 'done', // Estado del archivo (ej. 'done' si ya está subido)
                            url: doc.file_url, // URL del archivo
                        });
                    }
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const imageUrl = ref(null);
        const handleUploadWrapper = (docId) => (options) => {
            handleUpload(options, docId);
        };
        const handleUpload = async ({ file, onSuccess, onError }, docId) => {
            if (!docId) {
                onError(new Error("ID del documento no encontrado"));
                return;
            }
            try {

                const response = await uploadDocumentFile(vendorId.value, quoteId.value, docId, file);
                console.log("Subida exitosa:", response);
                imageUrl.value = response.url;
                // Invoca el callback de éxito para informar a Ant Design Vue
                onSuccess(response);
            } catch (error) {
                console.error("Error al subir el archivo:", error);

                // Invoca el callback de error para manejar el fallo
                onError(error);
                window.dispatchEvent(new CustomEvent('message-error', { detail: 'Archivo no guardado: ' + error.response.data.error }));
            } finally {
                fetchData();
            }
        };
        onMounted(() => {
            fetchData();
        })
        return {
            descriptionFields,
            getFieldValue,
            requiredDocuments,
            fileLists,
            handleUploadWrapper,
        }
    }

}
</script>

<style scoped>
.page {
    color: black;
}
</style>