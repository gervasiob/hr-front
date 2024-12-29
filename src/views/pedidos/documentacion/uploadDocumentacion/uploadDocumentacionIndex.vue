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

        <div class="documents">
            <a-upload-dragger v-model:fileList="fileList" name="file" class="upload" :multiple="false"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange" @drop="handleDrop">
                <p class="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p class="ant-upload-text">Arrastrar o Clickear para cargar archivo</p>
                <p class="ant-upload-hint">
                </p>
            </a-upload-dragger>
        </div>
    </div>
</template>

<script>
import { InboxOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { ref } from 'vue';

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
            const data =  {};
            const rawValue = field.model in data ? data[field.model] : 'Sin Datos';
            return field.transform ? field.transform(rawValue) : rawValue;
        };
        const fileList = ref([]);
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
        return {
            descriptionFields,
            getFieldValue,
        }
    }

}
</script>

<style scoped>
.page {
    color: black;
}
</style>