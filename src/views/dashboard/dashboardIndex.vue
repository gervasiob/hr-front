<template>
    <div class="header">
        Dashboard
    </div>
    <div class="back-contanier">
        <a-row :gutter="24">
            <a-col :span="8">
                <div class="card">
                    <h2>2308</h2>
                    <p>LICITACIONES TOTALES</p>
                </div>
                <div class="card">
                    <p>ASEGURADORA LÍDER</p>
                    <h3>FEDERACION PATRONAL</h3>
                </div>
            </a-col>
            <a-col :span="8">Graph - componentes</a-col>
            <a-col :span="8">
                <div class="card">
                    <p>PLATAFORMA LÍDER</p>
                    <h3>CLAIMS</h3>
                </div>
                <div class="card">
                    <p>AGENTE LÍDER</p>
                    <h3>Agente</h3>
                </div>
            </a-col>
        </a-row>
    </div>
    <div class="clean-contanier">
        <a-row :gutter="24">
            <a-col :span="12">
                <div class="graph-2">Grafico 3</div>
            </a-col>
            <a-col :span="12">
                <div class="graph-2">Grafico 4</div>
            </a-col>
        </a-row>
    </div>
    <div class="clean-contanier">
        <a-row :gutter="24">
            <a-col :span="6">
                <div class="graph-2">Grafico 5</div>
            </a-col>
            <a-col :span="9">
                <div class="graph-2">Grafico 6</div>
            </a-col>
            <a-col :span="9">
                <div class="graph-2">Grafico 7</div>
            </a-col>
        </a-row>
    </div>

</template>

<script>

export default {
    name: 'DashboardIndex',

    setup() {



        return {


        }
    }
}
</script>

<style>
.back-contanier {
    background-color: var(--back);
    width: 100%;
    height: 280px;
    margin-top: 1%;
    margin-bottom: 1%;
    color: black;
}

.clean-contanier {
    width: 100%;
    height: 350px;
    margin-top: 1%;
    margin-bottom: 1%;
    color: black;
}

.graph-2 {
    border: 1px solid var(--back);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 350px;
    width: 100%;
}

.card {
    border: 1px solid var(--back);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    min-height: 80px;

    margin-top: 20px;
    color: var(--principal)
}
</style>