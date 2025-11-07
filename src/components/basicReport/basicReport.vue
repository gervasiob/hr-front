<template>
  <div class="report-container">
    <div class="controls">
      <a-button type="primary" @click="exportPDF">Exportar a PDF</a-button>
    </div>
    <div id="report-content">
      <QuillEditor
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
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import html2pdf from 'html2pdf.js';

const props = defineProps({
  modelValue: { type: String, default: '' },
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
  // Wrap content in a div with default color set to black.
  element.innerHTML = `<div style="color: black;">${content.value}</div>`;
  
  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5], // top, left, bottom, right
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
}
</style>
