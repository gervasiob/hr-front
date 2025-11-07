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
import { reportModel } from './config/report.js'
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
const reportData = ref({})
const reportContent = ref(reportModel(reportData.value))

// Watch para actualizar el reporte cuando cambie reportData
watch(reportData, (newData) => {
    reportContent.value = reportModel(newData)
}, { deep: true })

// Helper to get language details
const getLanguageDetails = async (lang) => {
    try {
        const langDetails = await fetch('get', `languages/${lang.language}/`);
        return {
            name: langDetails.name || 'Idioma no especificado',
            level: `Escrito: ${lang.written_level_obj?.name || 'N/A'}, Oral: ${lang.oral_level_obj?.name || 'N/A'}`,
        };
    } catch (error) {
        console.error(`Error fetching language details for language ID ${lang.language}:`, error);
        return {
            name: 'Error al cargar idioma',
            level: 'N/A',
        };
    }
};

onMounted(async () => {
    await getSearch()
})

async function getSearch() {
    try {
        if (id.value) {
            const data = await fetch('get', 'search-trackings', { id: id.value });
            if (data && data.length > 0) {
                const { candidate, search } = data[0];
                let profileId = ""
                let subprofileId = ""
                let seniorityId = ""
                let formattedCvId = "";

                if (candidate) {
                    const candidateData = await fetch('get', 'candidates', { id: candidate });
                    if (candidateData && candidateData.length > 0) {
                        const firstCandidate = candidateData[0];
                        const candidateName = firstCandidate.first_name + ' ' + firstCandidate.last_name;
                        const candidateResidence = firstCandidate.zone + ', ' + firstCandidate.province + ', ' + firstCandidate.country;

                        reportData.value = {
                            ...reportData.value,
                            id: firstCandidate.id,
                            name: candidateName,
                            residence: candidateResidence,
                            dni: firstCandidate.dni,
                            age: firstCandidate.age,
                            email: firstCandidate.email,
                            phone: firstCandidate.phone,
                        };
                        searchTitle.value = candidateName;

                        const FormattedCV = await fetch('get', 'formatted-cvs', { candidate: candidate });
                        if (FormattedCV && FormattedCV.length > 0) {
                            const { id, experience_years, technical_skills, summary } = FormattedCV[0];
                            formattedCvId = id;
                            reportData.value.formattedCvId = id;
                            reportData.value.experience_years = experience_years;
                            reportData.value.technical_skills = technical_skills;
                            reportData.value.summary = summary;
                        }
                    }
                     // Fetch data from new endpoints
                    if (candidate && formattedCvId) {
                        const [summaryRes, aptitudesRes, evaluationRes, competenciesRes, otrasEvaluacionesRes, otrasDestrezasRes, candidateLanguagesRes] = await Promise.all([
                            fetch('get', 'interview-summaries-new', { candidate, formattedCv: formattedCvId }),
                            fetch('get', 'candidate-aptitudes', { candidate, formattedCv: formattedCvId }),
                            fetch('get', 'evaluaciones-actitudinales', { candidate, formattedCv: formattedCvId }),
                            fetch('get', 'competencias-star', { candidate, formattedCv: formattedCvId }),
                            fetch('get', 'otras-evaluaciones/', { candidate, formattedCv: formattedCvId }),
                            fetch('get', 'otras-destrezas/', { candidate, formattedCv: formattedCvId }),
                            fetch('get', 'candidate-languages/', { candidate })
                        ]);

                        if (summaryRes && summaryRes.length > 0) {
                            reportData.value.summary = summaryRes[0].resumen;
                        }
                        if (aptitudesRes && aptitudesRes.length > 0) {
                            reportData.value.required_skills = aptitudesRes.filter(a => a.origen === 'REQUERIDA');
                            reportData.value.acquired_skills = aptitudesRes.filter(a => a.origen === 'ADQUIRIDA');
                        }
                        if (evaluationRes && evaluationRes.length > 0) {
                            reportData.value.evaluation = evaluationRes[0];
                        }
                        if (competenciesRes && competenciesRes.length > 0) {
                            reportData.value.star_competencies = competenciesRes;
                        }
                        
                        const evalDataArray = otrasEvaluacionesRes?.results || otrasEvaluacionesRes;
                        if (evalDataArray && evalDataArray.length > 0) {
                            const evalData = evalDataArray[0];
                            reportData.value.motivation = evalData.motivacion;
                            reportData.value.location = evalData.zona;
                            reportData.value.availability = `${evalData.disponibilidad_in_situ ? 'Sí' : 'No'} - ${evalData.comentario || ''}`;
                        }

                        const destrezasDataArray = otrasDestrezasRes?.results || otrasDestrezasRes;
                        if (destrezasDataArray && destrezasDataArray.length > 0) {
                            reportData.value.otherSkills = destrezasDataArray.map(d => d.destreza);
                        }

                        const languagesDataArray = candidateLanguagesRes?.results || candidateLanguagesRes;
                        if (languagesDataArray && languagesDataArray.length > 0) {
                             reportData.value.languages = await Promise.all(languagesDataArray.map(getLanguageDetails));
                        }
                    }
                }
                if (search) {
                    const searchData = await fetch('get', 'search-requests', { id: search });
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
            }
        }
    } catch (error) {
        console.error("Error fetching report data:", error);
        message.error("No se pudieron cargar todos los datos del reporte.");
    }
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
  