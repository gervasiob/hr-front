<template>
  <div class="report-container">
    <div class="controls" v-if="!readOnly">
      <a-button type="primary" @click="exportPDF">Exportar a PDF</a-button>
    </div>
    <div id="report-content">
      <!-- Read-only View -->
      <div v-if="readOnly" class="ql-container ql-snow">
        <div class="ql-editor" v-html="content"></div>
      </div>
      <!-- Editor View -->
      <QuillEditor
        v-else
        theme="snow"
        v-model:content="content"
        contentType="html"
        toolbar="full"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css'; // Import Quill styles
import html2pdf from 'html2pdf.js';

const props = defineProps({
  modelValue: { type: String, default: '' },
  readOnly: { type: Boolean, default: false }, // New prop for read-only mode
});
const emit = defineEmits(['update:modelValue']);

const content = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
  if (val !== content.value) {
    content.value = val;
  }
});

watch(content, (val) => {
  emit('update:modelValue', val);
});

const exportPDF = () => {
  const element = document.createElement('div');
  const styles = `
    <style>
      body { color: black; }
      ul, ol { list-style-position: inside; padding-left: 20px; margin-left: 0; }
      li { margin-bottom: 5px; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background-color: #f2f2f2; }
    </style>
  `;
  element.innerHTML = `${styles}<div>${content.value}</div>`;
  
  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: 'reporte_candidato.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
  };

  html2pdf().from(element).set(opt).save();
};
</script>

<style scoped>
.report-container {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background: #f5f5f5;
}
.controls {
  margin-bottom: 20px;
  text-align: right;
}
#report-content {
  background: white;
  border: 1px solid #ccc;
}
/* When in read-only mode, remove the editor's border */
.ql-container.ql-snow {
  border: none;
}
</style>
