<template>
    <div class="candidates">
        <div class="header">
            <a-row>
                <a-col :span="16" style="text-align: left">
                    <h2>{{ titleText + ': ' + searchTitle }}</h2>
                </a-col>
            </a-row>

        </div>
        <basicReport v-model="reportContent" />
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { fetch } from '@/api/model/model.js'
import { Modal, message } from 'ant-design-vue'
import { exportToExcel } from '@/api/model/importExport'

import { useRoute } from 'vue-router';
import clientProposal from '../../../detail/components/clientProposal/index.vue'
import questionRequired from '../../../detail/components/questionRequired/index.vue'
import basicReport from '@/components/basicReport/basicReport.vue'
import { reportModel, candidate } from './config/report.js'
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
const titleText = 'INFORME';
const itemText = 'Informe'
const modelName = 'search-trackings'
const modelNameSingle = 'search-tracking'
const endpoint = modelName + '/'
const route = useRoute();
const id = ref(route.params.id);
const searchTitle = ref('');
const report = ref('')
const reportData = ref(candidate)
const reportContent = ref(reportModel(reportData.value))

// Watch para actualizar el reporte cuando cambie reportData
watch(reportData, (newData) => {
    reportContent.value = reportModel(newData)
}, { deep: true })

onMounted(async () => {
    await getSearch()
    await fetchQuery()
})
async function getFormattedCv(FormattedCV) {
    if (FormattedCV) {
        const { candidate, experience_years, languages, technical_skills, summary } = FormattedCV;
        
    }
}
async function getSearch() {
    try {
        if (id.value) {
            const data = await fetch('get', 'search-trackings', { id: id.value });
            console.log('data 1', data)
            if (data && data.length > 0) {
                console.log('data[0]', data[0])
                const { candidate, applied_date, recruiter, search, seniority } = data[0];
                let candidateName = ""
                let candidateResidence = ""
                let profileId = ""
                let subprofileId = ""
                let seniorityId = ""
                if (candidate) {
                    const candidateData = await fetch('get', 'candidates', { id: candidate });
                    if (candidateData && candidateData.length > 0) {
                        candidateName = candidateData[0].first_name + ' ' + candidateData[0].last_name;
                        candidateResidence = candidateData[0].address + ', ' + candidateData[0].province + ', ' + candidateData[0].country;
                        const FormattedCV = await fetch('get', 'formatted-cvs', { candidate: candidate });
                        if (FormattedCV && FormattedCV.length > 0) {
                            const { experience_years, languages, technical_skills, summary } = FormattedCV[0];
                            reportData.value.experience = experience_years;
                            reportData.value.languages = languages;
                            reportData.value.technical_skills = technical_skills;
                            reportData.value.summary = summary;
                            await getFormattedCv(FormattedCV[0]);
                        }
                    }
                    console.log('candidateData', candidateData)
                    reportData.value.name = candidateName;
                    reportData.value.residence = candidateResidence;
                }
                if (search) {
                    const searchData = await fetch('get', 'search-requests', { id: search });
                    console.log('searchData', searchData)
                    if (searchData && searchData.length > 0) {
                        const { code, profile, subprofile, seniority } = searchData[0];
                        profileId = profile;
                        subprofileId = subprofile;
                        reportData.value.code = code;
                        seniorityId = seniority;
                    }
                }
                if (profileId) {
                    const profileData = await fetch('get', 'primary-profiles', { id: profileId });
                    if (profileData && profileData.length > 0) {
                        const profileName = profileData[0].name;
                        reportData.value.position = profileName;
                    }
                }
                if (subprofileId) {
                    const subprofileData = await fetch('get','sub-profiles', { id: subprofileId });
                    if (subprofileData && subprofileData.length > 0) {
                        const subprofileName = subprofileData[0].name;
                        reportData.value.position = reportData.value.position + " " + subprofileName;
                    }
                }
                searchTitle.value = candidateName;

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
        const data = await fetch('get', endpoint, params);
        let result = [];

        if ('results' in data && 'count' in data) {
            result = data.results;
            totalItems.value = data.count;
        } else {
            result = data;
            totalItems.value = data.length;
        }

        // // ⬇️ Función auxiliar para casteo robusto
        // const castValue = (value, castConfig) => {
        //     const list = JSON.parse(localStorage.getItem(`cast_${castConfig.source}`) || '[]');
        //     const getLabel = (id) => {
        //         const found = list.find(el => el[castConfig.valueField] === id);
        //         return found ? found[castConfig.labelField] : id;
        //     };
        //     return Array.isArray(value) ? value.map(getLabel).join(', ') : getLabel(value);
        // };

    } catch (e) {
        console.error('Error al cargar listado', e);
    } finally {
        loading.value = false;
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


</script>

<style scoped>


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
  
