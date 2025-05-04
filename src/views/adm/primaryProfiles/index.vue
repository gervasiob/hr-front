<template>
  <div class="candidates">
    <div class="header">
      <a-row>
        <a-col :span="16" style="text-align: left">
          <h2>{{ titleText }}</h2>
        </a-col>
        <a-col :span="4" style="text-align: right">
          <a-button type="primary" @click="openForm(null)">Nuevo</a-button>
        </a-col>
        <a-col :span="4" style="text-align: right">
          <a-button type="default" @click="handleDownloadTemplate">
            Descargar listado
          </a-button>
        </a-col>
      </a-row>

    </div>

    <BasicFilter :filter-config="filters" @filter-change="applyFilterParams" />

    <BasicTable :columns="columns" :items="candidates" :loading="loading" :pagination="pagination" @edit="handleEdit"
      @delete="handleDelete" @cv="handleViewCV" @sort-change="handleSort" @pagination-change="handlePaginationChange" />

    <a-modal v-model:open="showForm" title="Formulario" width="1000px" ok-text="Guardar" cancel-text="Cancelar"
      :confirm-loading="modalLoading" @ok="handleModalOk">
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
import { exportToExcel } from '@/api/model/importExport'

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
const titleText = 'Perfiles'
const itemText = 'Perfil'
const modelName = 'primary-profiles'
const modelNameSingle = 'primary-profile'
const endpoint = modelName + '/'


onMounted(fetchQuery)



async function fetchQuery() {
  loading.value = true
  try {
    const baseParams = Object.fromEntries(
      Object.entries(filterParams.value).filter(([_, v]) => v !== null && v !== '')
    )

    const limit = pageSize.value
    const offset = (currentPage.value - 1) * pageSize.value
    const orderingParam = ordering.value ? { ordering: ordering.value } : {}

    const params = {
      ...baseParams,
      ...orderingParam,
      limit,
      offset
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
function handlePaginationChange(paginationInfo) {
  currentPage.value = paginationInfo.current
  pageSize.value = paginationInfo.pageSize
  fetchQuery()
}

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

function handleEdit(candidate) {
  openForm(candidate.id, false)
}


function handleViewCV(candidate) {
  router.push({ name: 'FormattedCV', params: { candidateId: candidate.id } })
}

async function handleProcessedForm(processedForm) {
  try {
    if (processedForm.id) {
      await fetch('put', endpoint, processedForm, processedForm.id)
    } else {
      await fetch('post', endpoint, processedForm)
    }
    message.success(itemText + ' guardado correctamente')
    showForm.value = false
    fetchQuery()
  } catch (error) {
    console.error('Error al guardar item:', error)

    // Si error es un objeto con detalles de validación
    if (error?.response?.data) {
      const messages = Object.values(error.response.data).flat().join(' ')
      message.error(`Errores: ${messages}`)
    } else {
      message.error('Error inesperado al guardar el item')
    }

    throw error  // Esto permite que el modal no se cierre si hay error
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
      await formRef.value.handleSubmit()
      showForm.value = false
    } catch (error) {
      console.warn('Error en el form:', error)
      // Modal no se cierra si hay error
    } finally {
      modalLoading.value = false
    }
  }
}
function handleDelete(item) {
  Modal.confirm({
    title: '¿Estás seguro?',
    content: `¿Querés eliminar el registro "${item}"?`,
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

    const response = await exportToExcel(modelNameSingle, baseParams)

    message.success('Archivo descargado correctamente')
  } catch (error) {
    console.error('Error al descargar listado:', error)
    message.error('Ocurrió un error al descargar el listado')
  }
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
