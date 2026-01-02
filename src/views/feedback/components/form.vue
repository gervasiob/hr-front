<template>
    <div class="feedback-steps">
        <div class="step-indicator">
            <span v-for="(step, index) in totalSteps" :key="index"
                :class="['step-dot', { active: currentStep === index + 1, completed: currentStep > index + 1 }]"></span>
        </div>

        <div class="step-content">
            <slot :name="`step-${currentStep}`" :record="record" :feedback="feedback"
                :setFeedbackField="setFeedbackField" :currentStep="currentStep" />
        </div>

        <div class="step-navigation">
            <button v-if="currentStep > 1" @click="prevStep" :disabled="loading">Anterior</button>
            <button v-if="currentStep < totalSteps" @click="nextStep" :disabled="loading">Siguiente</button>

            <button v-if="currentStep === totalSteps" @click="finishFeedback">Finalizar</button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, defineExpose } from 'vue';

const props = defineProps({
    totalSteps: { type: Number, required: true },
    initialStep: { type: Number, default: 1 },
    record: { type: Object, required: true },
    modelValue: { type: Object, default: () => ({}) },
    loading: { type: Boolean, default: false },
});

const emit = defineEmits([
    'step-change',
    'finish',
    'update:modelValue',

    // 👇 NUEVOS
    'next-request',
    'prev-request',
]);

const currentStep = ref(props.initialStep);
const feedback = ref({ ...props.modelValue });

watch(
    () => props.modelValue,
    (val) => { feedback.value = { ...(val || {}) }; },
    { deep: true }
);

function setFeedbackField(key, value) {
    feedback.value = { ...feedback.value, [key]: value };
    emit('update:modelValue', feedback.value);
}

// 👇 ahora no avanza solo, pide al padre
function prevStep() {
    if (currentStep.value > 1) {
        emit('prev-request', currentStep.value); // pasa step actual (1-based)
    }
}

function nextStep() {
    if (currentStep.value < props.totalSteps) {
        emit('next-request', currentStep.value); // pasa step actual (1-based)
    }
}

function finishFeedback() {
    emit('finish', { record: props.record, feedback: feedback.value });
}

// 👇 métodos que el padre llama SOLO si el PUT fue OK
function goPrev() {
    if (currentStep.value > 1) currentStep.value--;
}
function goNext() {
    if (currentStep.value < props.totalSteps) currentStep.value++;
}

defineExpose({ goPrev, goNext });

watch(currentStep, (n, o) => {
    if (n !== o) emit('step-change', n);
});
</script>


<style scoped>
/* tu mismo CSS */
.feedback-steps {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    background: #fff;
}

.step-indicator {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.step-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ccc;
    transition: background-color 0.3s ease;
}

.step-dot.active {
    background: #007bff;
}

.step-dot.completed {
    background: #28a745;
}

.step-content {
    min-height: 100px;
    padding: 10px;
    border: 1px dashed #e0e0e0;
    border-radius: 4px;
}

.step-navigation {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
}

.step-navigation button {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: #007bff;
    color: white;
    font-size: 14px;
}

.step-navigation button:hover {
    opacity: 0.9;
}

.step-navigation button:disabled {
    background: #ccc;
    cursor: not-allowed;
}
</style>