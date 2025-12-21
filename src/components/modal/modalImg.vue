<template>
    <h5>{{ data.sku }} - {{ data.name }}</h5>
    <a-form layout="inline" ref="formRef" :model="formState" @finish="handleFinish" @finishFailed="handleFinishFailed">
        <div class="image-slot">
            <a-upload v-model:file-list="fileList" :custom-request="handleUpload" list-type="picture-card"
                :max-count="1" :accept="'image/jpeg, image/png'">
                <a-button>
                    <upload-outlined></upload-outlined>
                    Agregar Imagen
                </a-button>
            </a-upload>
        </div>
    </a-form>
</template>

<script>
import { uploadProductImage } from '@/api/product/product';
import { reactive, ref, watch } from 'vue';

export default {
    name: 'ModalImg',
    props: {
        formData: {
            type: Object,
            default: () => ({}),
        },
    },
    setup(props, { emit }) {
        const formState = reactive({});
        const data = ref(props.formData.value);
        const fileList = ref([]);
        if (data.value.image) {
            fileList.value.push({
                uid: '-1', // Identificador único para el archivo
                name: 'file', // Nombre del archivo
                status: 'done', // Estado del archivo (done para archivos ya cargados)
                url: data.value.image, // URL del archivo existente
            });
        }
        const formRef = ref(null);
        const handleFinish = () => {
            try {
                // Emite el evento si la validación es exitosa
                emit('form-finish', formState);

                return Promise.resolve(); // Validación exitosa
            } catch (error) {
                console.error('Error en la validación:', error);
                return Promise.reject(); // Validación fallida
            }
        };
        const handleFinishFailed = errors => {
            console.error('errors', errors);
        };
        const imageUrl = ref(null);
        const handleUpload = async ({ file, onSuccess, onError }) => {
            try {
                const response = await uploadProductImage(data.value.id, file);
                imageUrl.value = response.url;
                onSuccess(response);
            } catch (error) {
                console.error("Error al subir el archivo:", error);
                onError(error);
            }
        };
        watch(
            () => props.formData.value,
            (newValue) => {
                // Actualizar `data` con el nuevo valor
                data.value = newValue;
                fileList.value = [];
                if (data.value.image) {
                    fileList.value.push({
                        uid: '-1', // Identificador único para el archivo
                        name: 'file', // Nombre del archivo
                        status: 'done', // Estado del archivo (done para archivos ya cargados)
                        url: data.value.image, // URL del archivo existente
                    });
                }
            },
            { immediate: true } // Para ejecutar inmediatamente al montar el componente
        );
        return {
            formState,
            handleFinish,
            handleFinishFailed,
            data,
            fileList,
            handleUpload,
            formRef,
        }
    }
}
</script>

<style></style>