<template>
  <div>
    <a-tabs v-model:activeKey="activeKey" class="form-tabs">
      <a-tab-pane key="resumen" tab="Resumen">
        <div>Resumen Content</div>
      </a-tab-pane>
      <a-tab-pane key="descripcion" tab="Descripción del Rol">
        <div class="tab-content-wrapper">
            <a-row :gutter="24">
            <a-col :span="16">
                <div class="rol-details">
                <div class="rol-header">
                    <h2>Descripción del Rol</h2> 
                    <span class="profile-title">Título del Perfil</span> 
                    <span class="client">Cliente</span>
                </div>
                <div class="task-description section">
                    <h3>Descripción de Tareas</h3>
                    <p>Popemensapión de säator a rmdidon cá venticor coication mager corcamiant. Punoico men cossede aufisosate reque sunany mer tomico boctisitas de torticato, stuna honsequte perficioerpar datas oempos rece cmnontoxin, contritación de riatitas coffe, perdacios. ganees spuets setitria solanitas, wmae de propuesta, data ruio cortnoa lactatoos rensament primeurt ernbas mec ormments sécierstiduis.</p>
                </div>
                <div class="technical-requirements section">
                    <h3>Requerimientos Tecnicos</h3>
                    <p>Posumenoel de proresie, fio contiitar de nettrictior odicecie een distupesaecus, resporrdor men ienfallas becita, aubarie ticaperide corraieenitas, beciitios on tusce metimniny contiatatın 1. Sixcritos, pefte eel gpeectios scasocetim entregasts, erfddcaan etericas regueeman yeelas, chitinted.</p>
                    <p><strong>Skills:</strong> Java, SQL, Hibernate, SpringBoot</p>
                </div>
                <div class="soft-requirements section">
                    <h3>Requisito soft</h3>
                    <p>Penmaiertias sent poroentan lastitium Tareas sensoisita badios sca deflit aerticiprentes, diaeridar zerra fusupeworicing ceruda nerficialii, grauentio vofit, celímainy me centeccuus acadiosutas. Conessed tranquaato suppetentes, sobecscentes clectuentia vea cotttim ma latriat.</p>
                </div>
                </div>
            </a-col>
            <a-col :span="8">
                <div class="sidebar">
                <div class="op-codes section">
                    <a-row>
                    <a-col :span="12">
                        <div><strong>Codigo de OP</strong></div>
                        <div><strong>Fecha de A</strong></div>
                        <div><strong>N de A</strong></div>
                    </a-col>
                    <a-col :span="12">
                        <div><strong>Codigo Opcional (ACC)</strong></div>
                        <div><strong>Fecha de Solicitud de A</strong></div>
                    </a-col>
                    </a-row>
                </div>
                <div class="client-proposal section">
                    <h3>Propuesta del cliente</h3>
                    <div><strong>Forma de contratación:</strong> Relacia de Dependencia</div>
                    <div><strong>Contrata:</strong> Accentiore</div>
                    <div><strong>Tope Salarial Bruto:</strong> $500,000 ARS</div>
                    <div><strong>Homeworking:</strong> Hibrido</div>
                    <div><strong>Horarios:</strong> 9:00 a 18:00</div>
                    <div><strong>Zona de trabajo:</strong> CABA</div>
                    <div><strong>Obra Social</strong></div>
                    <div><strong>Datacidida da proyecto:</strong> IZABRA</div>
                    <div><strong>Idioma</strong></div>
                    <div><strong>Beneficios y otros</strong></div>
                </div>
                <div class="required-questions section">
                    <h3>Preguntas Obligatorias</h3>
                    <ol>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    </ol>
                </div>
                </div>
            </a-col>
            </a-row>
        </div>
      </a-tab-pane>
      <a-tab-pane key="propuesta" tab="Propuesta / Condiciones">
        <div>Propuesta / Condiciones Content</div>
      </a-tab-pane>
      <a-tab-pane key="preguntas" tab="Preguntas Obligatorias">
        <div>Preguntas Obligatorias Content</div>
      </a-tab-pane>
      <a-tab-pane key="candidatos" tab="Candidatos (9)">
        <div>Candidatos Content</div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'OpenRequestForm',
  setup() {
    const activeKey = ref('descripcion');

    return {
      activeKey,
    };
  },
};
</script>

<style scoped>
.tab-content-wrapper {
    padding: 24px;
}
.rol-header {
    display: flex;
    align-items: center;
    gap: 24px;
    margin-bottom: 24px;
}
.rol-header h2 {
    font-size: 20px;
    font-weight: bold;
    margin: 0;
}
.profile-title, .client {
    font-size: 14px;
    color: #1890ff;
    cursor: pointer;
}
.section {
    margin-bottom: 24px;
    background: #fff;
    padding: 20px;
    border: 1px solid #f0f0f0;
    border-radius: 2px;
}
.sidebar .section {
    background-color: #f8f8f8;
    padding: 20px;
    border-radius: 8px;
    border: none;
}
h3 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 16px;
}
.sidebar div {
    margin-bottom: 8px;
}
.sidebar .op-codes div {
    font-size: 12px;
}
.sidebar ol {
    padding-left: 20px;
}
</style>
