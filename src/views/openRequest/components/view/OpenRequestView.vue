<template>
  <div class="shell">
    <header class="topbar">
      <div>
        <p class="eyebrow">Sistema PCP</p>
        <h1>PCP Detalle</h1>
      </div>
      <div class="topbar-actions">
        <button class="button button-secondary">Descargar listado</button>
        <button class="button button-primary">Nuevo</button>
      </div>
    </header>

    <main class="workspace">
      <section class="hero-card">
        <div class="hero-copy">
          <span class="status-pill">Perfil activo</span>
          <h2>{{ formItem.codigo }}</h2>
        </div>

        <div class="hero-actions">
          <button class="button button-ghost">Guardar borrador</button>
          <button class="button button-primary">Ingreso a candidatos</button>
        </div>
      </section>

      <section class="snapshot-card">
        <div class="snapshot-grid">
          <div class="snapshot-item">
            <span>Requeridor</span>
            <strong>{{ comercialName }}</strong>
          </div>
          <div class="snapshot-item">
            <span>Cliente final</span>
            <strong>{{ clientName }}</strong>
          </div>
          <div class="snapshot-item">
            <span>Cliente Secundario</span>
            <strong>{{ secondClientName }}</strong>
          </div>
          <div class="snapshot-item">
            <span>Perfil primario</span>
            <strong>{{ profileName }}</strong>
          </div>
          <div class="snapshot-item">
            <span>Perfil secundario</span>
            <strong>{{ subProfileName }}</strong>
          </div>
          <div class="snapshot-item">
            <span>Codigo Accenture</span>
            <strong>{{ formItem.codigoAccenture }}</strong>
          </div>
          <div class="snapshot-item">
            <span>Posiciones a cubrir</span>
            <strong>{{ formItem.positionsToCover }}</strong>
          </div>
          <div class="snapshot-item">
            <span>Seniority</span>
            <strong>{{ seniorityName }}</strong>
          </div>
          <div class="snapshot-item">
            <span>Podemos postular</span>
            <strong>{{ formItem.weCanPostulate ? 'Si' : 'No' }}</strong>
          </div>
        </div>
      </section>

      <section class="tabs-card">
        <nav class="tabs" aria-label="Navegacion del detalle">
          <button class="tab" :class="{ 'is-active': activeTab === 'resumen' }" @click="activeTab = 'resumen'">
            Resumen
          </button>
          <button class="tab" :class="{ 'is-active': activeTab === 'descripcion' }" @click="activeTab = 'descripcion'">
            Descripcion del Rol
          </button>
          <button class="tab" :class="{ 'is-active': activeTab === 'condiciones' }" @click="activeTab = 'condiciones'">
            Propuesta del cliente
          </button>
          <button class="tab" :class="{ 'is-active': activeTab === 'candidatas' }" @click="activeTab = 'candidatas'">
            Candidatas ({{ candidates.length }})
          </button>
        </nav>
      </section>

      <!-- <section class="filters-card">
        <div class="section-heading">
          <div>
            <p class="section-kicker">Busqueda enriquecida</p>
            <h3>Filtros rapidos</h3>
          </div>
          <span class="caption">Conserva la logica del sistema basico, pero la integra al detalle</span>
        </div>

        <div class="filters-grid">
          <label class="field">
            <span>Skills requeridas</span>
            <input type="text" placeholder="Java, Spring Boot, SQL" />
          </label>
          <label class="field">
            <span>Skills opcionales</span>
            <input type="text" placeholder="AWS, Kafka, Docker" />
          </label>
          <label class="field">
            <span>Soft skills</span>
            <input type="text" placeholder="Liderazgo, mentoring" />
          </label>
          <div class="filter-actions">
            <button class="button button-primary">Buscar</button>
            <button class="button button-secondary">Reset</button>
          </div>
        </div>
      </section> -->

      <section class="detail-grid">
        <div class="main-column">
          <article class="content-card tab-panel" :class="{ 'is-visible': activeTab === 'resumen' }" id="resumen">
            <div class="card-title-row">
              <div>
                <p class="section-kicker">Vista general</p>
                <h3>Descripcion del rol</h3>
              </div>
              <span class="mini-chip">Cliente: {{ clientName }}</span>
            </div>

            <div class="stack">
              <section class="info-block">
                <div class="info-heading">
                  <h4>Descripcion de tareas</h4>
                  <!-- <span class="mini-tag">AI generado</span> -->
                </div>
                <p>
                  {{ formItem.tasksDescription }}
                </p>
              </section>

              <section class="info-block">
                <div class="info-heading">
                  <h4>Requerimientos tecnicos</h4>
                  <span class="mini-tag">Obligatorios</span>
                </div>
                <p>
                  {{ formItem.technicalRequirements }}
                </p>
              </section>

              <section class="skills-block">
                <div>
                  <h4>Skills requeridas</h4>
                  <div class="chip-row">
                    <span v-for="skill in requiredSkills" :key="skill.id" class="skill-chip required">{{ skill
                    }}</span>
                  </div>
                </div>

                <div>
                  <h4>Soft skills</h4>
                  <div class="chip-row">
                     <span v-for="skill in softSkills" :key="skill" class="skill-chip optional">{{ skill }}</span>
                  </div>
                </div>
                <section class="info-block">
                  <div class="info-heading">
                    <h4>Requisito soft</h4>
                    <span class="mini-tag">Evaluable</span>
                  </div>
                  <p>
                    {{ formItem.softRequirements }}
                  </p>
                </section>9
              </section>


            </div>
          </article>

          <article class="content-card tab-panel" :class="{ 'is-visible': activeTab === 'descripcion' }"
            id="descripcion">
            <div class="card-title-row">
              <div>
                <p class="section-kicker">Profundidad funcional</p>
                <h3>Descripcion ampliada</h3>
              </div>
            </div>

            <div class="timeline">
              <div v-for="item in timeline" :key="item.id" class="timeline-item">
                <span class="timeline-dot"></span>
                <div>
                  <h4>{{ item.title }}</h4>
                  <p>
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </article>

          <article class="content-card tab-panel" :class="{ 'is-visible': activeTab === 'condiciones' }"
            id="condiciones">
            <div class="card-title-row">
              <div>
                <p class="section-kicker">Lectura operativa</p>
                <h3>Propuesta del cliente</h3>
              </div>
            </div>

            <div class="two-col-list proposal-grid">
              <div class="metric-card">
                <span>Forma de contratacion</span>
                <strong>{{ hiringTypeName }}</strong>
              </div>
              <div class="metric-card">
                <span>Contrata</span>
                <strong>{{ formItem.contractor }}</strong>
              </div>
              <div class="metric-card">
                <span>Tope salarial bruto</span>
                <strong>{{ formItem.grossSalaryCap }}</strong>
              </div>
              <div class="metric-card">
                <span>Homeworking</span>
                <strong>{{ modalityName }}</strong>
              </div>
              <div class="metric-card">
                <span>Prepaga</span>
                <strong>{{ medicalInsuranceName }}</strong>
              </div>
              <div class="metric-card">
                <span>Disposicion de la jornada</span>
                <strong>{{ formItem.workdayDisposition }}</strong>
              </div>
              <div class="metric-card">
                <span>Zona de trabajo</span>
                <strong>{{ provinceName }}</strong>
              </div>
              <div class="metric-card">
                <span>Duracion del proyecto</span>
                <strong>{{ formItem.projectDuration }}</strong>
              </div>
              <div class="metric-card">
                <span>Guardias</span>
                <strong>{{ formItem.onCallDuty }}</strong>
              </div>
              <div class="metric-card">
                <span>Ajustes salariales</span>
                <strong>{{ formItem.salaryAdjustments }}</strong>
              </div>
              <div class="metric-card">
                <span>Requisito de idioma</span>
                <strong>{{ formItem.languageRequirement }}</strong>
              </div>
              <div class="metric-card metric-card-wide">
                <span>Beneficios y otros</span>
                <strong>{{ formItem.benefits }}</strong>
              </div>
            </div>
          </article>

          <article class="content-card tab-panel" :class="{ 'is-visible': activeTab === 'candidatas' }" id="candidatas">
            <div class="card-title-row">
              <div>
                <p class="section-kicker">Estado del pipeline</p>
                <h3>Ingreso a tabla de candidatas</h3>
              </div>
            </div>

            <div class="candidate-table">
              <div class="table-head">
                <span>Nombre</span>
                <span>Match tecnico</span>
                <span>Soft skills</span>
                <span>Estado</span>
              </div>
              <div class="table-row" v-for="candidate in candidates" :key="candidate.id">
                <span>{{ candidate.name }}</span>
                <span>{{ candidate.technicalMatch }}%</span>
                <span>{{ candidate.softSkillsMatch }}</span>
                <span class="state">{{ candidate.status }}</span>
              </div>
            </div>
          </article>
        </div>

        <aside class="side-column">
          <article class="side-card">
            <div class="card-title-row compact">
              <div>
                <p class="section-kicker">Metadatos</p>
                <h3>Informacion de la OP</h3>
              </div>
            </div>

            <div class="metadata-grid">
              <div>
                <span>Codigo de OP</span>
                <strong>{{ formItem.codigo }}</strong>
              </div>
              <div>
                <span>Codigo opcional</span>
                <strong>{{ formItem.optionalCode }}</strong>
              </div>
              <div>
                <span>Fecha de alta</span>
                <strong>{{ new Date(formItem.createdAt).toLocaleDateString() }}</strong>
              </div>
              <div>
                <span>Nivel</span>
                <strong>{{ seniorityName }}</strong>
              </div>
            </div>
          </article>

          <article class="side-card">
            <div class="card-title-row compact">
              <div>
                <p class="section-kicker">Cliente</p>
                <h3>Propuesta del cliente</h3>
              </div>
              <span class="mini-chip">CPQ</span>
            </div>

            <div class="detail-list">
              <div class="detail-row">
                <span>Forma de contratacion</span>
                <strong>{{ hiringTypeName }}</strong>
              </div>
              <div class="detail-row">
                <span>Contrata</span>
                <strong>{{ formItem.contractor }}</strong>
              </div>
              <div class="detail-row">
                <span>Tope salarial bruto</span>
                <strong>{{ formItem.grossSalaryCap }}</strong>
              </div>
              <div class="detail-row">
                <span>Homeworking</span>
                <strong>{{ modalityName }}</strong>
              </div>
              <div class="detail-row">
                <span>Prepaga</span>
                <strong>{{ medicalInsuranceName }}</strong>
              </div>
              <div class="detail-row">
                <span>Disposicion de la jornada</span>
                <strong>{{ formItem.workdayDisposition }}</strong>
              </div>
              <div class="detail-row">
                <span>Zona de trabajo</span>
                <strong>{{ provinceName }}</strong>
              </div>
              <div class="detail-row">
                <span>Duracion del proyecto</span>
                <strong>{{ formItem.projectDuration }}</strong>
              </div>
              <div class="detail-row">
                <span>Guardias</span>
                <strong>{{ formItem.onCallDuty }}</strong>
              </div>
              <div class="detail-row">
                <span>Ajustes salariales</span>
                <strong>{{ formItem.salaryAdjustments }}</strong>
              </div>
              <div class="detail-row">
                <span>Requisito de idioma</span>
                <strong>{{ formItem.languageRequirement }}</strong>
              </div>
              <div class="detail-row">
                <span>Beneficios y otros</span>
                <strong>{{ formItem.benefits }}</strong>
              </div>
            </div>
          </article>

          <article class="side-card">
            <div class="card-title-row compact">
              <div>
                <p class="section-kicker">Screening</p>
                <h3>Preguntas obligatorias</h3>
              </div>
            </div>

            <ol class="questions-list side-questions">
              <li v-for="question in mandatoryQuestions" :key="question.id">{{ question.text }}</li>
            </ol>
          </article>

          <article class="side-card emphasis">
            <div class="card-title-row compact">
              <div>
                <p class="section-kicker">Resumen ejecutivo</p>
                <h3>Lo mas importante</h3>
              </div>
            </div>

            <ul class="summary-list">
              <li>La busqueda pasa de tabla vacia a ficha narrativa con contexto.</li>
              <li>Los skills se vuelven visibles y comparables de un vistazo.</li>
              <li>La columna lateral concentra datos comerciales y operativos.</li>
              <li>La navegacion por tabs permite escalar sin saturar la primera vista.</li>
            </ul>
          </article>
        </aside>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { fetch } from '@/api/model/model.js';

