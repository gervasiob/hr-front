<template>
  <a-select
    :value="modelValue"
    @update:value="onUpdate"
    :mode="mode"
    show-search
    :placeholder="placeholder"
    :options="options"
    :loading="loading"
    :disabled="disabled || (field.dependsOn && !formData[field.dependsOn])"
    :filter-option="filterOption"
    style="width: 100%"
  >
  </a-select>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { fetch } from '@/api/model/model.js'; // Adjust the import path as needed

export default {
  name: 'ApiSelect',
  props: {
    modelValue: {
      type: [String, Number, Array],
      default: null,
    },
    endpoint: {
      type: String,
      required: true,
    },
    valueField: {
      type: String,
      default: 'id',
    },
    nameField: {
      type: String,
      default: 'name',
    },
    mode: {
      type: String,
      default: 'single', // 'single' or 'multiple' or 'tags'
    },
    placeholder: {
      type: String,
      default: 'Seleccionar',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    initialOptions: {
        type: Array,
        default: () => []
    },
    field: {
        type: Object,
        default: () => ({})
    },
    formData: {
        type: Object,
        default: () => ({})
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit }) {
    const loading = ref(false);
    const options = ref([]);

    const mapOptions = (data) => {
      if (!Array.isArray(data)) return [];
      return data.map(item => ({
        value: item[props.valueField],
        label: item[props.nameField],
        ...item
      }));
    };
    
    options.value = mapOptions(props.initialOptions)

    const fetchOptions = async () => {
      if (props.field.dependsOn && !props.formData[props.field.dependsOn]) {
        options.value = [];
        return;
      }

      loading.value = true;
      let url = props.endpoint;
      if (props.field.dependsOn) {
        const parentId = props.formData[props.field.dependsOn];
        url = `${url}?${props.field.dependsParam}=${parentId}`;
      }

      try {
        const responseData = await fetch('get', url);
        options.value = mapOptions(responseData);
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        options.value = [];
      } finally {
        loading.value = false;
      }
    };
    
    const onUpdate = (value) => {
        emit('update:modelValue', value);
        const selectedOption = options.value.find(opt => opt.value === value)
        emit('change', value, selectedOption);
    };

    const filterOption = (input, option) => {
        if(option && option.label){
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }
        return false
    };

    onMounted(() => {
        if(!props.initialOptions || props.initialOptions.length === 0){
            fetchOptions();
        }
    });

    // Watch for endpoint changes to refetch options
    watch(() => props.endpoint, () => {
        fetchOptions();
    });

    // Watch for changes in the parent field
    if (props.field.dependsOn) {
      watch(() => props.formData[props.field.dependsOn], () => {
        fetchOptions();
      });
    }

    return {
      loading,
      options,
      onUpdate,
      filterOption,
    };
  },
};
</script>
