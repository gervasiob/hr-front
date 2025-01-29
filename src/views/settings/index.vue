<template>
    <span>Costos</span>
    <a-upload-dragger v-model:file-list="fileList" name="file" list-type="picture-card" class="avatar-uploader"
        :show-upload-list="true" action="https://dft-back-dev-2484ff5ddb07.herokuapp.com/upload/"
        :before-upload="beforeUpload" @change="handleChange" @drop="handleDrop">
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

</template>

<script>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { LoadingOutlined, InboxOutlined, DownloadOutlined } from '@ant-design/icons-vue';

export default {
    name: 'CostIndex',
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

        function getBase64(img, callback) {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(img);
        }

        const handleChange = info => {
            if (info.file.status === 'uploading') {
                loading.value = true;
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
                message.error('Upload error');
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

        return {
            fileList,
            loading,
            imageUrl,
            handleChange,
            beforeUpload,
            handleDrop,
            downloadFile,
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
</style>
