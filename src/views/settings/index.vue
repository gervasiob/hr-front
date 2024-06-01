<template>
  <a-upload-dragger
    v-model:file-list="fileList"
    name="file"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    :before-upload="beforeUpload"
    @change="handleChange"
    @drop="handleDrop"
  >
    <div v-if="imageUrl">
      <span>{{ imageUrl }}</span>
    </div>
    <div v-else>
      <loading-outlined v-if="loading"></loading-outlined>
      <div v-else>
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">Click o arrastre el archivo al recuadro</p>
        <p class="ant-upload-hint">
          Soporta 1 solo archivo en excel o csv
        </p>
      </div>
    </div>
  </a-upload-dragger>
</template>

<script>
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { LoadingOutlined } from '@ant-design/icons-vue';

export default {
  name: 'CostIndex',
  components: {
    LoadingOutlined,
  },
  setup() {
    const fileList = ref([]);
    const loading = ref(false);
    const imageUrl = ref('');

    const handleChange = info => {
      if (info.file.status === 'uploading') {
        loading.value = true;
        return;
      }
      if (info.file.status === 'done') {
        // Handle success
        loading.value = false;
      }
      if (info.file.status === 'error') {
        // Handle error
        loading.value = false;
        message.error('Upload error');
      }
    };

    const beforeUpload = file => {
      const isExcelOrCsv =
        file.type ===
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        file.type === 'application/vnd.ms-excel' ||
        file.type === 'text/csv';

      if (!isExcelOrCsv) {
        message.error('Solo se permiten archivos Excel o CSV');
        return false; // Cancel upload
      }

      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('File must be smaller than 2MB!');
        return false; // Cancel upload
      }

      return isExcelOrCsv && isLt2M;
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

