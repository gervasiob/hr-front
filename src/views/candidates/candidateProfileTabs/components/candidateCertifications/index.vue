<template>
  <div class="candidates">
    <a-row style="margin-bottom: 1%">
      <a-col :span="20" style="text-align: left">
        <h3>{{ titleText }}</h3>
      </a-col>
    </a-row>
    <BasicFormItem ref="formItemRef" :fields="fields" :save-endpoint="endpoint" :candidate-id="candidateId" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import BasicFormItem from '@/components/formItem/BasicFormItem.vue'
import { fetch } from '@/api/model/model.js'
import { columns } from './config/columns'

import { candidateFormFields as fields } from './config/formFields.js'
import { Modal, message } from 'ant-design-vue'
import { exportToExcel } from '@/api/model/importExport'

const props = defineProps({
  candidateId: {
    type: [Number, String],
    default: null
  },
  formattedCvId: {
    type: [Number, String],
    default: null
  },
});

const router = useRouter()
const loading = ref(false)
const candidates = ref([])
const filterParams = ref({})
const showForm = ref(false)
const newForm = ref(false)
const formRef = ref(null)
const modalLoading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const selectedId = ref(null)

// config parameters
// config parameters
const titleText = 'Certificaciones'
const itemText = 'Certificación'
const modelName = 'formatted-cv-certifications'
const modelNameSingle = 'formatted-cv-certification'
const endpoint = modelName + '/'

onMounted(async () => {
  await loadCastingLists()
  await fetchQuery()
})

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
      candidate: props.candidateId,
      formattedCv: props.formattedCvId,
      limit,
      offset
    }

    const data = await fetch('get', endpoint, params)
    let result = []

    if ('results' in data && 'count' in data) {
      result = data.results
      totalItems.value = data.count
    } else {
      result = data
      totalItems.value = data.length
    }

    // ⬇️ Casteo de columnas
    candidates.value = result.map(item => {
      const newItem = { ...item }
      columns.forEach(col => {
        if (col.cast) {
          const list = JSON.parse(localStorage.getItem(`cast_${col.cast.source}`) || '[]')
          const found = list.find(el => el[col.cast.valueField] === item[col.field])
          if (found) newItem[col.field] = found[col.cast.labelField]
        }
      })
      return newItem
    })
  } catch (e) {
    console.error('Error al cargar listado', e)
  } finally {
    loading.value = false
  }
}

async function loadCastingLists() {

  const casts = columns
    .filter(col => col.cast)
    .map(col => col.cast.source)

  const uniqueCasts = [...new Set(casts)]

  for (const source of uniqueCasts) {
    if (localStorage.getItem(`cast_${source}`)) {
      localStorage.removeItem(`cast_${source}`)
    }
    const data = await fetch('list', source, {
      valueField: 'id',
      nameField: 'name'
    })
    localStorage.setItem(`cast_${source}`, JSON.stringify(data))

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

function applyFilterParams(filters) {
  filterParams.value = filters
  currentPage.value = 1
  fetchQuery()
}

function openForm(id = null, isNew = true) {
  selectedId.value = id
  showForm.value = true
  newForm.value = isNew
  showForm.value = true
}

function handleEdit(item) {
  openForm(item.id, false)
}

async function handleProcessedForm(processedForm) {
  processedForm = { ...processedForm, candidate: props.candidateId, formatted_cv: props.formattedCvId, }
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
