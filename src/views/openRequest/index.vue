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
      @open-detail="handleOpenDetail" @open-feedback="handleOpenFeedback" @delete="handleDelete" @cv="handleViewCV"
      @download-cv="handleDownloadCV" @sort-change="handleSort" @pagination-change="handlePaginationChange">

      <template #current_status_label="{ record }">
        <a-tag :color="getStatusColor(record)">
          {{ record.current_status_label }}
        </a-tag>
      </template>

      <template #feedback="{ record }">
        <a-tag :color="getFeedbackColor(record.feedback)">
          {{ record.feedback }}
        </a-tag>
      </template>

    </BasicTable>

    <a-modal v-model:open="showForm" title="Formulario" width="1000px" ok-text="Guardar" cancel-text="Cancelar"
      :confirm-loading="modalLoading" @ok="handleModalOk" :destroy-on-close="true">
      <!-- <BasicForm ref="formRef" :id="selectedId" :is-new="newForm" :fields="fields" :model="modelName"
        :on-submit="handleProcessedForm" :fetch-data="fetchQuery">
      </BasicForm> -->
      <OpenRequestForm ref="formRef" :id="selectedId" :is-new="newForm" :fields="fields" :model="modelName"
        :on-submit="handleProcessedForm" :fetch-data="fetchQuery">
      </OpenRequestForm>
      
    </a-modal>

    <a-modal v-model:open="showDownloadModal" title="Seleccionar Modelo de CV" @ok="confirmDownload"
      @cancel="cancelDownload">
      <a-radio-group v-model:value="downloadOption">
        <a-radio value="ketos" style="display:block; margin-bottom:10px;">
          Modelo Word-Ketos
        </a-radio>
        <a-radio value="ketos-eng" style="display: block; margin-bottom: 10px;">Modelo Word-Ketos versión
          Inglés</a-radio>
        <a-radio value="accenture" style="display:block; margin-bottom:10px;">
          Modelo Accenture
        </a-radio>
        <a-radio value="accenture-eng" style="display:block; margin-bottom:10px;">
          Modelo Accenture versión Inglés
        </a-radio>
        <a-radio value="original" style="display:block; margin-bottom:10px;">
          CV original
        </a-radio>
      </a-radio-group>
    </a-modal>

    <a-modal v-model:open="showFormFeedback" title="Feedback Estado" :footer="null" width="900px" destroyOnClose
      @cancel="closeFeedbackModal">
      <FormFeedback ref="feedbackWizardRef" v-if="selectedFeedbackRecord" :record="selectedFeedbackRecord"
        :totalSteps="feedbackItems.length" :initialStep="currentFeedbackIndex + 1" v-model="feedbackDraft"
        :loading="savingStep" @step-change="onFeedbackStepChange" @finish="saveFeedbackWizard"
        @next-request="handleNextRequest" @prev-request="handlePrevRequest">
        <template v-for="(step, idx) in feedbackItems" :key="step.code"
          v-slot:['step-'+(idx+1)]="{ record, feedback, setFeedbackField }">
          <div style="display:flex; flex-direction:column; gap:12px;">
            <a-alert :message="`Paso ${idx + 1}: ${step.title}`" type="info" show-icon />

            <div>
              <label style="font-weight:600;">Observaciones del proceso</label>
              <a-textarea :rows="4" :value="feedback.process_reason" placeholder="Ingrese observaciones del proceso"
                @change="e => setFeedbackField('process_reason', e.target.value)" />
            </div>

            <div>
              <label style="font-weight:600;">Marcar este paso como completado</label>
              <a-switch :checked="!!feedback[step.code]" @change="checked => setFeedbackField(step.code, checked)" />
              <div style="color:#777; margin-top:6px;">
                Esto actualiza el flag: <b>{{ step.code }}</b>
              </div>
            </div>

            <div style="display:flex; gap:8px; justify-content:flex-end;">
              <a-button @click="closeFeedbackModal">Cerrar</a-button>
            </div>
          </div>
        </template>
      </FormFeedback>

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
import { formFields as fields } from './config/formFields.js'
import { Modal, message } from 'ant-design-vue'
import { exportToExcel, exportToWord } from '@/api/model/importExport'
import FormFeedback from './components/form.vue'
import OpenRequestForm from './components/form.vue'

import { useRoute } from 'vue-router';

