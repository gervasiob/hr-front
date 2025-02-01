<template>

    <div>
        <a-row>
            <a-col :span="8" :offset="4" class="cal-prom">
                <h3>Calificación Promedio</h3>
            </a-col>
            <a-col :span="40" class="cal-prom">

                <a-rate v-model:value="formData.calificacion_promedio" readonly />

            </a-col>
        </a-row>
    </div>
    <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" class="description-group">

        <a-descriptions-item label="Pregunta 1">
            <div class="item-d">
                <a-rate v-model:value="formData.int_feedback" readonly />
            </div>
        </a-descriptions-item>
        <a-descriptions-item label="Pregunta 2">
            <div class="item-d">
                <a-rate v-model:value="formData.int_feedback1" readonly />
            </div>
        </a-descriptions-item>
        <a-descriptions-item label="Pregunta 3">
            <div class="item-d">
                <a-rate v-model:value="formData.int_feedback2" readonly />
            </div>
        </a-descriptions-item>
        <a-descriptions-item label="Pregunta 4">
            <div class="item-d">
                <a-rate v-model:value="formData.int_feedback3" readonly />
            </div>
        </a-descriptions-item>
    </a-descriptions>
</template>

<script>
import { apiSatisfaction } from '@/api/satisfaction/satisfaction';
import { onMounted, ref } from 'vue';

export default {
    name: 'SatisfactionTab',
    props: {
        claimId: {
            type: Number,
            required: true,
        }
    },
    setup(props) {
        const formData = ref({});
        const fechtData = async () => {
            const params = {
                claim_id: props.claimId,
            }
            try {
                const res = await apiSatisfaction('get', params);

                formData.value = res.results[0];
                console.log(' formData.value ', formData.value)
            } catch (error) {
                console.log('error', error)
            }
        }
        onMounted(() => {
            fechtData();
        })
        return {
            formData,
        }
    }
}
</script>

<style scoped>
.cal-prom { 
    border: 1px solid var(--border-item);
    margin-top: 1%;
    margin-bottom: 1%;
    padding: 0.5%;
}
</style>