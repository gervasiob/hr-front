<template>
  <div class="candidates">
    <div class="container">
      <div class="header-container">
        <h2>Candidates</h2>
        <button class="btn-primary" @click="handleCreate">
          Create Candidate
        </button>
      </div>

      <BasicTable :columns="columns" :items="candidates" :loading="loading" @row-click="handleRowClick">
        <!-- SLOT para columna 'status' -->
        <template #status="{ record }">
          <span :class="getStatusClass(record.status)">{{ record.status }}</span>
        </template>

        <!-- SLOT para columna 'actions' -->
        <template #actions="{ record }">
          <div class="actions">
            <button class="btn-edit" @click="handleEdit(record)">
              Edit
            </button>
            <button class="btn-delete" @click="handleDelete(record)">
              Delete
            </button>
          </div>
        </template>
      </BasicTable>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import BasicTable from '@/components/BasicTable.vue'
import { candidateColumns } from './config/columns'

defineOptions({
  name: 'CandidatesIndex',
})

const loading = ref(false)
const candidates = ref([])

// Use the imported columns configuration
const columns = candidateColumns

const getStatusClass = (status) => {
  return {
    'status-active': status === 'active',
    'status-inactive': status === 'inactive',
    'status-pending': status === 'pending'
  }
}

const handleRowClick = (row) => {
  console.log('Row clicked:', row)
}

const handleCreate = () => {
  // Handle create action
}

const handleEdit = (row) => {
  // Handle edit action
}

const handleDelete = (row) => {
  // Handle delete action
}

onMounted(async () => {
  try {
    loading.value = true
    // Add your API call here to fetch candidates
    // candidates.value = await fetchCandidates()
  } catch (error) {
    console.error('Error fetching candidates:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.candidates {
  padding: 20px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  gap: 8px;
}

.status-active {
  color: var(--color-success, green);
  font-weight: 500;
}

.status-inactive {
  color: var(--color-danger, red);
  font-weight: 500;
}

.status-pending {
  color: var(--color-warning, orange);
  font-weight: 500;
}

.btn-primary {
  background-color: var(--principal);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-edit, .btn-delete {
  padding: 4px 8px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-edit {
  background-color: var(--color-info, #4299e1);
  color: white;
}

.btn-delete {
  background-color: var(--color-danger, #e53e3e);
  color: white;
}
</style>