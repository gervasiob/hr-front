<template>
  <div class="candidates">
    <div class="header">
      <a-row>
        <a-col :span="16" style="text-align: left">
          <h2>{{ titleText }}</h2>
        </a-col>
        <a-col :span="4" style="text-align: right">
          <a-button type="primary" :disabled="onlyView" @click="openForm(null)">Nuevo</a-button>
        </a-col>
        <a-col :span="4" style="text-align: right">
          <a-button type="default" @click="handleDownloadTemplate">
            Descargar listado
          </a-button>
        </a-col>
      </a-row>

    </div>

    <BasicFilter :filter-config="filters" :initial-values="initialFilterValues" @filter-change="applyFilterParams" />

    <BasicTable :columns="columns" :items="candidates" :loading="loading" :pagination="pagination" @edit="handleEdit"
      @delete="handleDelete" @cv="handleViewCV" @sort-change="handleSort" @pagination-change="handlePaginationChange"
      @open-profile="handleOpenProfile" />

    <a-modal v-model:open="showForm" title="Formulario" width="1000px" ok-text="Guardar" cancel-text="Cancelar"
      :confirm-loading="modalLoading" @ok="handleModalOk" :destroyOnClose="true" :maskClosable="false"
      :keyboard="false">

      <BasicForm ref="formRef" :id="selectedId" :is-new="newForm" :fields="fields" :model="modelName"
        :on-submit="handleProcessedForm" :fetch-data="fetchQuery" />
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import BasicTable from '@/components/basicTable/basicTable.vue'
import BasicFilter from '@/components/filters/basicFilters.vue'
import BasicForm from '@/components/form/basicForm.vue'
import { fetch } from '@/api/model/model.js'
import { columns } from './config/columns'
import { filters } from './config/filters'
import { candidateFormFields as fields } from './config/formFields.js'
import { Modal, message } from 'ant-design-vue'
import { exportToExcel, exportToCsv } from '@/api/model/importExport'
import { useAuthStore } from '@/stores/auth';

const router = useRouter()
const loading = ref(false)
const candidates = ref([])
const filterParams = ref({})
const showForm = ref(false)
const selectedId = ref(null)
const newForm = ref(false)
const formRef = ref(null)
const modalLoading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)

// config parameters
const titleText = 'Candidatos'
const itemText = 'Candidato'
const modelName = 'candidates'
const modelNameSingle = 'candidate'
const endpoint = modelName + '/'

const authStore = useAuthStore();
const onlyView = ref(false);
const userRolesArray = localStorage.getItem('roles') || [];
if (userRolesArray.includes('Comercial')) {
  onlyView.value = true;
}

onMounted(() => {
  filterParams.value = { ...initialFilterValues.value }
  fetchQuery()
})


async function fetchQuery() {
  loading.value = true
  try {
    const baseParams = Object.fromEntries(
      Object.entries(filterParams.value).filter(([_, v]) => v !== null && v !== '')
    )

    const page_size = pageSize.value
    const page = (currentPage.value)
    const orderingParam = ordering.value ? { ordering: ordering.value } : {}

    const params = {
      ...baseParams,
      ...orderingParam,
      page_size,
      page
    }

    const data = await fetch('get', endpoint, params)
    if ('results' in data && 'count' in data) {
      candidates.value = data.results
      totalItems.value = data.count
    } else {
      candidates.value = data
      totalItems.value = data.length
    }
  } catch (e) {
    console.error('Error al cargar listado', e)
  } finally {
    loading.value = false
  }
}
const totalItems = ref(0)

const pagination = computed(() => ({
  current: currentPage.value,
  pageSize: pageSize.value,
  total: totalItems.value,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '50', '100'],
  showTotal: total => `Total ${total} registros`
}))
function handlePaginationChange({ page, pageSize: newSize, order }) {
  currentPage.value = page || 1
  pageSize.value = newSize || 10
  if (order !== undefined) {
    ordering.value = order
  }
  fetchQuery()
}

const initialFilterValues = computed(() => {
  return filters.reduce((acc, f) => {
    if (f.defaultValue !== undefined) {
      acc[f.field] = f.defaultValue
    }
    return acc
  }, {})
})

function applyFilterParams(filters) {
  filterParams.value = filters
  currentPage.value = 1
  fetchQuery()
}

function openForm(id = null, isNew = true) {
  selectedId.value = id
  newForm.value = isNew
  showForm.value = true
}

function handleEdit(record) {

  const profileId = record.id;
  const url = `/candidates/candidate-profile/${profileId}`;
  router.push({ name: 'PerfilCandidato', params: { id: profileId }, state: { enableEdit: true } });
  // openForm(candidate.id, false)
}


