<template>
  <div>
    <a-tabs v-model:activeKey="activeKey" class="form-tabs">
      <a-tab-pane key="resumen" tab="Resumen">
        <ResumeTab />
      </a-tab-pane>
      <a-tab-pane key="descripcion" tab="Descripción del Rol">
        <RoleDescriptionTab :id="searchRequestId" @created="handleCreated" />
      </a-tab-pane>
      <a-tab-pane key="puestos" tab="Posiciones a Cubrir" :disabled="handleDisabled">
        <HiringPositionsTab :id="searchRequestId" />
      </a-tab-pane>
      <a-tab-pane key="propuesta" tab="Propuesta / Condiciones">
        <ProposalTab />
      </a-tab-pane>
      <a-tab-pane key="preguntas" tab="Preguntas Obligatorias">
        <RequiredQuestionsTab />
      </a-tab-pane>
      <a-tab-pane key="candidatos" tab="Candidatos (9)">
        <CandidatesTab />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

import ResumeTab from './tabs/ResumeTab.vue';
import RoleDescriptionTab from './tabs/RoleDescriptionTab.vue';
import ProposalTab from './tabs/ProposalTab.vue';
import RequiredQuestionsTab from './tabs/RequiredQuestionsTab.vue';
import CandidatesTab from './tabs/CandidatesTab.vue';
import HiringPositionsTab from './tabs/HiringPositionsTab.vue';

const props = defineProps({
  id: {
    type: Number,
    default: null
  }
});

// estado activo del tab
const activeKey = ref('descripcion');

const searchRequestId = ref(props.id);

function handleCreated(id) {
  searchRequestId.value = id;
}

// 🔹 disabled dinámico
const handleDisabled = computed(() => !searchRequestId.value);;
</script>

<style scoped>
.form-tabs {
  padding: 24px;
}
</style>
