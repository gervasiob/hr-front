<template>
  <div class="candidates">
    <div class="header">
      <a-row>
        <a-col :span="16" style="text-align: left">
          <h2>{{ titleText }}</h2>
        </a-col>
        <!-- <a-col :span="4" style="text-align: right">
          <a-button type="primary" @click="openForm(null)">Nuevo</a-button>
        </a-col> -->
        <!-- <a-col :span="4" style="text-align: right">
          <a-button type="default" @click="handleDownloadTemplate">
            Descargar listado
          </a-button>
        </a-col> -->
      </a-row>

    </div>

    <BasicFilter :filter-config="filters" :initial-values="filterParams" @filter-change="applyFilterParams" />

    <BasicTable :columns="columns" :items="candidates" :loading="loading" :pagination="pagination" @edit="handleEdit"
      @delete="handleDelete" @cv="handleViewCV" @sort-change="handleSort" @pagination-change="handlePaginationChange"
      @open-detail="handleOpenDetail" @open-candidates="handleOpenCandidates" @add-to-search="handleAddToSearch"
      :read-only="readOnly" />

    <a-modal v-model:open="showForm" title="Formulario" width="1000px" ok-text="Guardar" cancel-text="Cancelar"
      :confirm-loading="modalLoading" @ok="handleModalOk">
      <BasicForm ref="formRef" :id="selectedId" :is-new="newForm" :fields="fields" :model="modelName"
        :on-submit="handleProcessedForm" :fetch-data="fetchQuery" />
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import BasicTable from '@/components/basicTable/basicTable.vue'
import BasicFilter from '@/components/filters/basicFilters.vue'
import BasicForm from '@/components/form/basicForm.vue'
import { fetch } from '@/api/model/model.js'
import { columns } from './config/columns'
import { filters } from './config/filters'
import { candidateFormFields as fields } from './config/formFields.js'
import { Modal, message } from 'ant-design-vue'
import { exportToExcel } from '@/api/model/importExport'
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const props = defineProps({
  candidateId: {
    type: [Number, String],
    default: null
  },
  readOnly: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['refresh-both'])

const router = useRouter()
const loading = ref(false)
const candidates = ref([])
const trackedSearchIds = ref(new Set())
const filterParams = ref({})
const showForm = ref(false)
const selectedId = ref(null)
const newForm = ref(false)
const formRef = ref(null)
const modalLoading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)

// config parameters
const titleText = 'PCP Abiertas'
const itemText = 'Búsqueda'
const modelName = 'search-requests'
const modelNameSingle = 'searchrequest'
const endpoint = modelName + '/'
const route = useRoute();

// Función para aplicar query parameters a los filtros
function applyQueryParamsToFilters() {
  const queryParams = route.query;
  const initialFilters = {};

  // Obtener los campos disponibles en el filtro
  const filterFields = filters.map(filter => filter.field);

  // Aplicar solo los query parameters que corresponden a campos de filtro
  Object.keys(queryParams).forEach(key => {
    if (filterFields.includes(key)) {
      initialFilters[key] = queryParams[key];
    }
  });
  // Si hay filtros iniciales, aplicarlos
  if (Object.keys(initialFilters).length > 0) {
    filterParams.value = initialFilters;
  }
}

onMounted(async () => {
  // Aplicar query parameters a los filtros antes de cargar datos
  applyQueryParamsToFilters();
  await loadCastingLists()
  // await fetchTrackedSearchIds()
  await fetchQuery()
})

async function fetchQuery() {
  loading.value = true;
  await fetchTrackedSearchIds()
  try {
    const baseParams = Object.fromEntries(
      Object.entries(filterParams.value).filter(([_, v]) => v !== null && v !== '')
    );

    const page = currentPage.value || 1;
    const limit = pageSize.value || 10;
    const offset = (page - 1) * limit;
    const orderingParam = ordering.value ? { ordering: ordering.value } : {};
    let current_state = null
    let recruiter = null
    filterParams.value.current_state = 1
    current_state = filterParams.value.current_state

    const params = {
      ...baseParams,
      ...orderingParam,
      limit,
      offset,
      ...route.query,
      current_state: current_state,

    };

    const data = await fetch('get', endpoint, params);
    let result = [];
    if ('results' in data && 'count' in data) {
      result = data.results;
      totalItems.value = data.count;
    } else {
      result = data;
      totalItems.value = data.length;
    }
    // ⬇️ Función auxiliar para casteo robusto
    const castValue = (value, castConfig) => {
      const storedData = localStorage.getItem(`cast_${castConfig.source}`);
      if (!storedData || storedData === 'undefined') {
        console.warn(`No data found in localStorage for cast_${castConfig.source}`);
        return value; // Retornar el valor original si no hay datos
      }

      try {
        const list = JSON.parse(storedData);
        const getLabel = (id) => {
          const found = list.find(el => el[castConfig.valueField] === id);
          return found ? found[castConfig.labelField] : id;
        };
        return Array.isArray(value) ? value.map(getLabel).join(', ') : getLabel(value);
      } catch (error) {
        console.error(`Error parsing localStorage data for cast_${castConfig.source}:`, error);
        return value; // Retornar el valor original en caso de error
      }
    };

    // ⬇️ Mapear resultados con casteo
    const mapped = result.map(item => {
      const newItem = { ...item };
      columns.forEach(col => {
        if (col.cast) {
          newItem[col.field] = castValue(item[col.field], col.cast);
        }
      });
      return newItem;
    });

    // ⬇️ Filtrar búsquedas que ya estén en feedback (search-trackings) del candidato
    if (trackedSearchIds.value && trackedSearchIds.value.size > 0) {
      candidates.value = mapped.filter(item => !trackedSearchIds.value.has(item.id))
    } else {
      candidates.value = mapped
    }
  } catch (e) {
    console.error('Error al cargar listado', e);
  } finally {
    loading.value = false;
  }
}

