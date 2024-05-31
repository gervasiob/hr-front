<template>
    <span>Costos</span>
    <a-upload-dragger
        v-model:file-list="fileList"
        name="avatar"
        list-type="picture-card"
        class="avatar-uploader"
        :show-upload-list="false"
        action="https://dft-back-dev-2484ff5ddb07.herokuapp.com/upload/"
        :before-upload="beforeUpload"
        @change="handleChange"
        @drop="handleDrop"
    >
        <div v-if="imageUrl">
            <span>{{ imageUrl }}</span>
        </div>
        <div v-else>
            <loading-outlined v-if="loading" />
            <div v-else>
                <p class="ant-upload-drag-icon">
                    <inbox-outlined />
                </p>
                <p class="ant-upload-text">Click o arrastre el archivo al recuadro</p>
                <p class="ant-upload-hint">Soporta 1 solo archivo en excel o csv</p>
            </div>
        </div>
    </a-upload-dragger>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { message } from 'ant-design-vue';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';

export default {
    name: 'CostIndex',
    components: {
        PlusOutlined,
        LoadingOutlined,
    },
    setup() {
        const fileList = ref([]);
        const loading = ref(false);
        const imageUrl = ref('');
        const uploadRequests = {};

        const handleChange = info => {
            if (info.file.status === 'uploading') {
                loading.value = true;
                return;
            }
            if (info.file.status === 'done') {
                getBase64(info.file.originFileObj, base64Url => {
                    imageUrl.value = base64Url;
                    loading.value = false;
                });
            }
            if (info.file.status === 'error') {
                loading.value = false;
                message.error('Upload error');
            }
        };

        const beforeUpload = file => {
            const isExcelOrCsv =
                file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                file.type === 'application/vnd.ms-excel' ||
                file.type === 'text/csv';

            if (!isExcelOrCsv) {
                message.error('Solo se permiten archivos Excel o CSV');
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error('El archivo debe ser menor a 2MB');
                return false;
            }
            return isExcelOrCsv && isLt2M;
        };

        function getBase64(img, callback) {
            const reader = new FileReader();
            reader.addEventListener('load', () => callback(reader.result));
            reader.readAsDataURL(img);
        }

        function handleDrop(e) {
            console.log(e);
        }

        function uploadFile(file) {
            const { action, headers, withCredentials, method, name, data } = props;
            const formData = new FormData();
            formData.append(name, file);

            if (typeof data === 'function') {
                Object.keys(data(file)).forEach(key => {
                    formData.append(key, data(file)[key]);
                });
            } else if (typeof data === 'object') {
                Object.keys(data).forEach(key => {
                    formData.append(key, data[key]);
                });
            }

            const xhr = new XMLHttpRequest();
            xhr.open(method || 'POST', action);

            if (withCredentials) {
                xhr.withCredentials = true;
            }

            if (headers) {
                Object.keys(headers).forEach(key => {
                    xhr.setRequestHeader(key, headers[key]);
                });
            }

            xhr.onload = () => {
                if (xhr.status < 200 || xhr.status >= 300) {
                    message.error('Upload failed');
                } else {
                    message.success('Upload successful');
                }
                loading.value = false;
            };

            xhr.onerror = () => {
                message.error('Upload error');
                loading.value = false;
            };

            xhr.upload.onprogress = event => {
                if (event.lengthComputable) {
                    const percentComplete = Math.round((event.loaded / event.total) * 100);
                    console.log(`Upload progress: ${percentComplete}%`);
                }
            };

            loading.value = true;
            xhr.send(formData);
        }

        const handleFilesUpload = files => {
            Array.from(files).forEach(file => {
                if (beforeUpload(file)) {
                    uploadFile(file);
                }
            });
        };

        onMounted(() => {
            // Initialize or fetch any data if needed
        });

        onBeforeUnmount(() => {
            // Cleanup if needed
        });

        return {
            fileList,
            loading,
            imageUrl,
            handleChange,
            beforeUpload,
            handleDrop,
            handleFilesUpload,
        };
    },
};
</script>

<style scoped>
.avatar-uploader > .ant-upload {
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
