<template>
   <QuestionForm :id="id"/>
</template>

<script setup>
import QuestionForm from './questions/index.vue'
const props = defineProps({
  id: {
    type: [String, Number],
    default: null,
  },
});
defineOptions({
  name: 'RequiredQuestionsTab'
})

</script>
