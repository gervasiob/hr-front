<template>
  <div class="candidates">
    <div class="header">
      <h2>Candidatos</h2>
      <div class="actions">
        <a-button type="primary" @click="openForm(null)">Nuevo Candidato</a-button>
      </div>
    </div>

    <BasicFilter :filter-config="filters" @filter-change="applyFilterParams" />

    <BasicTable :columns="columns" :items="candidates" :loading="loading" @edit="handleEdit" @delete="handleDelete"
      @cv="handleViewCV" @sort-change="handleSort" />

    <a-modal v-model:open="showForm" title="Formulario de Candidato" width="1000px" ok-text="Guardar"
      cancel-text="Cancelar">
      <CandidateForm :id="selectedId" :fields="fields" :model="'candidates'" :on-submit="handleProcessedForm"
        :fetch-data="fetchCandidates" />
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BasicTable from '@/components/BasicTable.vue'
import BasicFilter from '@/components/filters/basicFilters.vue'
import CandidateForm from './components/form.vue'
import { fetch } from '@/api/model/model.js'
import { columns } from './config/columns'
import { filters } from './config/filters'
import { candidateFormFields as fields } from './config/formFields.js'

const router = useRouter()
const loading = ref(false)
const candidates = ref([])
const filterParams = ref({})
const showForm = ref(false)
const selectedId = ref(null)

onMounted(fetchCandidates)

async function fetchCandidates() {
  loading.value = true
  try {
    const baseParams = Object.fromEntries(
      Object.entries(filterParams.value).filter(([_, v]) => v !== null && v !== '')
    )

    const params = ordering.value ? { ...baseParams, ordering: ordering.value } : baseParams

    const data = await fetch('get', 'candidates/', params)
    candidates.value = data.results || data
  } catch (e) {
    console.error('Error al cargar candidatos', e)
  } finally {
    loading.value = false
  }
}

function applyFilterParams(filters) {
  filterParams.value = filters
  fetchCandidates()
}

function openForm(id = null) {
  selectedId.value = id
  showForm.value = true
}

function handleEdit(candidate) {
  openForm(candidate.id)
}

function handleDelete(candidate) {
  console.log('Eliminar candidato', candidate)
  // Confirmación y eliminación real aquí
  try {
    fetch('delete', 'candidates/', null, candidate.id)
    fetchCandidates()
  } catch (e) {
    console.error('Error al eliminar candidato', e) 
  }
}

function handleViewCV(candidate) {
  router.push({ name: 'FormattedCV', params: { candidateId: candidate.id } })
}

async function handleProcessedForm(processedForm) {
  try {
    if (processedForm.id) {
      await fetch('put', 'candidates/', processedForm, processedForm.id)
    } else {
      await fetch('post', 'candidates/', processedForm)
    }
    showForm.value = false
    fetchCandidates()
  } catch (error) {
    console.error('Error al guardar candidato:', error)
  }
}
const ordering = ref(null)

function handleSort(order) {
  ordering.value = order
  fetchCandidates()
}
// async function handleDownloadTemplate() {
//   // Requiere implementación si se necesita
//   console.warn('Descarga de template aún no implementada')
// }
</script>

<style scoped>
.candidates {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0.5%;
}

.actions {
  display: flex;
  gap: 10px;
}
</style>