const router = useRouter()
const loading = ref(false)
const candidates = ref([])
const filterParams = ref({})
const showForm = ref(false)
const showFormFeedback = ref(false)
const selectedId = ref(null)
const newForm = ref(false)
const newFormFeedback = ref(false)
const formRef = ref(null)
const modalLoading = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)

// config parameters
const titleText = 'SOLICITUD DE APERTURAS: ';
const itemText = 'Solicitud'
const modelName = 'search-requests'
const modelNameSingle = 'search-request'
const endpoint = modelName + '/'
const route = useRoute();
const currentFeedbackIndex = ref(0)
const showDownloadModal = ref(false)
const downloadOption = ref('ketos')

// ---- Feedback modal state ----
const selectedFeedbackRecord = ref(null)
const feedbackDraft = ref({})  // lo que edita el wizard
const feedbackWizardRef = ref(null)
const savingStep = ref(false)

// candidato seleccionado para descargar
const downloadCandidateId = ref(null)
const feedbackItems = ref([
  {
    title: 'Preselección Comercial',
    description: '',
    key: 'is_preselected_commercial',
    code: 'preselected_commercial',
    color: 'cyan'
  },
  {
    title: 'Preselección Cliente',
    description: '',
    key: 'is_preselected_client',
    code: 'preselected_client',
    color: 'blue'
  },
  {
    title: 'Entrevista Técnica',
    description: '',
    key: 'is_technical_interview',
    code: 'technical_interview',
    color: 'geekblue'
  },
  {
    title: 'Psicotécnico',
    description: '',
    key: 'is_psychotechnical',
    code: 'psychotechnical_test',
    color: 'purple'
  },
  {
    title: 'Oferta Enviada',
    description: '',
    key: 'is_offer_sent',
    code: 'offer_sent',
    color: 'orange'
  },
  {
    title: 'Contratado',
    description: '',
    key: 'is_hired',
    code: 'hired',
    color: 'green'
  },
])
const searchTitle = ref('');
const processReason = ref('');

function getStatusColor(record) {
  const item = feedbackItems.value.find(i => i.title === record.current_status_label)
  return item ? item.color : 'default'
}

function getFeedbackColor(status) {
  const colors = {
    'EN PROCESO': 'blue',
    'STAND BY': 'gold',
    'DESCARTADO': 'red'
  }
  return colors[status] || 'default'
}

async function handleStepChange(current) {
  // Logic moved to save
}

onMounted(async () => {
  await loadCastingLists()
  await getSearch()
  await fetchQuery()
})

