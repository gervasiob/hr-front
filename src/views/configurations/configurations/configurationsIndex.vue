<template>
    <!-- <div class="filters">
        <a-form layout="horizontal" ref="formRef" :model="filterInputs">
            <a-row :gutter="24">
                <a-col :span="8">
                    <a-form-item label="SKU" name="sku">
                        <a-input v-model:value="filterInputs.sku" allowClear />
                    </a-form-item>
                </a-col>
                <a-col :span="8">
                    <a-form-item label="Nombre" name="name__icontains">
                        <a-input v-model:value="filterInputs.name__icontains" allowClear />
                    </a-form-item>
                </a-col>
                <a-col :span="8" style="text-align: right">
                    <a-button type="primary" danger @click="onSearch">Buscar</a-button>
                    <a-button style="margin: 0 8px" @click="() => resetFilters()">Borrar Filtros</a-button>
                </a-col>
            </a-row>
        </a-form>
    </div> -->

    <!-- Table -->

    <!-- <div>
        <a-button class="editable-add-btn" @click="showModal">AGREGAR ITEM</a-button>
        <a-modal v-model:open="open" title="Producto" @ok="handleOk" @cancel="handleCancel">
            <ModalPlatform @form-finish="handleFormFinish" ref="formComponent" :modalFields="modalFielsProps" />
        </a-modal>
    </div> -->
    <a-table :columns="columns" :data-source="dataSource" :pagination="pagination" :loading="loading"
        @change="handleTableChange">
        <template #bodyCell="{ column, text, record }">

            <template v-if="['description', 'text', 'values'].includes(column.dataIndex)">
                <div>
                    <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]"
                        style="margin: -5px 0;" />
                    <template v-else>
                        {{ text }}
                    </template>
                </div>
            </template>
            <template v-if="['state'].includes(column.dataIndex)">
                <div>
                    <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]"
                        style="margin: -5px 0;" :maxlength="4" />
                    <template v-else>
                        {{ text }}
                    </template>
                </div>
            </template>
            <template v-if="['enable'].includes(column.dataIndex)">
                <div> <a-switch v-if="editableData[record.key]"
                        v-model:checked="editableData[record.key][column.dataIndex]" :disabled="false" />
                    <template v-else>
                        <a-switch :checked="text" :disabled="true" />
                    </template>
                </div>
            </template>

            <template v-if="['value'].includes(column.dataIndex)">
                <div>
                    <a-input-number v-if="editableData[record.key]"
                        v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0;" />
                    <template v-else>
                        {{ text }}
                    </template>
                </div>
            </template>

            <template v-else-if="column.dataIndex === 'operation'">
                <div class="editable-row-operations">
                    <span v-if="editableData[record.key]">
                        <a-typography-link @click="save(record.key)">Save</a-typography-link>
                        <a-popconfirm title="Confirma cancelar?" @confirm="cancel(record.key)">
                            <a>Cancel</a>
                        </a-popconfirm>
                    </span>
                    <span v-else>
                        <a-row :gutter="2">
                            <a-col>
                                <a @click="edit(record.key)">Edit</a>
                            </a-col>
                            <!-- <a-col>
                                <a-popconfirm v-if="dataSource.length" title="Confirma eliminación?"
                                    @confirm="onDelete(record.key)">
                                    <a>Eliminar</a>
                                </a-popconfirm>
                            </a-col> -->
                        </a-row>
                    </span>
                </div>
            </template>
        </template>
    </a-table>
</template>

<script>
import { reactive, ref, onMounted, computed } from 'vue';
import { usePagination } from 'vue-request';
import { cloneDeep } from 'lodash-es';
import { tableColumns } from './config/columns.js';

import { modalFields } from './config/modalFields.js';
import ModalPlatform from '@/components/modal/modalPlatform.vue';
import { apiConfigurations } from '@/api/configurations/configurations.js';