function handleViewCV(candidate) {
  router.push({ name: 'FormattedCV', params: { candidateId: candidate.id } })
}

async function handleProcessedForm(processedForm) {
  if (processedForm.is_blacklisted && !processedForm.blacklist_reason) {
    message.error('Error: El candidato está en blacklist. Debe completar Razones de Blacklist.')
    return;
  }
  try {
    if (processedForm.id) {
      await fetch('put', endpoint, processedForm, processedForm.id)
    } else {
      const res = await fetch('post', endpoint, processedForm)
      const id = res.id
      const paramsCv =
      {
        ...processedForm,
        candidate: id,
      }
      // Crea el cv en formateo
      const resCv = await fetch('post', 'formatted-cvs/', paramsCv)
      const attitudeList = await fetch('list', 'attitudes/?active=true', { valueField: 'id', nameField: 'name' })
      // Añade la lista de atitudes al formulario
      attitudeList.map(async item => {
        await fetch('post', 'evaluaciones-actitudinales/', { attitude: item.id, comentario: '', puntaje: 0, candidate: id })
      })
      // Abre el perfil del candidato en la tab de perfil
      if (id) {
        router.push({ name: 'PerfilCandidato', params: { id: id }, query: { activeKey: '2' }, state: { enableEdit: true } });
      }
    }
    message.success(itemText + ' guardado correctamente')
    showForm.value = false
    fetchQuery()
  } catch (error) {
    console.error('Error al guardar item:', error)

    // Si error es un objeto con detalles de validación
    if (error.response && error.response.data) {
      const data = error.response.data;
      if (Array.isArray(data)) {
        message.error('No se pudo guardar los datos: ' + data.join(', '));
      } else if (typeof data === 'object') {
        const errorMessages = Object.entries(data).map(([key, value]) => {
          const valStr = Array.isArray(value) ? value.join(' ') : String(value);
          return `${key}: ${valStr}`;
        }).join('; ');
        message.error('No se pudo guardar los datos: ' + errorMessages);
      } else {
        message.error('No se pudo guardar los datos: ' + (error.message || 'Error al guardar los datos'));
      }
    } else {
      message.error('No se pudo guardar los datos: ' + (error.message || 'Error al guardar los datos'));
    }

    // throw error  // Esto permite que el modal no se cierre si hay error
    // No lanzar error para evitar que el componente padre cierre el modal
    return false;
  }
}

const ordering = ref(null)

function handleSort(order) {
  ordering.value = order
  currentPage.value = 1
  fetchQuery()
}
async function handleModalOk() {
  if (formRef.value?.handleSubmit) {
    modalLoading.value = true
    try {
      const result = await formRef.value.handleSubmit()
      if (result === false) {
        return false     // Previene cierre
      }

      showForm.value = false
    } catch (e) {
      console.warn('Error en el form:', e)
      return false       // Previene cierre
    } finally {

      modalLoading.value = false
    }
  }
}


function handleDelete(item) {
  const deleteItem = Object.entries(item)
    .map(([key, value]) => `${key}: ${typeof value === 'string' ? `'${value}'` : value}`)
    .join(', ');
  Modal.confirm({
    title: '¿Estás seguro?',
    content: `¿Querés eliminar el registro "${deleteItem}"?`,
    okText: 'Sí, eliminar',
    cancelText: 'Cancelar',
    okType: 'danger',
    onOk: async () => {
      try {
        await fetch('delete', endpoint, null, item.id)
        message.success('Item eliminado correctamente')
        fetchQuery()
      } catch (e) {
        console.error('Error al eliminar item', e)
        message.error('Error al eliminar item')
      }
    }
  })
}
async function handleDownloadTemplate() {
  try {
    const baseParams = Object.fromEntries(
      Object.entries(filterParams.value).filter(([_, v]) => v !== null && v !== '')
    )

    // const response = await exportToExcel(modelNameSingle, {})
    const response = await exportToCsv('candidates-csv', {file_format:'xlsx'})

    message.success('Archivo descargado correctamente')
  } catch (error) {
    console.error('Error al descargar listado:', error)
    message.error('Ocurrió un error al descargar el listado')
  }
}
// Funciones a completar
function handleOpenProfile(record) {
  const profileId = record.id;
  const url = `/candidates/candidate-profile/${profileId}`;
  router.push({ name: 'PerfilCandidato', params: { id: profileId }, state: { enableEdit: false } });
}
</script>

<style scoped>
.candidates {
  padding: 20px;
}

.header {
  align-items: center;
  margin-bottom: 16px;
  padding: 0.5%;
}

.actions {
  display: flex;
  gap: 10px;
}
</style>