async function getSearch() {
  try {
    const data = await fetch('get', 'search-requests');
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
      searchTitle.value = code + " - " + client + " - " + profileName + " - " + subprofileName;

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

    const page_size = pageSize.value
    const page = (currentPage.value)
    const orderingParam = ordering.value ? { ordering: ordering.value } : {};

    const params = {
      ...baseParams,
      ...orderingParam,
      page_size,
      page
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
    candidates.value = result.map(item => {
      const newItem = { ...item };
      columns.forEach(col => {
        if (col.cast) {
          newItem[col.field] = castValue(item[col.field], col.cast);
        }
      });

      // Calculate current status label
      const stateIndex = calculateFeedbackState(item, true) // Pass true to avoid UI mutations if needed
      if (feedbackItems.value[stateIndex]) {
        newItem.current_status_label = feedbackItems.value[stateIndex].title
      } else if (stateIndex >= feedbackItems.value.length && feedbackItems.value.length > 0) {
        // All completed
        newItem.current_status_label = feedbackItems.value[feedbackItems.value.length - 1].title
      } else {
        newItem.current_status_label = 'Pendiente'
      }

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

function openForm(id = null, isNew = true) {
  selectedId.value = id
  newForm.value = isNew
  showForm.value = true
  if (isNew) {
    processReason.value = ''
    currentFeedbackIndex.value = 0
    feedbackItems.value.forEach(item => item.status = 'wait')
  }
}

function openFormFeedback(record, isNew = true) {
  selectedFeedbackRecord.value = record
  newFormFeedback.value = isNew
  showFormFeedback.value = true

  // si querés hidratar desde el record, acá:
  feedbackDraft.value = {
    process_reason: record?.process_reason || '',
    // podés guardar también decisión/score/etc si ya existen
    decision: record?.feedback || null,
  }

  // setear el step actual según tus flags
  const stateIndex = calculateFeedbackState(record, true)
  currentFeedbackIndex.value = stateIndex
}


function handleEdit(candidate) {
  const stateIndex = calculateFeedbackState(candidate)
  currentFeedbackIndex.value = stateIndex
  processReason.value = candidate.process_reason || ''
  openForm(candidate.id, false)
}

function handleOpenFeedback(record) {
  openFormFeedback(record, false)
}

function calculateFeedbackState(candidate, dryRun = false) {
  // Resetear estados
  if (!dryRun) {
    feedbackItems.value.forEach(item => {
      item.status = 'wait'
    })
  }

  let lastTrueIndex = -1

  // Determinar cuáles están completos
  for (let i = 0; i < feedbackItems.value.length; i++) {
    const item = feedbackItems.value[i]
    if (candidate[item.code]) {
      if (!dryRun) item.status = 'finish'
      lastTrueIndex = i
    }
  }

  // Si encontramos el último completado, el siguiente es el actual (process)
  // O si todos son falsos, el primero es process

  const nextIndex = lastTrueIndex + 1
  if (nextIndex < feedbackItems.value.length) {
    if (!dryRun) feedbackItems.value[nextIndex].status = 'process'
    return nextIndex
  } else {
    // Todos completados
    return lastTrueIndex
  }
}


function handleViewCV(candidate) {
  router.push({ name: 'FormattedCV', params: { candidateId: candidate.id } })
}

async function handleProcessedForm(processedForm) {
  try {

    if (!selectedId.value) {
      return;
    }

    // Add selected step status
    if (feedbackItems.value[currentFeedbackIndex.value]) {
      const step = feedbackItems.value[currentFeedbackIndex.value];
      // Ensure we set the corresponding field to true
      // Assuming we want to update the field corresponding to the selected step
      // We might want to clear others? Or is it cumulative?
      // Usually steps imply progression, so previous ones remain true.
      // But here we are just setting one flag based on selection.
      if (step.code) {
        processedForm[step.code] = true;
      }
    }

    processedForm.process_reason = processReason.value;

    if (!newForm.value) {
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
  const url = `/pcp/candidates/reports/${detail}`;
  router.push({ name: 'INFORME', params: { id: detail } });
}
async function handleDownloadCV(record) {
  try {
    // 1) Resolver candidateId desde el record
    // OJO: vos estás haciendo fetch por email: { email: record.candidate }
    // Eso sugiere que record.candidate contiene un email.
    const candidateResp = await fetch('get', 'candidates/', { email: record.candidate });

    if (!candidateResp || candidateResp.length === 0) {
      message.warning('No se encontró el candidato.');
      return;
    }

    // 2) Guardar el candidateId y abrir modal
    downloadCandidateId.value = candidateResp[0].id;
    downloadOption.value = 'ketos';
    showDownloadModal.value = true;

  } catch (error) {
    console.error('Error preparando descarga CV:', error);
    message.error('Error al preparar la descarga del CV');
  }
}


function downloadFromUrl(url, filename = 'cv-original') {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank'; // por si S3 fuerza abrir en nueva pestaña
  a.rel = 'noopener';

  // Si el bucket/headers permiten download, esto sugiere nombre:
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  a.remove();
}
function closeFeedbackModal() {
  showFormFeedback.value = false
  selectedFeedbackRecord.value = null
  feedbackDraft.value = {}

  // 🔄 refrescar tabla (re-ejecuta el search actual con filtros/paginación)
  fetchQuery()
}

function onFeedbackStepChange(stepNumber) {
  // stepNumber arranca en 1
  currentFeedbackIndex.value = stepNumber - 1
}

// Este es el "guardar" real cuando el wizard termina
async function saveFeedbackWizard({ record, feedback }) {
  try {
    // Armamos payload a guardar en search-trackings
    // Importante: tu backend espera campos tipo:
    // preselected_commercial, preselected_client, technical_interview, etc (según step.code)
    const payload = {
      id: record.id,
      process_reason: feedback.process_reason || '',
    }

    // Copiamos flags de steps (uno por code)
    feedbackItems.value.forEach(s => {
      if (feedback[s.code] !== undefined) payload[s.code] = !!feedback[s.code]
    })

    // Si querés: también podrías setear feedback/feedback_sent, etc
    // payload.feedback = ...
    // payload.feedback_sent = true

    await fetch('put', endpoint, payload, record.id)

    message.success('Feedback guardado correctamente')
    closeFeedbackModal()
    fetchQuery()
  } catch (e) {
    console.error('Error guardando feedback wizard', e)
    message.error('Error al guardar feedback')
  }
}


async function persistFeedbackStep(record, feedback) {
  const payload = {
    id: record.id,
    search: record._raw?.search ?? record.search, // required
    process_reason: feedback.process_reason || '',
  }

  feedbackItems.value.forEach(s => {
    if (feedback[s.code] !== undefined) payload[s.code] = !!feedback[s.code]
  })

  await fetch('put', endpoint, payload, record.id)
}


async function handleNextRequest(currentStep1Based) {
  if (savingStep.value) return
  savingStep.value = true

  try {
    const idx = currentStep1Based - 1
    const step = feedbackItems.value[idx]
    if (!step) return

    // 1) marcar el step actual como completado
    feedbackDraft.value = {
      ...feedbackDraft.value,
      [step.code]: true,
    }

    // 2) persistir (incluyendo search requerido)
    await persistFeedbackStep(selectedFeedbackRecord.value, feedbackDraft.value)

    // 3) si guardó OK, avanzar
    feedbackWizardRef.value?.goNext()

    message.success(`Guardado: ${step.title}`)
  } catch (e) {
    console.error('Error guardando step (next)', e)
    message.error('No se pudo guardar. No se avanzó.')
  } finally {
    savingStep.value = false
  }
}


async function handlePrevRequest(currentStep1Based) {
  if (savingStep.value) return
  savingStep.value = true

  try {
    const idx = currentStep1Based - 1
    const step = feedbackItems.value[idx]
    if (!step) return

    // 1) marcar step actual como false
    feedbackDraft.value = {
      ...feedbackDraft.value,
      [step.code]: false,
    }

    // 2) persistir
    await persistFeedbackStep(selectedFeedbackRecord.value, feedbackDraft.value)

    message.success(`Revertido: ${step.title}`)

    // 3) retroceder
    feedbackWizardRef.value?.goPrev()
  } catch (e) {
    console.error('Error guardando step (prev)', e)
    message.error('No se pudo revertir el paso. No se retrocedió.')
  } finally {
    savingStep.value = false
  }
}


async function confirmDownload() {
  try {
    const candidateId = downloadCandidateId.value;

    if (!candidateId) {
      showDownloadModal.value = false;
      message.warning('No hay candidato seleccionado para descargar.');
      return;
    }

    // ✅ 1) CV original (desde S3)
    if (downloadOption.value === 'original') {
      const cvFiles = await fetch('get', 'cv-files/', {
        candidate: candidateId,
        is_active: true,
        // si tu API soporta ordering:
        // ordering: '-uploaded_at',
      });

      if (!cvFiles || cvFiles.length === 0) {
        showDownloadModal.value = false;
        message.warning('El candidato no tiene un CV original activo.');
        return;
      }

      const file = cvFiles[0];

      if (!file?.s3_url) {
        showDownloadModal.value = false;
        message.warning('El CV original activo no tiene URL de descarga (s3_url).');
        return;
      }

      showDownloadModal.value = false;

      const nameFromKey =
        file.s3_key?.split('/').pop()?.split('?')[0] || `cv-original-${candidateId}`;

      downloadFromUrl(file.s3_url, nameFromKey);
      message.success('Descarga iniciada');
      return;
    }

    // ✅ 2) CV formateado (Ketos / Accenture)
    const formatted = await fetch('get', 'formatted-cvs/', { candidate: candidateId });

    if (!formatted || formatted.length === 0) {
      showDownloadModal.value = false;
      message.warning('El candidato no tiene un CV formateado creado.');
      return;
    }

    const formattedCvId = formatted[0].id;

    let endpoint = '';
    if (downloadOption.value === 'ketos') {
      endpoint = `formatted-cv/${formattedCvId}/word-ketos`;
    } else if (downloadOption.value === 'ketos-eng') {
      endpoint = `formatted-cv/${formattedCvId}/word-ketos/english`;
    }
    else if (downloadOption.value === 'accenture-eng') {
      endpoint = `formatted-cv/${formattedCvId}/word/accenture/english`;
    }
    else {
      endpoint = `formatted-cv/${formattedCvId}/word/accenture`;
    }

    showDownloadModal.value = false;
    await exportToWord(endpoint, {});
    message.success('Archivo descargado correctamente');

  } catch (error) {
    console.error('Error al descargar:', error);
    message.error('Error al descargar el archivo');
  }
}
function cancelDownload() {
  showDownloadModal.value = false;
  downloadCandidateId.value = null;
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
