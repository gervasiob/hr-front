<template>
    <div>
        <div class="header-1">
            <h1 class="title-1">DETALLE DE COTIZACIÓN</h1>
        </div>
        <div class="header-2">
            <h1>DATOS DEL SINIESTRO</h1>
        </div>
    </div>
    <div v-show="type === 'Add'" class="form-item-container mg-bottom">
        <a-form :model="formTenderDetail" name="horizontal_login" layout="inline" autocomplete="off">
            <a-form-item label="Nro Siniestro" name="claim_id"
                :rules="[{ required: false, message: 'Ingrese un valor' }]">
                <a-input v-model:value="formTenderDetail.claim_id">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Compañía" name="company_id" :rules="[{ required: false, message: 'Ingrese un valor' }]">
                <a-select placeholder="Ingrese su búsqueda" v-model:value="formTenderDetail.company_id" allowClear
                    show-search :filter-option="filterOption">
                    <a-select-option v-for="(aseguradora, index) in aseguradoraList" :key="index"
                        :value="aseguradora.value" :label="aseguradora.label">
                        {{ aseguradora.label }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="Estado" name="estado">
                <a-select placeholder="Ingrese su búsqueda" v-model:value="formTenderDetail.quote_state" allowClear
                    show-search :filter-option="filterOption">
                    <a-select-option v-for="(item, index) in estadoList" :key="index" :value="item.value"
                        :label="item.label">
                        {{ item.label }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="Dominio" name="domain" :rules="[{ required: false, message: 'Ingrese un valor' }]">
                <a-input v-model:value="formTenderDetail.tender_data.domain">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Chasis" name="chasis" :rules="[{ required: false, message: 'Ingrese un valor' }]">
                <a-input v-model:value="formTenderDetail.tender_data.chasis">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Marca" name="brand" :rules="[{ required: false, message: 'Ingrese un valor' }]">
                <a-input v-model:value="formTenderDetail.tender_data.brand">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Modelo" name="vehicle" :rules="[{ required: false, message: 'Ingrese un valor' }]">
                <a-input v-model:value="formTenderDetail.tender_data.vehicle">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Año Vehículo" name="vehicle_year"
                :rules="[{ required: false, message: 'Ingrese un valor' }]">
                <a-input v-model:value="formTenderDetail.tender_data.vehicle_year">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Fecha Siniestro" name="claim_date"
                :rules="[{ required: false, message: 'Ingrese un valor' }]">
                <a-input type="date" v-model:value="formTenderDetail.tender_data.claim_date">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Sede" name="sede" :rules="[{ required: false, message: 'Ingrese un valor' }]">
                <a-input v-model:value="formTenderDetail.tender_data.sede">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Nombre Cliente" name="name" :rules="[{ required: false, message: 'Ingrese un valor' }]">
                <a-input v-model:value="formTenderDetail.tender_data.name">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Teléfono" name="phone" :rules="[{ required: false, message: 'Ingrese un valor' }]">
                <a-input v-model:value="formTenderDetail.tender_data.phone">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Agente" name="agent">
                <a-select placeholder="Ingrese su búsqueda" v-model:value="formTenderDetail.agent" allowClear
                    show-search :filter-option="filterOption">
                    <a-select-option v-for="(item, index) in agents" :key="index" :value="item.id"
                        :label="(item.fullName)">
                        {{ item.fullName }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <!-- <a-form-item label="Password" name="password"
                :rules="[{ required: true, message: 'Please input your password!' }]">
                <a-input-password v-model:value="formState.password">
                    <template #prefix>
                        <LockOutlined class="site-form-item-icon" />
                    </template>
                </a-input-password>
            </a-form-item>

            <a-form-item>
                <a-button :disabled="disabled" type="primary" html-type="submit">Log in</a-button>
            </a-form-item> -->
        </a-form>
    </div>
    <div>
        <a-descriptions v-show="type === 'Edit'" class="description-group"
            :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" bordered
            :labelStyle="{ fontWeight: 'bolder', fontSize: '16px' }" :style="{ padding: '1%' }">
            <a-descriptions-item label="Nro Siniestro" class="a-descriptions-item">
                <div class="item-d">
                    {{ formTenderDetail.claim_id
                    }}</div>
            </a-descriptions-item>
            <a-descriptions-item label="Compañía" class="a-descriptions-item">
                <div class="item-d">{{ tenderData.company }}</div>
            </a-descriptions-item>
            <a-descriptions-item label="Estado" class="a-descriptions-item">
                <div class="item-d">
                    <a-badge status="processing" :color="getStateColor(formTenderDetail.quote_state)"
                        :text="getStateLabel(formTenderDetail.quote_state)" />
                </div>
            </a-descriptions-item>
            <a-descriptions-item label="Dominio" class="a-descriptions-item">
                <div class="item-d">{{ tenderData.domain }}</div>
            </a-descriptions-item>
            <a-descriptions-item label="Chasis" class="a-descriptions-item">
                <div class="item-d">{{ tenderData.chasis }}</div>
            </a-descriptions-item>
            <a-descriptions-item label="Marca" class="a-descriptions-item">
                <div class="item-d">{{ tenderData.brand }}</div>
            </a-descriptions-item>
            <a-descriptions-item label="Modelo" class="a-descriptions-item">
                <div class="item-d">{{ tenderData.vehicle }}</div>
            </a-descriptions-item>
            <a-descriptions-item label="Año Vehículo" class="a-descriptions-item">
                <div class="item-d">{{ tenderData.vehicle_year }}</div>
            </a-descriptions-item>
            <a-descriptions-item label="Fecha" class="a-descriptions-item">
                <div class="item-d">{{ tenderData.claim_date }}</div>
            </a-descriptions-item>

        </a-descriptions>
    </div>
    <a-collapse class="collapse-class">
        <a-collapse-panel v-show="type === 'Edit'" key="1" header="INFORMACIÓN EXTRA">
            <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" class="description-group">
                <a-descriptions-item label="Sede">
                    <div class="item-d">{{ tenderData.sede }}</div>
                </a-descriptions-item>
                <a-descriptions-item label="Nombre Cliente">
                    <div class="item-d">{{ tenderData.name }}</div>
                </a-descriptions-item>
                <a-descriptions-item label="Teléfono">
                    <div class="item-d">{{ tenderData.phone }}</div>
                </a-descriptions-item>
                <a-descriptions-item label="Operador">
                    <div class="item-d">{{ tenderData.operador }}</div>
                </a-descriptions-item>
            </a-descriptions>
        </a-collapse-panel>
        <a-collapse-panel key="3" class="collapse-class">
            <template #header>
                <a-descriptions :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
                    :labelStyle="{ fontWeight: 'bold', color: 'white', fontStyle: 'Italic' }">
                    <a-descriptions-item label="COTIZACIÓN"><span class="collapse-item">
                            INFORME</span></a-descriptions-item>
                    <a-descriptions-item label="TOTAL: "><span class="collapse-item">{{
                        formatCurrency(quoteData.total_quoted) }}</span></a-descriptions-item>
                </a-descriptions>
            </template>
            <div class="collapse-body">
                <div class="image-container" v-if="imageUrl">
                    <span>Imágenes</span>
                    <!-- <a-space style="align-items: start;">
                        <span>Imágenes</span>
                        <a-select ref="select" v-model:value="imageSelect"
                            style="width: 300px; border: 2px solid var(--border-item)" @focus="focus"
                            @change="handleImageChange" show-search :filter-option="filterOption" allow-clear
                            placeholder="Seleccione un item">
                            <a-select-option v-for="(image, index) in imageList" :key="index" :value="image.value"
                                :label="image.label">
                                {{ image.label }}
                            </a-select-option>
                        </a-select>
                    </a-space> -->
                    <div v-if="imageUrl" class="image-container-item" @click="showModal">
                        <!-- <img :src="imageUrl" alt="Imagen seleccionada" class="selected-image" /> -->
                        <img :src="imageUrl" alt="Base64 Image" class="selected-image" />
                    </div>
                </div>
                <a-modal v-model:open="isModalVisible" :footer="imageUrl" @cancel="handleModalCancel"
                    style="width: fit-content; height: fit-content;">
                    <!-- <img :src="imageUrl" alt="Imagen ampliada" /> -->
                    <img :src="imageUrl" alt="Base64 Image" />
                </a-modal>
                <!-- <vue-image-lightbox :images="[imageUrl]" :index="currentImageIndex" @close="isModalVisible = false"
                    v-if="isModalVisible" /> -->
                <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">AGREGAR ITEM</a-button>
                <a-table :columns="columns" :data-source="dataSource" bordered :pagination="false">
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="['sku', 'llanta_type', 'quantity'].includes(column.dataIndex)">
                            <div>
                                <a-input v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]"
                                    style="margin: -5px 0;" />
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['type'].includes(column.dataIndex)">
                            <div>
                                <a-select ref="select" v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]"
                                    style="margin: -5px 0;width: 150px;" @focus="focus" @change="handleChange">
                                    <a-select-option value="Neumatico">Neumáticos</a-select-option>
                                    <a-select-option value="Llantas">Llantas</a-select-option>
                                </a-select>
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['vendor_id'].includes(column.dataIndex)">
                            <div>
                                <a-select ref="select" v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0"
                                    @focus="focus" @change="handleChange">
                                    <a-select-option value="Proveedor 1">Proveedor 1</a-select-option>
                                    <a-select-option value="Proveedor 2">Proveedor 2</a-select-option>
                                </a-select>
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['po'].includes(column.dataIndex)">
                            <div>
                                <a-checkbox v-model:checked="editableData[record.key][column.dataIndex]"
                                    v-if="editableData[record.key]" style="margin: -5px 0" @focus="focus"></a-checkbox>
                                <template v-else>
                                    <a-checkbox :checked="text" :disabled="true"></a-checkbox>
                                </template>
                            </div>
                        </template>
                        <template v-if="column.dataIndex === 'ammount_wo_iva'">
                            <a-input v-if="editableData[record.key]"
                                v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0;" />
                            <template v-else>
                                {{ formatCurrency(record.ammount_wo_iva) }}
                            </template>
                        </template>
                        <template v-if="column.dataIndex === 'price'">
                            <a-input v-if="editableData[record.key]"
                                v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0;" />
                            <template v-else>
                                {{ formatCurrency(record.price) }}
                            </template>
                        </template>
                        <template v-else-if="column.dataIndex === 'total'">
                            <div>
                                {{ formatCurrency(record.price * record.quantity) }}
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
                                    <a @click="edit(record.key)">Edit</a>
                                    <a-popconfirm v-if="dataSource.length" title="Confirma eliminación?"
                                        @confirm="onDelete(record.key)">
                                        <a>Eliminar</a>
                                    </a-popconfirm>
                                </span>
                            </div>
                        </template>
                    </template>
                </a-table>
                <a-form layout="horizontal" ref="formRef" :model="formTenderDetail" :rules="rules"
                    :label-col="{ span: 4 }" :wrapper-col="{ span: 6 }">
                    <div class="not-quote">
                        <a-form-item label="NO COTIZAR">
                            <a-switch v-model:checked="formTenderDetail.not_quote"
                                style="background-color: var(--border-item); border: none;" />
                        </a-form-item>
                    </div>
                    <div v-show="!formTenderDetail.not_quote">
                        <a-row>
                            <a-col :span="12">
                                <div class="form-item-container">
                                    <span>Tiempo de Entrega</span>
                                    <a-select v-model:value="formTenderDetail.delivery_time" style="width: 100%"
                                        placeholder="..." :options="optionsDeliveryTime"
                                        @change="handleChangeDeliveryTime" allow-clear show-search
                                        :filter-option="filterOption"></a-select>
                                </div>
                            </a-col>
                            <a-col :span="6">
                                <div class="form-item-container">
                                    <span>Flete</span>
                                    <a-input v-model:value="formTenderDetail.freight" style="width: 100%" allow-clear
                                        show-search></a-input>

                                </div>
                            </a-col>
                            <a-col :span="6">
                                <div class="form-item-container">
                                    <span>Fee</span>
                                    <a-input v-model:value="formTenderDetail.fee"
                                        style="width: 100%; border: 2px solid var(--border-item)"></a-input>
                                </div>
                            </a-col>
                        </a-row>

                        <div style="align-content: center; padding: 2%">
                            <a-button class="editable-add-btn" style="margin-bottom: 8px"
                                @click="handleDetailAdd">AGREGAR
                                ITEM</a-button>
                            <a-table :columns="columnsQuote" :data-source="dataQuoteSource" bordered
                                :pagination="false">
                                <template #bodyCell="{ column, text, record }">
                                    <template
                                        v-if="['tire_type_name', 'llanta', 'neumatico'].includes(column.dataIndex)">
                                        <div>
                                            <a-input v-if="editableQuoteData[record.key]"
                                                v-model:value="editableQuoteData[record.key][column.dataIndex]"
                                                style="margin: -5px 0" />
                                            <template v-else>
                                                <template v-if="['llanta', 'neumatico'].includes(column.dataIndex)">
                                                    <div>
                                                        {{ formatCurrency(text) }}
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    {{ text }}
                                                </template>
                                            </template>
                                        </div>
                                    </template>
                                    <template v-if="['type'].includes(column.dataIndex)">
                                        <div>
                                            <a-select ref="select" v-if="editableQuoteData[record.key]"
                                                v-model:value="editableQuoteData[record.key][column.dataIndex]"
                                                style="margin: -5px 0" @focus="focus" @change="handleChange">
                                                <a-select-option value="Neumaticos">Neumáticos</a-select-option>
                                                <a-select-option value="Llantas">Llantas</a-select-option>
                                            </a-select>
                                            <template v-else>
                                                {{ text }}
                                            </template>
                                        </div>
                                    </template>

                                    <template v-else-if="column.dataIndex === 'operation'">
                                        <div class="editable-row-operations">
                                            <span v-if="editableQuoteData[record.key]">
                                                <a-typography-link
                                                    @click="saveQuote(record.key)">Save</a-typography-link>
                                                <a-popconfirm title="Confirma cancelar?"
                                                    @confirm="cancelQuote(record.key)">
                                                    <a>Cancel</a>
                                                </a-popconfirm>

                                            </span>
                                            <span v-else>
                                                <a @click="editQuote(record.key)">Edit</a>
                                                <a-popconfirm v-if="dataQuoteSource.length"
                                                    title="Confirma eliminación?" @confirm="onDeleteQuote(record.key)">
                                                    <a>Eliminar</a>
                                                </a-popconfirm>
                                            </span>
                                        </div>
                                    </template>
                                </template>
                            </a-table>
                        </div>

                        <a-row style="margin-top: 2%;" :gutter="24">
                            <a-col :span="3">
                                <div class="">
                                    <span>Ancho</span>
                                    <a-select v-model:value="formTenderDetail.tire_width" style="width: 100%"
                                        :options="optionsTireWidth" allow-clear show-search
                                        :filter-option="filterOption"></a-select>
                                </div>
                            </a-col>
                            <a-col :span="3">
                                <div class="">
                                    <span>Alto</span>
                                    <a-select v-model:value="formTenderDetail.tire_height" style="width: 100%"
                                        placeholder="..." :options="optionsTireHeight" allow-clear show-search
                                        :filter-option="filterOption"></a-select>
                                </div>
                            </a-col>
                            <a-col :span="3">
                                <div class="">
                                    <span>Rodado</span>
                                    <a-select v-model:value="formTenderDetail.tire_tread" style="width: 100%"
                                        placeholder="..." :options="optionsTireTread" allow-clear show-search
                                        :filter-option="filterOption"></a-select>
                                </div>
                            </a-col>
                            <a-col :span="10" :offset="5">
                                <div class="form-item-container label-top">
                                    <span>Descripción</span>
                                    <a-textarea :rows="4" v-model:value="formTenderDetail.description"
                                        style="width: 100%;  border: 2px solid var(--border-item)"></a-textarea>
                                </div>
                            </a-col>
                        </a-row>
                        <a-row :gutter="24">
                            <a-col :span="8">
                                <div class="form-item-container">
                                    <span>Marca</span>
                                    <div class="input-select">
                                        <a-select v-model:value="formTenderDetail.brand" placeholder="..."
                                            style="width:100%" :options="optionsBrand" allow-clear show-search
                                            :filter-option="filterOption"></a-select>
                                    </div>
                                </div>
                                <div class="form-item-container">
                                    <span>Modelo Neumático</span>
                                    <div class="input-select">
                                        <a-select v-model:value="formTenderDetail.tire_model" style="width: 100%"
                                            placeholder="..." :options="optionsModel" allow-clear show-search
                                            :filter-option="filterOption"></a-select>
                                    </div>
                                </div>
                                <div class="form-item-container">
                                    <span>Tipo de Llanta</span>
                                    <div class="input-select">
                                        <a-select v-model:value="formTenderDetail.llanta_type" style="width: 100%"
                                            placeholder="..." :options="optionsLlantaType" allow-clear show-search
                                            :filter-option="filterOption"></a-select>
                                    </div>
                                </div>

                            </a-col>
                            <a-col :span="6">
                                <!-- <div v-show="newCost">
                                    <a-descriptions title="Costos" bordered>
                                        <template v-for="(item, index) in newCost.spare_tire_amounts" :key="index">
                                            <a-descriptions-item label="Detalle">{{
                                                item.detail }}</a-descriptions-item>
                                            <a-descriptions-item label="Costo">{{
                                                item.cost_amount }}</a-descriptions-item>

                                        </template>
                                    </a-descriptions>
                                </div> -->
                                <a-button type="primary" @click="handleGetCost()" :loading="isLoading">Buscar
                                    Costo</a-button>
                            </a-col>
                            <a-col :span="10">
                                <div class="form-item-container">
                                    <span>Estoy Cotizando</span>
                                    <a-select v-model:value="formTenderDetail.tire_quoted" style="width: 100%"
                                        placeholder="..." :options="optionsQuoteDetails" allow-clear show-search
                                        :filter-option="filterOption"></a-select>
                                </div>
                                <div class="form-item-container">
                                    <span>Sucursal</span>
                                    <a-select v-model:value="formTenderDetail.daytona_ids" style="width: 100%"
                                        mode="multiple" placeholder="Please select" :options="optionsDaytonas"
                                        allow-clear show-search :filter-option="filterOption"></a-select>
                                </div>

                            </a-col>
                        </a-row>

                    </div>
                    <div class="form-item-container label-top">
                        <span>Observaciones</span>
                        <a-textarea v-model:value="formTenderDetail.obs" :rows="4"
                            style=" border: 2px solid var(--border-item)" />
                    </div>
                </a-form>
                <div v-show="!formTenderDetail.not_quote">
                    <a-form layout="inline" :model="formTenderDetail" :wrapper-col="{ span: 16 }" :rules="rules">

                    </a-form>

                </div>
                <a-divider style="border-color: #563CCA" dashed />
                <div
                    v-if="formTenderDetail.quote_state === 'N' || formTenderDetail.quote_state === 'E' || formTenderDetail.quote_state === 'C'">
                    <a-row>
                        <a-col :span="8">
                            <a-button type="primary" size="large" class="hover-button-grey" @click="onSave('C')"
                                :loading="isLoading">Cancelar</a-button>
                        </a-col>
                        <a-col :span="8" :offset="8">
                            <a-button type="primary" size="large" @click="onSave('E')"
                                :loading="isLoading">Guardar</a-button>
                            <a-alert v-if="errorMessage" type="error" :message="errorMessage" />
                        </a-col>
                    </a-row>
                </div>
                <!-- Colocar que se vea según el estado -->
                <div v-if="formTenderDetail.quote_state === 'E' || formTenderDetail.quote_state === 'V'">
                    <a-row>
                        <a-col :span="8" v-if="formTenderDetail.quote_state === 'V'">
                            <a-button type="primary" size="large" danger @click="onSave('R')"
                                :loading="isLoading">Cancelar
                                Presupuesto</a-button>
                        </a-col>
                        <a-col :span="8" :offset="8">
                            <a-button type="primary" size="large" class="hover-button" @click="onSave('V')"
                                :loading="isLoading">Licitar</a-button>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </a-collapse-panel>
    </a-collapse>
</template>

<script>
import { cloneDeep } from 'lodash-es';
import { ref, onMounted, watch, reactive, toRaw, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getTendersIndex } from '@/api/tenders/tenders.js';
import { getQuotes, addQuotes, updateQuotes } from '@/api/quotes/quotes.js';
import { getTireCost } from '@/api/costs/costs.js';
import { tableColumns } from '../config/columnsDetail.js';
import { tableQuoteColumns } from '../config/columnsQuote.js';
import {
    TENDER_STATES, DELIVERY_TIMES, TIRE_BRANDS, MODELS, LLANTA_TYPES,
    TIRE_HEIGHT, TIRE_WIDTH, TIRE_TREAD, DAYTONAS, QUOTE_DETAILS, ASEGURADORAS
} from '@/common/common';
import { dataTable } from './data';
import { formRules } from '../config/rules.js';
import { formatCurrency, formatNumber } from '@/utils/utils.js';
import { getUsers } from '@/api/users/users.js';
export default {
    name: 'TenderDetail',
    setup() {
        const route = useRoute();
        const routeName = ref(route.path);
        const isLoading = ref(false);
        const formRef = ref();
        const rules = formRules;
        const errorMessage = ref('');
        let tenderId = ref(route.params.id);
        const tenderData = ref({});
        const quoteData = ref({});
        const imageData = ref();
        const dataSource = ref([]);
        const dataQuoteSource = ref([]);
        const quoteId = ref();
        const newCost = ref({ spare_tire_amount: [] });
        const columns = tableColumns;
        const columnsQuote = tableQuoteColumns;
        const optionsDeliveryTime = DELIVERY_TIMES;
        const optionsBrand = TIRE_BRANDS;
        const optionsModel = MODELS;
        const optionsLlantaType = LLANTA_TYPES;
        const optionsTireWidth = TIRE_WIDTH;
        const optionsTireHeight = TIRE_HEIGHT;
        const optionsTireTread = TIRE_TREAD;
        const optionsQuoteDetails = QUOTE_DETAILS;
        const loading = ref(false);
        const error = ref(null);
        const type = ref('Edit');
        const aseguradoraList = ASEGURADORAS;
        const roles = ref(2); // Define roles como un ref para que sea reactivo
        const agents = ref([]); // Define agents como un ref para almacenar los agentes

        const estadoList = TENDER_STATES;
        const optionsDaytonas = DAYTONAS.map(daytona => ({
            label: `${daytona.businessName} - ${daytona.completeAddress}`,
            value: daytona.idClaimsProvider
        }));
        const formTenderDetail = ref({
            not_quote: false,
            delivery_time: '',
            original_parts: '',
            spare_tire_amount: '',
            brand: '',
            tire_model: '',
            llanta_type: '',
            tire_width: '',
            tire_height: '',
            tire_tread: '',
            obs: '',
            tire_type_name: 'Auxilio',
            tire_quoted: '',
            daytona_ids: [],
            quote_detail: '',
            quote_state: '',
            spare_tire_amount: 0,
            tenderData: { domain: '' },
            tender_data: { domain: '' },
            original_parts: null,
        });
        const imageList = ref([
            {
                value: 1,
                label: 'img 1',
                url: 'https://img.zsmotor.cl/wp-content/uploads/2023/01/Screenshot_4-3-1024x609.jpg'
            },
            {
                value: 2,
                label: 'img 2',
                url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS695Vd-2JpJc0h_VZD80pr9a48mYY5gFQkGg&s'
            },
            {
                value: 3,
                label: 'img 3',
                url: 'https://www.autonocion.com/wp-content/uploads/2016/06/C%C3%B3digos-neum%C3%A1ticos-1.jpg'
            },
        ]);
        const imageSelect = ref();
        const imageUrl = ref();
        const editableData = reactive({});
        const editableQuoteData = reactive({});
        const selectedOption = ref(null);
        const isModalVisible = ref(false);
        const currentImageIndex = ref(0);
        const edit = key => {
            editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
        };
        const editQuote = key => {
            editableQuoteData[key] = cloneDeep(dataQuoteSource.value.filter(item => key === item.key)[0]);
        };
        const save = key => {
            const record = dataSource.value.find(item => key === item.key);
            Object.assign(record, editableData[key]);
            record.total = record.price * record.quantity;
            delete editableData[key];
        };
        const cancel = key => {
            delete editableData[key];
            if (!key.type) {
                onDelete(key);
            }
        };
        const saveQuote = key => {
            const record = dataQuoteSource.value.find(item => key === item.key);
            Object.assign(record, editableQuoteData[key]);
            delete editableQuoteData[key];
        };
        const cancelQuote = key => {
            delete editableQuoteData[key];
            onDeleteQuote(key);
        };

        const fetchTenderData = async (id) => {
            console.log('id')
            console.log(id)
            try {
                const response = await getTendersIndex({ claim_id: id });
                tenderData.value = response[0]; //!! Importante ver que solo devuelva 1 solo
                const agentsResponse = await getUsers({ roles: roles.value });
                const transformedAgents = agentsResponse.map((item) => {
                    return {
                        ...item,
                        fullName: item.username,
                    };
                });
                agents.value = transformedAgents;
                const params = {
                    claim_id: id,
                };
                const quoteResponse = await getQuotes(params);
                quoteData.value = quoteResponse[0];
                quoteId.value = quoteData.value.id;
                if (Array.isArray(quoteData.value.details)) {
                    quoteData.value.details.map((item) => {
                        dataSource.value.push(item)
                    })
                    dataSource.value = quoteData.value.map((item, index) => ({
                        ...item,
                        key: index
                    }));
                } else {
                    dataSource.value.push(quoteData.value.details);
                }
                // quoteData.value.tire_type_name.map((item) => {
                //     console.log(item,'tire_type_name')
                //     dataQuoteSource.value.push(item)
                // })


                let records = [];
                records = quoteResponse[0].tire_type_name;
                console.log('tire type', records)
                if (Array.isArray(records)) {
                    records.map((item) => {
                        dataQuoteSource.value.push(
                            {
                                tire_type_name: item.tire_type_name,
                                llanta: item.Llanta,
                                neumatico: item.Neumatico,
                            }
                        );
                    });
                    dataQuoteSource.value = dataQuoteSource.value.map((item, index) => ({
                        ...item,
                        key: index
                    }));
                    console.log('data quote source', dataQuoteSource.value)
                } else {
                    console.error("Expected records to be an array, but got:", typeof records);
                }
                let deliveryTime = parseInt(quoteData.value.delivery_time);
                if (deliveryTime > 5) {
                    deliveryTime = 18;
                }
                console.log('quoteData', quoteData.value)
                let brandObject = optionsBrand.find((item) => item.label === quoteData.value.brand);
                let brand = '';
                if (brandObject) {
                    brand = brandObject.value;
                }
                const quoteDataValue = {
                    ...quoteData.value,
                    brand: brand,
                    delivery_time: deliveryTime,
                    tire_model: parseInt(quoteData.value.tire_model),
                    llanta_type: parseInt(quoteData.value.llanta_type),
                };
                console.log('quoteDAtaVAlue', quoteDataValue)
                if (quoteData.value.image_data) {
                    imageData.value = 'data:image/jpeg;base64,' + quoteData.value.image_data;
                    imageUrl.value = imageData.value;
                }
                formTenderDetail.value = quoteDataValue;
                console.log('form Tender Detail nuevos datos - quoteDataValue', quoteDataValue)
                console.log('form Tender Detail nuevos datos - formTEnderDetail', formTenderDetail.value)
                if (!formTenderDetail.value.daytona_ids) {
                    formTenderDetail.value.daytona_ids = [];
                }
                if (!formTenderDetail.value.brand) {
                    formTenderDetail.value.brand = [];
                }
                if (!formTenderDetail.value.tire_model) {
                    formTenderDetail.value.tire_model = [];
                }
                if (!formTenderDetail.value.llanta_type) {
                    formTenderDetail.value.llanta_type = [];
                }

            } catch (error) {
                console.error('Error fetching tender data:', error);
            }
        };

        const getStateColor = (stateValue) => {
            const state = TENDER_STATES.find(s => s.value === stateValue);
            return state ? state.color : 'default';
        };

        const getStateLabel = (stateValue) => {
            const state = TENDER_STATES.find(s => s.value === stateValue);
            return state ? state.label : stateValue;
        };
        const filterOption = (input, option) => {
            console.log(input)
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        const onSave = async (value) => {
            isLoading.value = true;
            errorMessage.value = '';
            console.log(formTenderDetail.value, 'on save')
            formRef.value
                .validate().then(async () => {
                    try {
                        const params = formTenderDetail.value; // O ajusta según necesites
                        console.log('formTernder details ', formTenderDetail.value)
                        let brandObject = optionsBrand.find((item) => item.value === formTenderDetail.value.brand);
                        console.log('brand Object', brandObject)
                        if (brandObject) {
                            params.brand = brandObject.label;
                            console.log('params', params)
                        }
                        params.quote_state = value;
                        let fullParams = {
                            ...params,
                            details: dataSource.value,
                            tire_type_name: dataQuoteSource.value,
                        }
                        console.log(fullParams)
                        let response;
                        if (type.value === 'Edit') {
                            console.log('Edit')
                            response = updateQuotes(quoteId.value, fullParams);
                        }
                        if (type.value === 'Add') {
                            console.log('Add')
                            fullParams = {
                                ...fullParams,
                                tire_quoted: 0,
                                user_id: 1,
                            }
                            response = addQuotes(fullParams);
                            tenderId.value = response.claim_id;
                        }
                        console.log('Response:', response);
                        dataSource.value = [];
                        dataQuoteSource.value = [];
                        if (tenderId.value) {
                            await fetchTenderData(tenderId.value);
                        }
                        // Aquí puedes manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
                    } catch (error) {
                        console.error('Error updating quotes:', error);
                        errorMessage.value = 'Error actualizando las cotizaciones: ' + error;
                    } finally {
                        isLoading.value = false;
                    }

                    console.log('Save:', toRaw(formTenderDetail.value));
                })


        };
        const onCancel = () => {
            isLoading.value = true;
            errorMessage.value = '';
            try {
                const params = {
                    id: formTenderDetail.value.id,
                    claim_state: 'C',
                }; // O ajusta según necesites
                const response = updateQuotes(quoteId.value, params);
                console.log('Response:', response);
                // Aquí puedes manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
            } catch (error) {
                console.error('Error updating quotes:', error);
                errorMessage.value = 'Error actualizando las cotizaciones: ' + error;
            } finally {
                isLoading.value = false;
            }
            console.log('cancel!', toRaw(formTenderDetail));
        };
        const onLicitar = () => {
            isLoading.value = true;
            errorMessage.value = '';
            try {
                const params = {
                    id: formTenderDetail.value.id,
                    claim_state: 'V',
                }; // O ajusta según necesites
                const response = updateQuotes(quoteId.value, params);
                console.log('Response:', response);
                // Aquí puedes manejar la respuesta, por ejemplo, mostrar un mensaje de éxito
            } catch (error) {
                console.error('Error updating quotes:', error);
                errorMessage.value = 'Error actualizando las cotizaciones: ' + error;
            } finally {
                isLoading.value = false;
            }
            console.log('licitado!', toRaw(formTenderDetail));
        };
        const onDelete = key => {
            dataSource.value = dataSource.value.filter(item => item.key !== key);
        };
        const onDeleteQuote = key => {
            dataQuoteSource.value = dataQuoteSource.value.filter(item => item.key !== key);
        };
        const handleChangeDeliveryTime = () => {
            console.log('handle dT');
        }
        const handleModalCancel = () => {
            console.log('handle Cancel Modal');
            isModalVisible.value = false;
        }
        const showModal = () => {
            isModalVisible.value = true;
            console.log('handle open Modal');
        }
        const handleImageChange = () => {
            if (imageSelect.value) {
                imageUrl.value = imageList.value.find((item) => item.value === imageSelect.value).url;
            } else {
                imageUrl.value = null;
            }
            console.log(imageUrl.value);
        }

        const count = computed(() => {
            if (dataSource.value) {
                return dataSource.value.length + 1
            }
            return 0;
        });
        const handleAdd = () => {
            const newKey = `${count.value}`;
            const newData = {
                key: newKey,
                type: '',
                sku: '',
                llanta_type: '',
                vendor: '',
                po: false,
                price: 0,
                quantity: 0,
                total: 0,
            };
            dataSource.value.push(newData);
            editableData[newKey] = cloneDeep(newData);
        };
        const countDetail = computed(() => {
            if (dataQuoteSource.value) {
                return dataQuoteSource.value.length + 1
            }
            return 0;
        });
        const handleDetailAdd = () => {
            const newKey = `${countDetail.value}`;
            const newData = {
                key: newKey,
                tire_type_name: '',
                Llanta: 0,
                Neumatico: 0,
                type: '',
            };
            dataQuoteSource.value.push(newData);
            editableQuoteData[newKey] = cloneDeep(newData);
        };
        onMounted(() => {
            tenderId.value = route.params.id;
            console.log(tenderId.value)
            if (tenderId.value) {
                type.value = 'Edit';
                fetchTenderData(tenderId.value);
            } else {
                type.value = 'Add';
                formTenderDetail.value = {
                    not_quote: false,
                    delivery_time: '',
                    original_parts: '',
                    spare_tire_amount: '',
                    brand: '',
                    tire_model: '',
                    llanta_type: '',
                    tire_width: '',
                    tire_height: '',
                    tire_tread: '',
                    obs: '',
                    tire_type_name: 'Auxilio',
                    tire_quoted: '',
                    daytona_ids: [],
                    quote_detail: '',
                    quote_state: 'N',
                    original_parts: null,
                    spare_tire_amount: 0,
                    tender_data: {
                        domain: '',
                    },
                    tenderData: {
                        domain: '',
                    },
                }
            }
        });
        const handleGetCost = async () => {
            loading.value = true;
            error.value = null;
            newCost.value = { spare_tire_amount: [] };
            const brandName = optionsBrand.find((item) => item.value === formTenderDetail.value.brand).label;
            try {
                const params = {
                    tire_width: formTenderDetail.value.tire_width,
                    tire_height: formTenderDetail.value.tire_height,
                    tire_tread: formTenderDetail.value.tire_tread,
                    brand: brandName,
                }
                const costResponse = await getTireCost(params);
                newCost.value = costResponse;
                console.log("cost response")
                console.log(costResponse)

                dataQuoteSource.value = dataQuoteSource.value.map((item) => {
                    item.neumatico = newCost.value.spare_tire_amounts[0].cost_amount;
                    return item;
                });

                console.log("data", dataQuoteSource.value)
                console.log("newcost", newCost.value.spare_tire_amounts[0].cost_amount)
            } catch (err) {
                error.value = err;
            } finally {
                loading.value = false;
            }
        };
        watch(
            () => route.path,
            (_newValue) => {
                routeName.value = _newValue;
                if (routeName.value === '/nueva-licitacion') {
                    location.reload();
                }
            }
        );
        return {
            tenderId,
            tenderData,
            getStateColor,
            getStateLabel,
            quoteData,
            formTenderDetail,
            onSave,
            onCancel,
            columns,
            columnsQuote,
            dataSource,
            editableData,
            editableQuoteData,
            edit,
            editQuote,
            save,
            cancel,
            saveQuote,
            cancelQuote,
            optionsDeliveryTime,
            handleChangeDeliveryTime,
            optionsBrand,
            optionsModel,
            optionsLlantaType,
            optionsTireWidth,
            optionsTireHeight,
            optionsTireTread,
            filterOption,
            optionsDaytonas,
            optionsQuoteDetails,
            handleAdd,
            count,
            onDelete,
            onDeleteQuote,
            isLoading,
            errorMessage,
            quoteId,
            formRef,
            rules,
            onLicitar,
            dataQuoteSource,
            countDetail,
            handleDetailAdd,
            imageSelect,
            handleImageChange,
            imageList,
            imageUrl,
            selectedOption,
            isModalVisible,
            handleModalCancel,
            showModal,
            currentImageIndex,
            imageData,
            handleGetCost,
            newCost,
            loading,
            error,
            formatCurrency,
            formatNumber,
            type,
            routeName,
            aseguradoraList,
            agents,
            estadoList,
        }
    }
}
</script>

<style scoped>
.large-tag {
    font-size: 18px;
    /* Ajusta el tamaño según tus necesidades */
    padding: 5px 10px;
    /* Puedes ajustar el padding también */
}

:deep(.ant-descriptions-row) {
    border: none;
}

:deep(.a-descriptions-item) {
    border: none;
}

.description-group {

    /* Esto hace que los bordes sean redondeados */
}

.item-d {
    border: 3px solid var(--border-item);
    border-radius: 20px;
    width: 200px;
    height: 50px;
    text-align: center;
    align-content: center;

}

.editable-add-btn {
    margin-bottom: 8px;
    align-self: left;
    border: 1px solid var(--principal);
    color: var(--principal);
}

.editable-add-btn:hover {
    margin-bottom: 8px;
    align-self: left;
    border: 1px solid var(--secondary);
    color: var(--secondary);
}

.hover-button {
    background-color: green;
    /* Color de fondo inicial */
    color: white;
    /* Color de texto */
}

.hover-button:hover {
    background-color: rgb(125, 201, 125);
    /* Color de fondo al pasar el mouse */
}

.hover-button-grey {
    background-color: grey;
    /* Color de fondo inicial */
    color: white;
    /* Color de texto */
}

.hover-button-grey:hover {
    background-color: lightgray;
    /* Color de fondo al pasar el mouse */
}

.header-1 {
    background-color: #282828;
    color: #ffffff;
    text-align: start;
    margin-bottom: 0%;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 5%;
}

.title-1 {
    margin-left: 35%;
}

.header-2 {
    background-color: #3C3D3C;
    color: #ffffff;
    align-items: center;
    font-style: italic;
    margin-top: 0%;
    margin-bottom: 1%;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    height: 5%;
}

.collapse-class {
    background-color: var(--principal);
    border: none;
}

.collapse-body {
    background-color: var(--back);
    padding: 1%;
}

.collapse-body span {
    font-weight: bold;
    text-align: left;
    width: 120px;
}

.input-select {
    width: 180px;
}

:deep(label) {
    font-weight: bold;
}

.collapse-item {
    color: white;
    font-style: italic;
}

:deep(.ant-collapse) {}

:deep(.ant-collapse-header-text) {
    color: white;
    font-weight: bold;
    text-align: left;
}

:deep(.ant-collapse-expand-icon) {
    color: white;
}

:deep(.ant-table-thead .ant-table-cell) {
    background-color: var(--border-item);
    color: white;
}

:deep(.ant-table) {
    border: 6px solid var(--border-item);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

:deep(.ant-table-cell) {
    border: 1em thick var(--border-item);
}

:deep(.ant-table-thead:hover .ant-table-cell:hover) {
    background-color: var(--mute);
    color: rgb(41, 35, 35);
}

:deep(.ant-switch-checked) {
    background-color: var(--principal) !important;
}

.not-quote {}

.form-item-container {
    display: flex;
    align-items: center;
    padding-right: 5%;
    white-space: nowrap;
    margin-bottom: 2%;
}

.form-item-container span {
    margin-right: 20px;
    /* Espacio entre el span y el select */
}

.form-item-container a-select {
    flex-grow: 1;
}

.label-top {
    align-items: normal !important;
}

:deep(.ant-select-selector) {
    border: 2px solid var(--border-item) !important;
}

:deep(.ant-input-affix-wrapper) {
    border: 2px solid var(--border-item) !important;
}

.image-container {
    display: flex;
    width: 400px;
    height: 250px;
    align-content: center;
    margin-bottom: 10px;

}

.image-container-item {
    margin-left: 10%;
}

.selected-image {
    max-width: 400px;
    max-height: 250px;
}

.mg-bottom .ant-form-item {
    margin-bottom: 10px;
    width: 15%;
}
</style>