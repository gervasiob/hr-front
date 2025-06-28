<template>
  <div class="candidates">
    <div class="header">
      <a-row>
        <a-col :span="16" style="text-align: left">
          <h2>{{ titleText + ': ' + searchTitle }}</h2>
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
        :on-submit="handleProcessedForm" :fetch-data="fetchQuery">
        <template #custom-field>
          <clientProposal v-model:selectedId="selectedId" />
          <questionRequired v-model:selectedId="selectedId" />
        </template>
      </BasicForm>
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

import { useRoute } from 'vue-router';
import clientProposal from './components/clientProposal/index.vue'
import questionRequired from './components/questionRequired/index.vue'
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
const titleText = 'PCP DETALLE: ';
const itemText = 'Detalle'
const modelName = 'search-details'
const modelNameSingle = 'search-detail'
const endpoint = modelName + '/'
const route = useRoute();
const id = ref(route.params.id);
const searchTitle = ref('');

onMounted(async () => {
  await loadCastingLists()
  await getSearch()
  await fetchQuery()
})

async function getSearch() {
  try {
    if (id.value) {
      const data = await fetch('get', 'search-requests', { id: id.value });
      if (data && data.length > 0) {
        const { code, client, profile, subprofile } = data[0];
        let profileName = ""
        let subprofileName = ""
        if (profile) {
          const profileData = await fetch('get', 'primary-profiles', { id: profile });
          if (profileData && profileData.length > 0) {
            profileName = profileData[0].name;
          }
        }
        if (subprofile) {
          const subprofileData = await fetch('get', 'sub-profiles', { id: subprofile });
          if (subprofileData && subprofileData.length > 0) {
            subprofileName = subprofileData[0].name;
          }
        }
        searchTitle.value = code + " - " + client +" - " + profileName + " - " + subprofileName ;
       
      }
    }
  } catch (error) {
    
  }
}
async function fetchQuery() {
  loading.value = true;
  try {
    const baseParams = Object.fromEntries(
      Object.entries(filterParams.value).filter(([_, v]) => v !== null && v !== '')
    );

    const page = currentPage.value || 1;
    const limit = pageSize.value || 10;
    const offset = (page - 1) * limit;
    const orderingParam = ordering.value ? { ordering: ordering.value } : {};

    const params = {
      ...baseParams,
      ...orderingParam,
      id: id.value,
      limit,
      offset,
    };

    console.log('Ordering:', ordering.value, 'Page:', page, 'Offset:', offset);

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
      const list = JSON.parse(localStorage.getItem(`cast_${castConfig.source}`) || '[]');
      const getLabel = (id) => {
        const found = list.find(el => el[castConfig.valueField] === id);
        return found ? found[castConfig.labelField] : id;
      };
      return Array.isArray(value) ? value.map(getLabel).join(', ') : getLabel(value);
    };

    // ⬇️ Mapear resultados con casteo
    candidates.value = result.map(item => {
      const newItem = { ...item };
      columns.forEach(col => {
        if (col.cast) {
          newItem[col.field] = castValue(item[col.field], col.cast);
        }
      });
      return newItem;
    });

  } catch (e) {
    console.error('Error al cargar listado', e);
  } finally {
    loading.value = false;
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

    if (!id.value) {
      return;
    }
    processedForm.search = id.value
    if (candidates.value.length > 0) {
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