async function fetchTrackedSearchIds() {
  try {
    if (!props.candidateId) {
      trackedSearchIds.value = new Set()
      return
    }
    const data = await fetch('get', 'search-trackings/', { candidate: props.candidateId, limit: 1000 })
    let list = []
    if (Array.isArray(data)) {
      list = data
    } else if (data && Array.isArray(data.results)) {
      list = data.results
    }
    const ids = list
      .map(it => it?.search)
      .filter(id => id !== null && id !== undefined)
    trackedSearchIds.value = new Set(ids)
  } catch (e) {
    console.warn('No se pudo obtener trackings del candidato para filtrar PCP:', e)
    trackedSearchIds.value = new Set()
  }
}

async function loadCastingLists() {
  const casts = columns
    .filter(col => col.cast)
    .map(col => col.cast.source)

  const uniqueCasts = [...new Set(casts)]

  for (const source of uniqueCasts) {
    try {
      // Limpiar datos previos
      if (localStorage.getItem(`cast_${source}`)) {
        localStorage.removeItem(`cast_${source}`);
      }

      const data = await fetch('list', source, {
        valueField: 'id',
        nameField: 'name'
      });

      // Verificar que data existe y tiene la estructura esperada
      let dataToStore = [];
      if (data && Array.isArray(data)) {
        dataToStore = data;
      } else if (data && data.results && Array.isArray(data.results)) {
        dataToStore = data.results;
      } else {
        console.warn(`No valid data received for source: ${source}`, data);
      }

      localStorage.setItem(`cast_${source}`, JSON.stringify(dataToStore));

    } catch (error) {
      console.error(`Error loading casting list for ${source}:`, error);
      // Guardar array vacío en caso de error para evitar problemas posteriores
      localStorage.setItem(`cast_${source}`, JSON.stringify([]));
    }
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

function reload() {
  currentPage.value = 1
  fetchQuery()
}

defineExpose({ reload })

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
// Funciones a completar
function handleOpenDetail(record) {
  const detail = record.id;
  const url = `/pcp/detail/${detail}`;
  router.push({ name: 'Detalle de Búsqueda', params: { id: detail } });
}
async function handleAddToSearch(record) {
  try {
    // Fecha de hoy en formato YYYY-MM-DD
    const appliedDate = new Date().toISOString().slice(0, 10)

    // Usuario actual desde localStorage
    const recruiterId = localStorage.getItem('user_id')

    // Obtener seniority del candidato
    let seniorityId = null
    if (props.candidateId) {
      const candidateData = await fetch('get', 'candidates/', { id: props.candidateId })
      if (Array.isArray(candidateData) && candidateData.length > 0) {
        seniorityId = candidateData[0]?.seniority ?? null
      } else if (candidateData && candidateData.results && candidateData.results.length > 0) {
        seniorityId = candidateData.results[0]?.seniority ?? null
      }
    }

    const payload = {
      applied_date: appliedDate,
      candidate: props.candidateId,
      feedback_sent: false,
      hired: false,
      offer_sent: false,
      preselected_client: false,
      preselected_commercial: false,
      psychotechnical_test: false,
      recruiter: recruiterId ? Number(recruiterId) : 1,
      search: record?.id ?? '1',
      seniority: seniorityId,
      technical_interview: false,
    }

    await fetch('post', 'search-trackings/', payload)
    message.success('Candidato agregado a la búsqueda correctamente')
    // Actualizar el set local y pedir refresco de ambas tablas
    await fetchTrackedSearchIds()
    await fetchQuery()
    emit('refresh-both')
  } catch (error) {
    console.error('Error al agregar candidato a la búsqueda:', error)
    if (error?.response?.data) {
      const messages = Object.values(error.response.data).flat().join(' ')
      message.error(`Errores: ${messages}`)
    } else {
      message.error('Error inesperado al agregar el candidato')
    }
  }
}
function handleOpenCandidates(record) {
  const detail = record.id;
  const url = `/pcp/candidates/${detail}`;
  router.push({ name: 'DETALLE CANDIDATOS', params: { id: detail } });
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
