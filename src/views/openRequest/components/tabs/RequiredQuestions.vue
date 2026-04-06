<template>
  <div class="required-questions section">
    <h3>Preguntas Obligatorias</h3>
    <ol>
      <li v-for="(question, index) in localQuestions" :key="index">
        <span v-if="!editMode">{{ question }}</span>
        <a-input v-else :value="question" @change="e => updateQuestion(index, e.target.value)" />
      </li>
    </ol>
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'RequiredQuestions',
  props: {
    questions: {
      type: Array,
      required: true,
    },
    editMode: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:questions'],
  setup(props, { emit }) {
    const localQuestions = ref([...props.questions]);

    watch(() => props.questions, (newVal) => {
      localQuestions.value = [...newVal];
    });

    function updateQuestion(index, newValue) {
      const updatedQuestions = [...localQuestions.value];
      updatedQuestions[index] = newValue;
      localQuestions.value = updatedQuestions;
      emit('update:questions', updatedQuestions);
    }

    return {
      localQuestions,
      updateQuestion,
    };
  },
};
</script>

<style scoped>
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
ol {
    padding-left: 20px;
}
</style>
