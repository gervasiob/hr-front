<template>
    <div class="upload-container">
        <h2>Importar Datos</h2>
        <div class="table-selector">
            <a-select v-model:value="selectedTable" placeholder="Select a table" style="width: 200px" show-search
                :filter-option="filterTables" @change="handleTableChange">
                <a-select-option v-for="table in availableTables" :key="table" :value="table">
                    {{ table }}
                </a-select-option>
            </a-select>

            <a-button type="primary" :disabled="!selectedTable" @click="downloadTemplate">
                <template #icon><download-outlined /></template>
                Download Template
            </a-button>
        </div>

        <a-upload-dragger v-model:file-list="fileList" name="file" list-type="picture-card" class="avatar-uploader"
            :show-upload-list="true" :action="importUrl" :before-upload="beforeUpload" @change="handleChange"
            @drop="handleDrop" :disabled="!selectedTable">
            <div v-if="imageUrl">

                <p class="ant-upload-text">Archivo cargado con éxito</p>
                <p class="ant-upload-hint">Puede arrastrar uno nuevo si desea</p>

            </div>
            <div v-else>
                <loading-outlined v-if="loading"></loading-outlined>
                <div v-else>
                    <p class="ant-upload-drag-icon">
                        <inbox-outlined></inbox-outlined>
                    </p>
                    <p class="ant-upload-text">Click o arrastre el archivo al recuadro</p>
                    <p class="ant-upload-hint">Soporta 1 solo archivo en excel o csv</p>
                </div>
            </div>
        </a-upload-dragger>
        <div v-if="errorsList.length > 0" class="error-list">
            <h3>Errores encontrados:</h3>
            <a-list bordered :data-source="errorsList">
                <template #renderItem="{ item }">
                    <a-list-item>
                        <a-list-item-meta :description="`${item}`" />
                    </a-list-item>
                </template>
            </a-list>
        </div>
        <div v-if="errorText" class="error-list">
            <h3>Error encontrado:</h3>
            <span>{{ errorText }}</span>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { LoadingOutlined, InboxOutlined, DownloadOutlined } from '@ant-design/icons-vue';
import { getAvailableTables, downloadTemplate as getTemplate } from '@/api/model/importExport';
import { BASE_URL } from '@/api/apiUrls';
export default {
    name: 'UploadFiles',
    components: {
        LoadingOutlined,
        InboxOutlined,
        DownloadOutlined,
    },
    setup() {
        const fileList = ref([]);
        const loading = ref(false);
        const imageUrl = ref('');
        const downloadFile = ref('');
        const availableTables = ref([]);
        const selectedTable = ref('');

        // Computed import URL based on selected table
        const importUrl = computed(() => {
            return selectedTable.value ? `${BASE_URL}import/${selectedTable.value}/` : '';
        });

        // Fetch available tables on component mount
        async function fetchTables() {
            try {
                const response = await getAvailableTables();
                availableTables.value = response.tables;
            } catch (error) {
                message.error('Error fetching available tables');
            }
        }

        // Handle table selection
        const handleTableChange = (value) => {
            selectedTable.value = value;
        };

        // Download template function
        const downloadTemplate = async () => {
            if (!selectedTable.value) return;

            try {
                loading.value = true;
                const response = await getTemplate(selectedTable.value);

                // Create and trigger download
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${selectedTable.value}_template.xlsx`);
                document.body.appendChild(link);
                link.click();
                link.remove();

                message.success('Template downloaded successfully');
            } catch (error) {
                message.error('Error downloading template ' + error);
            } finally {
                loading.value = false;
            }
        };

        // Call fetchTables on component mount
        onMounted(fetchTables);

        function getBase64(img, callback) {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(img);
        }
        const errorsList = ref([]);
        const errorText = ref(null);
        const handleChange = info => {
            errorsList.value = [];
            errorText.value = null;
            if (info.file.status === 'uploading') {
                loading.value = true;
                return;
            }
            errorsList.value = info.fileList[0].response?.report?.errors || [];
            if (errorsList.length > 0) {
                message.error(`Errores en la importación del archivo.`);
                loading.value = false;
                return;
            }
            if (info.file.status === 'done') {
                // Get this url from response in real world.
                getBase64(info.file.originFileObj, base64Url => {
                    downloadFile.value = 'Archivo Cargado.\nPuede hacer click para descargar el archivo importado'
                    imageUrl.value = base64Url;
                    loading.value = false;
                });
                message.success('Archivo Cargado Exitosamente');
            }
            if (info.file.status === 'error') {
                loading.value = false;
                const response = info.file.response;
                if (response && response.error) {
                    message.error(`Error al subir archivo.`);

                    errorText.value = response.error;
                } else {
                    message.error('Error al subir archivo');
                }
            }
        };

        const beforeUpload = file => {
            const isExcelOrCsv = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.type === 'application/vnd.ms-excel' ||
                file.type === 'text/csv';

            if (!isExcelOrCsv) {
                message.error('Solo se permiten archivos Excel o CSV');
                return false; // Cancela la carga del archivo
            }

            const isLt2M = file.size / 1024 / 1024 < 200;
            if (!isLt2M) {
                message.error('File must be smaller than 200MB!');
                return false; // Cancela la carga del archivo
            }

            return true;
        };

        function handleDrop(e) {
            console.log(e);
        }

        const filterTables = (input, option) => {
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        return {
            fileList,
            loading,
            imageUrl,
            handleChange,
            beforeUpload,
            handleDrop,
            downloadFile,
            availableTables,
            selectedTable,
            handleTableChange,
            downloadTemplate,
            importUrl,
            filterTables,
            errorsList,
            errorText,
        };
    }
};
</script>

<style scoped>
.avatar-uploader>.ant-upload {
    width: 128px;
    height: 128px;
}

.ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
}

h2 {
    color: var(--color-heading);
    margin-bottom: 24px;
}

.table-selector {
    margin-bottom: 24px;
}
</style>