const props = defineProps({
  openRequest: {
    type: Object,
    required: true
  }
});

const activeTab = ref('resumen');
const formItem = ref({});

const comercialName = ref('');
const clientName = ref('');
const secondClientName = ref('');
const profileName = ref('');
const subProfileName = ref('');
const seniorityName = ref('');
const hiringTypeName = ref('');
const modalityName = ref('');
const medicalInsuranceName = ref('');
const provinceName = ref('');

const requiredSkills = ref([]);
const optionalSkills = ref([]);
const softSkills = ref([]);
const timeline = ref([]);
const candidates = ref([]);
const mandatoryQuestions = ref([]);

const toCamelCase = (str) => {
  return str.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};

const toCamelCaseObject = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(v => toCamelCaseObject(v));
  }
  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((result, key) => {
      result[toCamelCase(key)] = toCamelCaseObject(obj[key]);
      return result;
    }, {});
  }
  return obj;
};

const getName = async (endpoint, id, nameField = 'name') => {
  if (!id) return '';
  try {
    const response = await fetch('get', `${endpoint}/${id}`);
    return response[nameField] || '';
  } catch (error) {
    console.error(`Error fetching name from ${endpoint}:`, error);
    return '';
  }
};

const getSkills = async (skillIds) => {
  if (!skillIds || skillIds.length === 0) return [];
  try {
    const skills = await Promise.all(skillIds.map(id => fetch('get', `skills/${id}`)));
    return skills.filter(s => s); // Filter out any null responses from failed fetches
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
};

const fetchAndSetData = async (request) => {
  if (!request || !request.id) return;

  try {
    const trackingData = await fetch('get', `search-requests/${request.id}`);
    formItem.value = toCamelCaseObject(trackingData);

    // Now use the camelCased formItem for all subsequent fetches
    const item = formItem.value;

    comercialName.value = await getName('users', item.comerciales && item.comerciales[0], 'username');
    clientName.value = await getName('clients', item.clientId);
    secondClientName.value = await getName('clients', item.secondClientId);
    profileName.value = await getName('primary-profiles', item.profile);
    subProfileName.value = await getName('sub-profiles', item.subprofile);
    seniorityName.value = await getName('seniority-levels', item.seniorityId);
    hiringTypeName.value = await getName('hiring-types', item.hiringTypeId);
    modalityName.value = await getName('modalities', item.modalityId);
    medicalInsuranceName.value = await getName('medical-insurances', item.medicalInsuranceId);
    provinceName.value = await getName('provinces', item.provinceId);

    requiredSkills.value = await getSkills(item.requiredSkills);
    optionalSkills.value = await getSkills(item.optionalSkills);
    softSkills.value = item.softSkills;
    console.log('soft skills', softSkills.value)
    console.log('item', item)
  } catch (e) {
    console.error('Error fetching search request details:', e);
  }

  // Fetch candidates
  try {
    const trackingData = await fetch('get', 'search-requests', { id: request.id });
    if (trackingData && trackingData.length > 0) {
      const candidatePromises = trackingData.map(async (track) => {
        const candidateData = await getName('candidates', track.candidate);
        seniorityName.value = await getName('seniority-levels', track.seniority);
        formItem.value.codigoAccenture = track.codigo
        formItem.value.tasksDescription = track.task_description
        formItem.value.technicalRequirements = track.tech_requirements
        requiredSkills.value = track.skills
        formItem.value.softRequirements = track.soft_requirements
        requiredSkills.softSkills = track.soft_skills
        return {
          id: track.candidate,
          name: candidateData,
          technicalMatch: Math.floor(Math.random() * 21) + 80, // Mocked: 80-100%
          softSkillsMatch: ['Alto', 'Muy alto', 'Medio'][Math.floor(Math.random() * 3)], // Mocked
          status: track.current_status_label || 'En Proceso'
        };
      });
      candidates.value = await Promise.all(candidatePromises);
    } else {
      candidates.value = [];
    }
  } catch (e) {
    console.error('Error fetching candidates:', e);
    candidates.value = []; // Clear on error
  }

  // Mock data for timeline and mandatory questions as their source is undefined
  timeline.value = [
    { id: 1, title: 'Ownership tecnico', description: 'Participacion en decisiones de arquitectura y soporte a integraciones con sistemas legados.' },
    { id: 2, title: 'Colaboracion con cliente', description: 'Reuniones semanales de seguimiento, refinamiento y ajuste de prioridades del roadmap.' },
    { id: 3, title: 'Calidad y documentacion', description: 'Participacion en code reviews, seguimiento de deuda tecnica y definicion de criterios de aceptacion.' },
  ];
  mandatoryQuestions.value = [
    { id: 1, text: 'Trabajaste desarrollando agentes de AI o flujos que integren modelos con APIs o sistemas internos?' },
    { id: 2, text: 'Que servicios cloud usaste en proyectos de AI o automatizacion?' },
    { id: 3, text: 'Llegaste a implementar soluciones usando servicios como functions serverless, workflows u orquestacion?' },
    { id: 4, text: 'Con que lenguajes trabajas habitualmente y en que tipo de soluciones los usaste recientemente?' },
    { id: 5, text: 'Hay experiencia reciente trabajando con equipos de negocio y discovery tecnico?' },
  ];
};

watch(() => props.openRequest, (newRequest) => {
  fetchAndSetData(newRequest);
}, { immediate: true, deep: true });

</script>

<style scoped>
/* --- Estilos del componente --- */
:root {
  --bg: #f3f6fb;
  --bg-accent: #e9eef8;
  --surface: rgba(255, 255, 255, 0.9);
  --surface-strong: #ffffff;
  --surface-muted: #f8faff;
  --border: rgba(30, 53, 92, 0.1);
  --border-strong: rgba(30, 53, 92, 0.18);
  --text: #1a2740;
  --text-soft: #64708a;
  --primary: #3056d3;
  --primary-strong: #213d9f;
  --primary-soft: rgba(48, 86, 211, 0.12);
  --success-soft: rgba(54, 179, 126, 0.16);
  --warning-soft: rgba(233, 176, 0, 0.16);
  --shadow: 0 24px 60px rgba(31, 45, 76, 0.12);
  --radius-xl: 28px;
  --radius-lg: 22px;
  --radius-md: 16px;
  --radius-sm: 12px;
}

* {
  box-sizing: border-box;
}

.shell {
  max-width: 1480px;
  margin: 0 auto;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 28px 30px;
  border-radius: var(--radius-xl);
  background: linear-gradient(135deg, #24364f 0%, #344c6c 100%);
  color: #fff;
  box-shadow: var(--shadow);
}

.eyebrow,
.section-kicker,
.caption {
  margin: 0;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.eyebrow,
.section-kicker {
  font-size: 0.74rem;
  font-weight: 700;
}

.caption {
  font-size: 0.78rem;
  color: var(--text-soft);
}

.topbar h1,
.hero-copy h2,
.section-heading h3,
.card-title-row h3,
.info-heading h4,
.skills-block h4,
.timeline-item h4 {
  margin: 0;
}

.topbar h1 {
  font-size: clamp(1.8rem, 2vw, 2.4rem);
}

.topbar-actions,
.hero-actions,
.filter-actions,
.card-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.button {
  border: 0;
  border-radius: 14px;
  padding: 12px 18px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;
}

.button:hover {
  transform: translateY(-1px);
}

.button-primary {
  background: linear-gradient(135deg,  #3a7cff  0%, #3a7cff 100%);
  color: white;
  box-shadow: 0 14px 28px rgba(48, 86, 211, 0.25);
}

.button-secondary {
  background: rgba(255, 255, 255, 0.96);
  color: #1d2e48;
}

.button-ghost {
  background: rgba(255, 255, 255, 0.12);
  color: #494747;
  border: 1px solid rgba(75, 9, 9, 0.2);
}

.workspace {
  display: grid;
  gap: 22px;
  margin-top: 22px;
}

.hero-card,
.snapshot-card,
.tabs-card,
.filters-card,
.content-card,
.side-card {
  background: var(--surface);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  backdrop-filter: blur(18px);
}

.hero-card {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 28px 30px;
  border-radius: var(--radius-xl);
  position: relative;
  overflow: hidden;
}

.hero-card::after {
  content: "";
  position: absolute;
  inset: auto -40px -40px auto;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(48, 86, 211, 0.15), transparent 65%);
}

.hero-copy {
  max-width: 780px;
  display: grid;
  gap: 10px;
}

.hero-copy p {
  margin: 0;
  color: var(--text-soft);
  line-height: 1.65;
  max-width: 68ch;
}

.status-pill,
.mini-chip,
.mini-tag,
.skill-chip,
.state {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-weight: 700;
}
.mini-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.74rem;
  font-weight: 700;
  background: #dff4ff;
  color: #1d6fa5;
  border: 1px solid #b9e7ff;
}
.status-pill {
  width: fit-content;
  padding: 7px 12px;
  background: var(--primary-soft);
  color: var(--primary-strong);
  font-size: 0.78rem;
}

.snapshot-card,
.tabs-card,
.filters-card,
.content-card,
.side-card {
  border-radius: var(--radius-lg);
}

.snapshot-card {
  padding: 14px;
  background:
    linear-gradient(180deg, rgba(176, 157, 212, 0.22), rgba(255, 255, 255, 0.95)),
    var(--surface);
}

.snapshot-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.snapshot-item {
  display: grid;
  gap: 8px;
  min-height: 84px;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid rgba(88, 68, 130, 0.15);
  background: rgba(255, 255, 255, 0.8);
}

.snapshot-item span {
  color: #695b84;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 700;
}

.snapshot-item strong {
  font-size: 1rem;
}

.tabs-card {
  padding: 10px;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tab {
  border: 0;
  background: transparent;
  color: var(--text-soft);
  font: inherit;
  font-weight: 700;
  padding: 14px 18px;
  border-radius: 14px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.tab:hover,
.tab.is-active {
  background: var(--surface-muted);
  color: var(--text);
  transform: translateY(-1px);
}

.tab.is-active {
  box-shadow: inset 0 -3px 0 var(--primary);
}

.filters-card {
  padding: 26px 28px;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: end;
  margin-bottom: 22px;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)) auto;
  gap: 16px;
  align-items: end;
}

.field {
  display: grid;
  gap: 10px;
}

.field span {
  font-size: 0.92rem;
  font-weight: 700;
}

.field input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid var(--border-strong);
  background: #fff;
  font: inherit;
  color: var(--text);
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.field input:focus {
  border-color: rgba(48, 86, 211, 0.45);
  box-shadow: 0 0 0 4px rgba(48, 86, 211, 0.1);
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(320px, 0.9fr);
  gap: 22px;
}

.main-column,
.side-column {
  display: grid;
  gap: 22px;
  align-content: start;
}

.content-card,
.side-card {
  padding: 26px 28px;
}

.tab-panel {
  display: none;
}

.tab-panel.is-visible {
  display: block;
  animation: fade-up 0.28s ease;
}

.card-title-row {
  justify-content: space-between;
  margin-bottom: 20px;
}

.card-title-row.compact {
  align-items: start;
}

.stack {
  display: grid;
  gap: 18px;
}

.info-block,
.skills-block,
.metric-card,
.candidate-table,
.side-card.emphasis {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(243, 247, 255, 0.95));
}

.info-block,
.skills-block {
  padding: 18px 20px;
}

.info-heading {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

.info-block p,
.timeline-item p,
.questions-list,
.summary-list {
  margin: 0;
  color: var(--text-soft);
  line-height: 1.65;
}

.mini-chip,
.mini-tag {
  font-size: 0.75rem;
  padding: 7px 11px;
}

.mini-chip {
  background: rgba(27, 42, 76, 0.08);
  color: var(--text);
}
.skills-block {
  display: grid;
  gap: 18px;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.skill-chip {
  padding: 10px 14px;
  font-size: 0.84rem;
}

.skill-chip.required {
  background: rgb(44, 83, 209);
  color: white;
}

.skill-chip.optional {
  background: rgb(62, 228, 137);
  color: #006b26;
}

.skill-chip.soft {
  background: var(--success-soft);
  color: #176345;
}

.timeline {
  display: grid;
  gap: 18px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 18px 1fr;
  gap: 14px;
  padding: 16px 18px;
  border-radius: var(--radius-md);
  background: var(--surface-muted);
  border: 1px solid var(--border);
}

.timeline-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(180deg, #4e7cff, #2748a3);
  box-shadow: 0 0 0 4px rgba(48, 86, 211, 0.12);
  margin-top: 6px;
}

.two-col-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.proposal-grid .metric-card-wide {
  grid-column: 1 / -1;
}

.metric-card {
  display: grid;
  gap: 8px;
  padding: 18px 20px;
}

.metric-card span,
.metadata-grid span,
.detail-row span {
  color: var(--text-soft);
  font-size: 0.84rem;
}

.metric-card strong,
.metadata-grid strong,
.detail-row strong {
  font-size: 1rem;
}

.questions-list,
.summary-list {
  padding-left: 20px;
}

.questions-list li,
.summary-list li {
  padding-left: 4px;
  margin-bottom: 12px;
}

.side-questions {
  padding-left: 18px;
}

.side-questions li {
  margin-bottom: 14px;
}

.candidate-table {
  overflow: hidden;
}

.table-head,
.table-row {
  display: grid;
  grid-template-columns: 1.4fr 0.8fr 0.9fr 0.8fr;
  gap: 16px;
  align-items: center;
  padding: 16px 18px;
}

.table-head {
  background: rgba(48, 86, 211, 0.08);
  font-weight: 700;
}

.table-row {
  border-top: 1px solid var(--border);
}

.state {
  width: fit-content;
  padding: 8px 12px;
  background: var(--success-soft);
  color: #176345;
  font-size: 0.8rem;
}

.state-neutral {
  background: rgba(107, 119, 140, 0.14);
  color: #4c5668;
}

.metadata-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.metadata-grid div,
.detail-row {
  display: grid;
  gap: 6px;
}

.detail-list {
  display: grid;
  gap: 14px;
}

.side-card.emphasis {
  background:
    radial-gradient(circle at top right, rgba(48, 86, 211, 0.14), transparent 34%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(242, 247, 255, 0.96));
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1180px) {

  .snapshot-grid,
  .filters-grid,
  .detail-grid,
  .two-col-list {
    grid-template-columns: 1fr;
  }

  .hero-card,
  .section-heading {
    align-items: start;
    flex-direction: column;
  }

  .filter-actions {
    justify-content: flex-start;
  }
}

@media (max-width: 820px) {
  body {
    padding: 16px;
  }

  .topbar,
  .hero-card,
  .snapshot-card,
  .filters-card,
  .content-card,
  .side-card {
    padding: 20px;
  }

  .topbar {
    align-items: start;
    flex-direction: column;
  }

  .topbar-actions,
  .hero-actions {
    width: 100%;
    flex-direction: column-reverse;
  }

  .topbar-actions .button,
  .hero-actions .button,
  .filter-actions .button {
    width: 100%;
  }

  .table-head,
  .table-row,
  .metadata-grid {
    grid-template-columns: 1fr;
  }
}
</style>