export default {
    name: 'productList',
    components: {
        ModalPlatform,
    },
    setup() {
        const formRef = ref();
        const formState = reactive({});
        const filterInputs = ref({});
        const columns = tableColumns;

        const fetchData = async (params = {}) => {
            console.log('fectch params', params)
            const fullParams = {
                ...params,
                ...filterInputs.value,
            }
            try {
                const response = await apiConfigurations('get', fullParams);

                console.log("response");
                console.log(response);
                dataSource.value = response.results.map((item, index) => ({
                    ...item,
                    key: index,
                    user: null,
                }));

                total.value = response.count;
                return dataSource.value;

            } catch (error) {
                console.error("Error fetching quotes:", error);
            }
        };
        const pageCurrent = ref(1);
        const total = ref(10);
        const {
            data: dataSource,
            run,
            loading,
            current,
            pageSize,
        } = usePagination(fetchData, {
            formatResult: res => res.results,
            pagination: {
                currentKey: 'page',
                pageSizeKey: 'page_size',
            },
        });
        const pagination = computed(() => ({
            defaultCurrent: 1,
            defaultPageSize: 10,
            total: total.value,
            current: current.value,
            pageSizeOptions: ["10", "50", "100"],
            pageSize: pageSize.value,
        }));
        const handleTableChange = (pag, filters, sorter) => {
            pageCurrent.value = pag?.current;
            run({
                page_size: pag.pageSize,
                page: pag?.current,
                sortField: sorter.field,
                sortOrder: sorter.order,
                ...filters,
            });
        };


        const onSearch = () => {
            current.value = 1;
        };
        const resetFilters = () => {
            current.value = 1;
            formRef.value.resetFields();
            filterInputs.value = {};
            fetchData();
        };
        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        onMounted(() => {


        });

        const editableData = reactive({});
        const edit = key => {
            const data = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
            editableData[key] = data;
        };
        const save = async key => {
            const data = dataSource.value.filter(item => key === item.key)[0];
            Object.assign(data, editableData[key]);
            delete editableData[key];
            console.log(data)
            const params = {
                ...data,
            }
            try {

                if (data.id > 0) {
                    await apiConfigurations('put', params, data.id);
                } else {
                    const { id, ...dataWithoutId } = data;
                    apiConfigurations('post', dataWithoutId);
                }
                window.dispatchEvent(new CustomEvent('message-success', { detail: 'Registro actualizado con éxito' }));
                current.value = 1;
            } catch (error) {
                console.error('Error handling form finish:', error);
                window.dispatchEvent(new CustomEvent('message-error', { detail: 'Error: ' + error.response.data.error }));
            } finally {
                fetchData();
            }
        };
        const cancel = (key) => {
            console.log('cancel', key)
            if (key === undefined) {
                onDelete(key);
                delete editableData[key];
                return;
            }
            const record = dataSource.value.find(item => key === item.key);
            Object.assign(record, editableData[key]);
            delete editableData[key];
            if (!record.name) {
                onDelete(key);
            }
            delete editableData[key];
        };
        const count = computed(() => {
            if (dataSource.value) {
                return dataSource.value.length + 1
            }
            return 0;
        });
        const handleAdd = () => {
            const newKey = `${0}`;
            const newData = {
                key: newKey,
                id: '',
                name: '',
            };
            dataSource.value.push(newData);
            editableData[newKey] = cloneDeep(newData);
        };
        const onDelete = key => {
            const data = dataSource.value.filter(item => key === item.key)[0];
            if (data.id) {
                const params = {
                    name: data.name,
                }
                apiConfigurations('delete', params, data.id).then(() => {
                    fetchData();
                });
            }
            const newData = dataSource.value.filter(item => item.key !== key);
            dataSource.value = newData;

        };

        const modalFielsProps = modalFields;
        const formComponent = ref(null);
        const open = ref(false);
        const showModal = () => {
            open.value = true;
        };

        const handleOk = () => {
            if (formComponent.value) {
                formComponent.value.handleFinish().then(() => {
                    open.value = false;
                }).catch(() => {
                    // Si hay errores, el modal no se cierra
                });
            }
        };
        const handleCancel = () => {
            if (formComponent.value) {
                formComponent.value.resetForm();  // Llama al método para reiniciar el formulario
            }
            open.value = false;
        };

        const handleFormFinish = (form) => {
            formState.value = { ...form };
            console.log('form', form)

            apiConfigurations('post', formState.value).then(() => {
                formState.value = {};
                current.value = 1;
                fetchData();
            });
        };
        return {
            formRef,
            formState,
            columns,
            dataSource,
            onSearch,
            filterInputs,
            filterOption,
            resetFilters,
            editableData,
            edit,
            cancel,
            save,
            handleAdd,
            count,
            onDelete,
            open,
            showModal,
            handleOk,
            handleFormFinish,
            formComponent,
            modalFielsProps,
            handleCancel,
            current,
            total,
            pagination,
            handleTableChange,
        }
    }
}
</script>

<style scoped>
.filters {
    margin-top: 1%;
    margin-bottom: 1%;
    background-color: var(--mute);
    padding: 2%;
    border-radius: 20px;
}


#components-form-demo-advanced-search .ant-form {
    max-width: none;
}

#components-form-demo-advanced-search .search-result-list {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 2px;

    min-height: 200px;
    text-align: center;
    padding-top: 80px;
}

[data-theme='dark'] .ant-advanced-search-form {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid #434343;
    padding: 24px;
    border-radius: 2px;
}

[data-theme='dark'] #components-form-demo-advanced-search .search-result-list {
    border: 1px dashed #434343;
    background: rgba(255, 255, 255, 0.04);
}

:deep(.ant-table-thead .ant-table-cell) {
    background-color: var(--principal);
    color: white;
}

:deep(.ant-table-thead:hover .ant-table-cell:hover) {
    background-color: var(--mute);
    color: black;
}

:deep(.ant-table-thead .ant-table-column-sort) {
    background-color: var(--secondary) !important;
    color: black !important;
}

.editable-add-btn {
    margin-bottom: 0.5%;
}
</style>
