<template>
  <div>
    <HiringPositions :searchRequest="searchRequest" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import HiringPositions from '@/views/adm/hiringPositions/index.vue'
import { fetch } from '@/api/model/model.js';

const props = defineProps({
  searchRequest: {
    type: [String, Number],
    default: null,
  },
});
defineOptions({
  name: 'PositionsToFillTab'
});

const loading = ref(false);
const positions = ref([]);

const columns = [
  {
    title: 'Nombre',
    field: 'name',
    sorter: true,
  },
  {
    title: 'Cliente',
    field: 'client',
    sorter: true,
  },
];

const fetchPositions = async () => {
  if (!props.searchRequest) {
    positions.value = [];
    return;
  }
  loading.value = true;
  try {
    const params = { search_request: props.searchRequest };
    const data = await fetch('get', 'hiring-positions/', params);
    positions.value = data.results || data;
  } catch (error) {
    console.error('Error fetching hiring positions:', error);
    positions.value = [];
  } finally {
    loading.value = false;
  }
};

watch(
  () => props.searchRequest,
  (newValue) => {
    if (newValue) {
      fetchPositions();
    } else {
        positions.value = []
    }
  },
  { immediate: true }
);
</script>
