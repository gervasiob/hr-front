<template>
  <div class="header">
    <h1>Integración con Claims</h1>
  </div>

  <div style="background-color: #ececec; padding: 20px">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="Prioridad 1" :bordered="false" class="card-1" @click="handleCardClick(1)">
          <p><small>Alta probabilidad de éxito</small></p>
          <p>Cantidad: 34 Licitaciones</p>
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

  <TenderList />


</template>

<script>
import TenderList from './components/tenderList.vue';

export default {
  name: 'TenderIndex',
  components: {
    TenderList,
  },
  setup() {
    const handleCardClick = (cardNumber) => {
      console.log(`Clicked on card ${cardNumber}`);
      // Aquí puedes manejar la lógica del clic de la tarjeta, por ejemplo, redireccionar a otra página
    };


    return {
      handleCardClick,
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
  background-color: rgb(170, 170, 39);
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
  background-color: rgba(12, 121, 127, 0.889);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.ant-card-head-title {
  color: white;
  /* Cambia el color del título de la tarjeta */
}
</style>