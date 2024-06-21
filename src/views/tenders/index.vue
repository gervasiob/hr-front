<template>
  <div class="header">
  </div>

  <div style="background-color: var(--mute); padding: 20px;  border-radius: 20px;">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="Prioridad 1" :bordered="false" class="card-1" @click="handleCardClick(1)">
          <p><small>Alta probabilidad de éxito</small></p>
          <p>Cantidad: {{ priorityCounts }} Licitaciones</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Prioridad 2" :bordered="false" class="card-2" @click="handleCardClick(2)">
          <p><small>Media probabilidad de éxito</small></p>
          <p>Cantidad: 45 Licitaciones</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="Prioridad 3" :bordered="false" class="card-3" @click="handleCardClick(3)">
          <p><small>Baja probabilidad de éxito</small></p>
          <p>Cantidad: 100 Licitaciones</p>
        </a-card>
      </a-col>
    </a-row>
  </div>

  <TenderList :card-filter="cardNumber" />


</template>

<script>
import TenderList from './components/tenderList.vue';
import { ref } from 'vue';
import { getPriorityCounts } from '@/api/quotes/quotes';
export default {
  name: 'TenderIndex',
  components: {
    TenderList,
  },
  setup() {
    const cardNumber = ref();
    const handleCardClick = (cardKey) => {
      console.log(`Clicked on card ${cardKey}`);
      cardNumber.value = cardKey;
      // Aquí puedes manejar la lógica del clic de la tarjeta, por ejemplo, redireccionar a otra página
    };
    const priorityCounts = ref();
    const fectchData = async () => {
      const response = await getPriorityCounts().then(() => {
        priorityCounts.value = response;
        console.log(response, 'response')
        console.log(priorityCounts.value)
      })
    
    }




    return {
      handleCardClick,
      cardNumber,
      priorityCounts,
      fectchData,
    }
  }
}
</script>

<style>
.card-1 {
  background-color: rgb(165, 71, 71);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.card-2 {
  background-color: rgb(180, 172, 29);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.card-3 {
  background-color: rgb(116, 111, 111);
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

}

.card-1:hover,
.card-2:hover,
.card-3:hover {
  background-color: #CB2127;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.ant-card-head-title {
  color: white;
  /* Cambia el color del título de la tarjeta */
}
</style>