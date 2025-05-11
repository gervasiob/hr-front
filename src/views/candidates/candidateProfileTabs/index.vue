<template>
  <div class="header">
    <h1>Candidato: {{ candidateData?.first_name }} {{ candidateData?.last_name }}</h1>
    <p>Mail: {{ candidateData?.email }}</p>
  </div>
  <a-tabs class="tabs" v-model:activeKey="activeKey">
    <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.title">
      <component :is="tab.component" :selected-id="id" :candidate-id="id" @refresh-data="fetchCandidateData" />
    </a-tab-pane>
  </a-tabs>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetch } from '@/api/model/model.js';
import PersonalData from './components/personalData/index.vue';
import Profile from './components/candidateProfile/index.vue';
import Languages from './components/candidateLanguages/index.vue';
import Files from './components/cvFiles/index.vue';
import FormattedCvs from './components/formattedCvs/index.vue';

const route = useRoute();
const id = ref(route.params.id);
const candidateData = ref(null);
const activeKey = ref('1');

const tabs = [
  {
    key: '1',
    title: 'Datos Personales',
    component: PersonalData
  },
  {
    key: '2',
    title: 'Perfil',
    component: Profile
  },
  {
    key: '3',
    title: 'Idiomas',
    component: Languages
  },
  {
    key: '4',
    title: 'Archivos CVs',
    component: Files
  },
  {
    key: '5',
    title: 'CVs en Formato',
    component: FormattedCvs
  }
];

async function fetchCandidateData() {
  try {
    const response = await fetch('get', 'candidates/', { id: id.value });
    candidateData.value = response[0];
  } catch (error) {
    console.error('Error fetching candidate data:', error);
  }
}

onMounted(() => {
  fetchCandidateData();
});
</script>

<style scoped>
.header {
 text-align: left;
    }
    .tabs {
color: black;
  }
</style>