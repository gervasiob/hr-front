<template>
    <div>
        <div class="header-1">
            <h1 class="title-1" v-if="type === 'Add'">DETALLE DE NUEVA COTIZACIÓN</h1>
            <h1 class="title-1" v-else>DETALLE DE COTIZACIÓN</h1>
        </div>
        <div class="header-2">
            <h1>DATOS DEL SINIESTRO</h1>
        </div>
    </div>
    <div v-show="type === 'Add'" class="form-item-container mg-bottom">
        <a-form :model="formTenderDetail" name="horizontal_login" layout="inline" autocomplete="off">
            <a-form-item label="Nro Siniestro" name="claim_id"
                :rules="[{ required: false, message: 'Ingrese un valor' }]">
                <a-input class="input-item" v-model:value="formTenderDetail.claim_id" />
            </a-form-item>
            <a-form-item label="Compañía" name="company_id" :rules="[{ required: false, message: 'Ingrese un valor' }]">
                <a-select placeholder="Ingrese su búsqueda" style="min-width: 120px"
                    v-model:value="formTenderDetail.company_id" allowClear show-search :filter-option="filterOption"
                    @change="handleChangeAseguradora">
                    <a-select-option v-for="(aseguradora, index) in aseguradoraList" :key="index"
                        :value="aseguradora.value" :label="aseguradora.label">
                        {{ aseguradora.label }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="Estado" name="estado">
                <a-select placeholder="Ingrese su búsqueda" style="min-width: 130px"
                    v-model:value="formTenderDetail.quote_state" allowClear show-search :filter-option="filterOption">
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
            <a-form-item label="Localidad" name="city" :rules="[{ required: false, message: 'Ingrese un valor' }]">
                <a-input v-model:value="formTenderDetail.tender_data.city">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Provincia" name="province" :rules="[{ required: false, message: 'Ingrese un valor' }]">
                <a-input v-model:value="formTenderDetail.tender_data.province">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Gestor" name="agent">
                <a-select placeholder="Ingrese su búsqueda" style="min-width: 100px"
                    v-model:value="formTenderDetail.user" allowClear show-search :filter-option="filterOption">
                    <a-select-option v-for="(item, index) in agents" :key="index" :value="item.id"
                        :label="(item.fullName)">
                        {{ item.fullName }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="Plataforma" name="platform">
                <a-select placeholder="Ingrese su búsqueda" style="min-width: 100px"
                    v-model:value="formTenderDetail.platform" allowClear show-search :filter-option="filterOption"
                    @change="handleChangeAseguradora">
                    <a-select-option v-for="(item, index) in platformList" :key="index" :value="item.name"
                        :label="(item.name)">
                        {{ item.name }}
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
                <div class="item-d">{{ formTenderDetail.company_name }}</div>
            </a-descriptions-item>
            <a-descriptions-item label="Estado" class="a-descriptions-item">
                <div class="item-d">
                    <a-badge status="processing" :color="getStateColor(formTenderDetail.quote_state)"
                        :text="getStateLabel(formTenderDetail.quote_state)" />
                </div>
            </a-descriptions-item>
            <a-descriptions-item label="Dominio" class="a-descriptions-item">
                <div class="item-d" :class="{ 'no-background': handleEdit }">
                    <a-input v-model:value="formTenderDetail.tender_data.domain" :readonly="handleEdit" />
                </div>
            </a-descriptions-item>
            <a-descriptions-item label="Chasis" class="a-descriptions-item">
                <div class="item-d" :class="{ 'no-background': handleEdit }">
                    <a-input v-model:value="formTenderDetail.tender_data.chasis" :readonly="handleEdit" />
                </div>
            </a-descriptions-item>
            <a-descriptions-item label="Marca" class="a-descriptions-item">
                <div class="item-d" :class="{ 'no-background': handleEdit }">
                    <a-input v-model:value="formTenderDetail.tender_data.brand" :readonly="handleEdit" />
                </div>
            </a-descriptions-item>
            <a-descriptions-item label="Modelo" class="a-descriptions-item">
                <div class="item-d" :class="{ 'no-background': handleEdit }">
                    <a-input v-model:value="formTenderDetail.tender_data.vehicle" :readonly="handleEdit" />
                </div>
            </a-descriptions-item>
            <a-descriptions-item label="Año Vehículo" class="a-descriptions-item">
                <div class="item-d" :class="{ 'no-background': handleEdit }">
                    <a-input v-model:value="formTenderDetail.tender_data.vehicle" :readonly="handleEdit" />
                </div>
            </a-descriptions-item>
            <a-descriptions-item label="Fecha" class="a-descriptions-item">
                <div class="item-d" :class="{ 'no-background': handleEdit }">
                    <a-input v-model:value="formTenderDetail.tender_data.claim_date" :readonly="handleEdit" />
                </div>
            </a-descriptions-item>
            <a-descriptions-item label="Plataforma" class="a-descriptions-item">
                <div class="item-d">{{ formTenderDetail.platform }}</div>
            </a-descriptions-item>

        </a-descriptions>
    </div>
    <a-collapse class="collapse-class">
        <a-collapse-panel v-show="type === 'Edit'" key="1" header="INFORMACIÓN EXTRA">
            <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" class="description-group">
                <a-descriptions-item label="Nombre Cliente">
                    <div class="item-d" :class="{ 'no-background': handleEdit }">
                        <a-input v-model:value="formTenderDetail.tender_data.name" :readonly="handleEdit" />
                    </div>
                </a-descriptions-item>
                <a-descriptions-item label="Teléfono">
                    <div class="item-d" :class="{ 'no-background': handleEdit }">
                        <a-input v-model:value="formTenderDetail.tender_data.phone" :readonly="handleEdit" />
                    </div>
                </a-descriptions-item>
                <a-descriptions-item label="Localidad">
                    <div class="item-d" :class="{ 'no-background': handleEdit }">
                        <a-input v-model:value="formTenderDetail.tender_data.city" :readonly="handleEdit" />
                    </div>
                </a-descriptions-item>
                <a-descriptions-item label="Provincia">
                    <div class="item-d" :class="{ 'no-background': handleEdit }">
                        <a-input v-model:value="formTenderDetail.tender_data.province" :readonly="handleEdit" />
                    </div>
                </a-descriptions-item>
                <a-descriptions-item label="Gestor">
                    <div class="item-d" :class="{ 'no-background': handleEdit }">
                        <a-select placeholder="Ingrese su búsqueda" v-model:value="formTenderDetail.user" allowClear
                            show-search :filter-option="filterOption">
                            <a-select-option v-for="(item, index) in agents" :key="index" :value="item.id"
                                :label="(item.fullName)">
                                {{ item.fullName }}
                            </a-select-option>
                        </a-select>
                    </div>
                </a-descriptions-item>
            </a-descriptions>
        </a-collapse-panel>
        <a-collapse-panel key="3" class="collapse-class">
            <template #header>
                <a-descriptions :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
                    :labelStyle="{ fontWeight: 'bold', color: 'white', fontStyle: 'Italic' }">
                    <a-descriptions-item label="COTIZACIÓN"><span class="collapse-item">
                            INFORME</span></a-descriptions-item>
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

                <a-form layout="horizontal" ref="formRef" :model="formTenderDetail" :rules="rules"
                    :label-col="{ span: 4 }" :wrapper-col="{ span: 6 }">
                    <div class="not-quote">
                        <a-form-item label="NO COTIZAR">
                            <a-switch v-model:checked="formTenderDetail.not_quote"
                                style="background-color: var(--border-item); border: none; margin: 1%;" />
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
                                    <RobotOutlined class="ia-check" v-show="iaCheck.includes('fee_margen')" />
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
                                        v-if="['Llanta', 'Neumatico', 'tire_type_name'].includes(column.dataIndex)">
                                        <div>
                                            <a-input v-if="editableQuoteData[record.key]"
                                                v-model:value="editableQuoteData[record.key][column.dataIndex]"
                                                style="margin: -5px 0" />
                                            <template v-else>
                                                <template v-if="['Llanta', 'Neumatico'].includes(column.dataIndex)">
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
                                    <!-- <template v-if="['tire_type_name'].includes(column.dataIndex)">
                                        <div>
                                            <a-select ref="select" v-if="editableQuoteData[record.key]"
                                                v-model:value="editableQuoteData[record.key][column.dataIndex]"
                                                style="margin: -5px 0" @focus="focus" @change="handleChange">
                                                <a-select-option value="Auxilio">Auxilio</a-select-option>
                                                <a-select-option value="Delantera derecha">Delantera
                                                    derecha</a-select-option>
                                                <a-select-option value="Delantera izquierda">Delantera
                                                    izquierda</a-select-option>
                                                <a-select-option value="Trasera derecha">Trasera
                                                    derecha</a-select-option>
                                                <a-select-option value="Trasera izquierda">Trasera
                                                    izquierda</a-select-option>
                                            </a-select>
                                            <template v-else>
                                                {{ text }}
                                            </template>
                                        </div>
                                    </template> -->

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
                            <RobotOutlined class="ia-check" v-show="iaCheck.includes('tire_type_name')" />
                        </div>

                        <a-row style="margin-top: 2%; align-content: center; padding-left: 2%" :gutter="24">
                            <a-col :span="3">
                                <div class="">
                                    <span>Ancho</span>
                                    <a-select v-model:value="formTenderDetail.tire_width" style="width: 100%"
                                        :options="optionsTireWidth" allow-clear show-search
                                        :filter-option="filterOption"></a-select>
                                    <RobotOutlined class="ia-check" v-show="iaCheck.includes('tire_width')" />
                                </div>
                            </a-col>
                            <a-col :span="3">
                                <div class="">
                                    <span>Alto</span>
                                    <a-select v-model:value="formTenderDetail.tire_height" style="width: 100%"
                                        placeholder="..." :options="optionsTireHeight" allow-clear show-search
                                        :filter-option="filterOption"></a-select>
                                    <RobotOutlined class="ia-check" v-show="iaCheck.includes('tire_height')" />
                                </div>
                            </a-col>
                            <a-col :span="3">
                                <div class="">
                                    <span>Rodado</span>
                                    <a-select v-model:value="formTenderDetail.tire_tread" style="width: 100%"
                                        placeholder="..." :options="optionsTireTread" allow-clear show-search
                                        :filter-option="filterOption"></a-select>
                                    <RobotOutlined class="ia-check" v-show="iaCheck.includes('tire_tread')" />
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
                        <a-row style="margin-top: 2%; align-content: center; padding-left: 2%" :gutter="24">
                            <a-col :span="8">
                                <div class="form-item-container">
                                    <!-- <a-badge-ribbon text="IA" color="volcano" v-show="true"><span>Marca</span>
                                    </a-badge-ribbon> -->
                                    <span>Marca</span>
                                    <div class="input-select">
                                        <!-- <a-badge-ribbon text="IA" color="volcano" v-show="true">
 </a-badge-ribbon> -->
                                        <a-select v-model:value="formTenderDetail.brand" placeholder="..."
                                            style="width:100%" :options="optionsBrand" allow-clear show-search
                                            :filter-option="filterOption" @change="handleChangeBrand"></a-select>
                                        <RobotOutlined class="ia-check" v-show="iaCheck.includes('brand')" />
                                    </div>
                                </div>
                                <div class="form-item-container">
                                    <span>Modelo Neumático</span>
                                    <div class="input-select">
                                        <a-select v-model:value="formTenderDetail.tire_model" style="width: 100%"
                                            placeholder="..." :options="optionsModel" allow-clear show-search
                                            :filter-option="filterOption"></a-select>
                                        <RobotOutlined class="ia-check" v-show="iaCheck.includes('modelo_rueda')" />
                                    </div>
                                </div>
                                <div class="form-item-container">
                                    <span>Tipo de Llanta</span>
                                    <div class="input-select">
                                        <a-select v-model:value="formTenderDetail.llanta_type" style="width: 100%"
                                            placeholder="..." :options="optionsLlantaType" allow-clear show-search
                                            :filter-option="filterOption"></a-select>
                                        <RobotOutlined class="ia-check" v-show="iaCheck.includes('llanta_type')" />
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
                                    <span>Cotizando</span>
                                    <a-select v-model:value="formTenderDetail.tire_quoted" style="width: 100%"
                                        placeholder="..." :options="optionsQuoteDetails" allow-clear show-search
                                        :filter-option="filterOption"></a-select>
                                </div>
                                <div class="form-item-container">
                                    <span>Sucursal</span>
                                    <a-select v-model:value="formTenderDetail.daytona_ids" style="width: 100%"
                                        mode="single" placeholder="Please select" allow-clear show-search
                                        :filter-option="filterOption">
                                        <a-select-option v-for="(item, index) in sucursalList" :key="index"
                                            :value="item.value" :label="(item.name)">
                                            {{ item.name }}
                                        </a-select-option></a-select>
                                </div>
                            </a-col>
                        </a-row>
                    </div>
                    <div class="form-item-obs label-top" style="margin-top: 1%; padding-left: 2%; padding-right: 2%">
                        <span style="min-width: 140px">Observaciones</span>
                        <a-textarea v-model:value="formTenderDetail.obs" :rows="4"
                            style=" border: 2px solid var(--border-item)" />
                    </div>
                </a-form>
                <div v-show="!formTenderDetail.not_quote">
                    <a-form layout="inline" :model="formTenderDetail" :wrapper-col="{ span: 16 }" :rules="rules">

                    </a-form>

                </div>


                <!-- Total -->
                <div class="total-item">
                    <span>TOTAL A ADJUDICAR: {{
                        formatCurrency(quoteData.total_quoted) }}</span>

                    <RobotOutlined :style="{ marginLeft: '10px', color: 'white' }"
                        v-show="iaCheck.includes('total_quoted')" />

                </div>
                <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">AGREGAR ITEM</a-button>
                <a-table :columns="columns" :data-source="dataSource" bordered :pagination="false">
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="['sku', 'llanta_type', 'quantity'].includes(column.dataIndex)">
                            <div>
                                <a-input v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0" />
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['type'].includes(column.dataIndex)">
                            <div>
                                <a-select ref="select" v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]"
                                    style="margin: -5px 0;width: 190px;" @focus="focus" @change="handleChange"
                                    :options="groupList">
                                </a-select>
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['vendor_id'].includes(column.dataIndex)">
                            <div>
                                <a-select ref="select" v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]"
                                    style="margin: -5px 0; width: 150px" @focus="focus" @change="handleChange"
                                    allow-clear show-search :filter-option="filterOption">
                                    <a-select-option v-for="(item, index) in vendorList" :key="index"
                                        :value="item.value" :label="(item.name)">
                                        {{ item.name }}
                                    </a-select-option>
                                </a-select>
                                <template v-else>
                                    {{ getLabelList(text, vendorList) }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['po'].includes(column.dataIndex)">
                            <div>
                                <a-checkbox v-model:checked="editableData[record.key][column.dataIndex]"
                                    v-if="editableData[record.key]" style="margin: -5px 0" @focus="focus"
                                    v-show="formTenderDetail.quote_state === 'A'"></a-checkbox>
                                <template v-else>
                                    <div class="checkbox">
                                        <a-checkbox :checked="text" :disabled="true"></a-checkbox>
                                        <div class="icono" v-show="record.po_id">
                                            <router-link :to="{ name: 'OrderDetail', params: { id: record.po_id } }">
                                                <a-button type="primary" :disabled="!text">
                                                    PDF
                                                </a-button>
                                            </router-link>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </template>
                        <template v-if="column.dataIndex === 'price_final'">
                            <a-input v-if="editableData[record.key]"
                                v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0;" />
                            <template v-else>
                                {{ formatCurrency(record.price_final) }}
                            </template>
                        </template>
                        <template v-if="column.dataIndex === 'price_wo_iva'">
                            <!-- <a-input v-if="editableData[record.key]"
                                v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0;" />
                            <template v-else> -->
                            <div>
                                {{ formatCurrency(record.price_final / 1.21) }}
                            </div>
                            <!-- </template> -->
                        </template>
                        <template v-if="column.dataIndex === 'amount_wo_iva'">
                            <div>
                                {{ formatCurrency(record.price_final / 1.21 * record.quantity) }}
                            </div>
                        </template>
                        <template v-else-if="column.dataIndex === 'total'">
                            <div>
                                {{ formatCurrency(record.price_final / 1.21 * record.quantity * (1 +
                                formTenderDetail.fee /
                                100))
                                }}
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
                <RobotOutlined class="ia-check" v-show="iaCheck.includes('details')" />

                <a-row class="footer-oc">
                    <!-- <a-col :offset="10">
                        <a-button type="primary" @click="handleGenerateOc">Generar OC</a-button>
                    </a-col> -->
                    <a-col :offset="18">
                        <div class="total-oc"> <span>TOTAL OC: {{
                                formatCurrency(totalPo) }}</span>
                        </div>
                    </a-col>
                </a-row>

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
            <!-- Botones en estado Adjudicado -->
            <div v-if="formTenderDetail.quote_state === 'A'">
                <a-row>
                    <a-col :span="8" :offset="8">
                        <a-button type="primary" size="large" @click="onSave('A')" :loading="isLoading">Generar
                            OC</a-button>
                    </a-col>
                </a-row>
            </div>
        </a-collapse-panel>
    </a-collapse>
</template>

<script>
import { cloneDeep } from 'lodash-es';
import { ref, onMounted, watch, reactive, toRaw, computed, defineComponent, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getTendersIndex } from '@/api/tenders/tenders.js';
import { getQuotes, addQuotes, updateQuotes } from '@/api/quotes/quotes.js';
import { getTireCost } from '@/api/costs/costs.js';
import { tableColumns } from '../config/columnsDetail.js';
import { tableQuoteColumns } from '../config/columnsQuote.js';
import {
    TENDER_STATES, DELIVERY_TIMES, TIRE_BRANDS, MODELS, LLANTA_TYPES,
    TIRE_HEIGHT, TIRE_WIDTH, TIRE_TREAD, DAYTONAS, QUOTE_DETAILS, ASEGURADORAS, GROUPS,
} from '@/common/common';
import { dataTable } from './data';
import { formRules } from '../config/rules.js';
import { formatCurrency, formatNumber } from '@/utils/utils.js';
import { getUsers } from '@/api/users/users.js';
import { getPlatformList, getPlatforms } from '@/api/platforms/platforms.js';
import { getRoles } from '@/api/roles/roles.js';
import { getVendors, getVendorList, getSucursalList } from '@/api/vendors/vendors.js';
import { RobotOutlined, PlusOutlined, FilePdfOutlined } from '@ant-design/icons-vue';
import { addOrders } from '@/api/orders/orders.js';
export default {
    name: 'TenderDetail',
    components: {
        RobotOutlined,
        PlusOutlined,
        FilePdfOutlined,
    },
    setup() {
        const route = useRoute();
        const router = useRouter(); // Importar el router   
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
        const groupList = GROUPS;
        const roles = ref(100); // Define roles como un ref para que sea reactivo
        const agents = ref([]); // Define agents como un ref para almacenar los agentes
        const iaCheck = ref([]);
        const estadoList = TENDER_STATES;
        const vendorList = ref([]);
        const sucursalList = ref([]);
        // const optionsDaytonas = DAYTONAS.map(daytona => ({
        //     label: `${daytona.businessName} - ${daytona.completeAddress}`,
        //     value: daytona.idClaimsProvider
        // }));
        // const optionsDaytonas = sucursalList.map(daytona => ({
        //     label: `${daytona.businessName} - ${daytona.completeAddress}`,
        //     value: daytona.idClaimsProvider
        // }));
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
            tire_type_name: '',
            tire_quoted: '',
            daytona_ids: null,
            quote_detail: '',
            quote_state: '',
            spare_tire_amount: 0,
            tenderData: { domain: '' },
            tender_data: { domain: '' },
            original_parts: '',
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
        const platformList = ref([]);
        const isModalVisible = ref(false);
        const currentImageIndex = ref(0);
        const VNodes = defineComponent({
            props: {
                vnodes: {
                    type: Object,
                    required: true,
                },
            },
            render() {
                return this.vnodes;
            },
        });
        const edit = key => {
            editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
        };
        const editQuote = key => {
            editableQuoteData[key] = cloneDeep(dataQuoteSource.value.filter(item => key === item.key)[0]);
        };
        const save = key => {
            errorMessage.value = "";
            const record = dataSource.value.find(item => key === item.key);
            const data = editableData[key];
            if (!data.sku || !data.type || !data.vendor_id || parseFloat(data.price_final) < 0.01 || parseFloat(data.quantity) < 0.01) {
                return errorMessage.value = 'Debe existir un Sku, un grupo, un precio unitario, una cantidad y seleccionar un Proveedor';
            }
            Object.assign(record, editableData[key]);
            record.total = record.price * record.quantity;
            delete editableData[key];
            calculateTireType();
        };
        const cancel = key => {
            if (key === undefined) {
                onDelete(key);
                delete editableQuoteData[key];
                return errorMessage.value = '';
            }
            const record = dataSource.value.find(item => key === item.key);
            Object.assign(record, editableData[key]);
            delete editableData[key];
            if (!record.type) {
                onDelete(key);
            }
        };
        const saveQuote = key => {
            const record = dataQuoteSource.value.find(item => key === item.key);
            Object.assign(record, editableQuoteData[key]);
            delete editableQuoteData[key];
            calculateTotalQuoted();
        };
        const cancelQuote = key => {
            if (key === undefined) {
                onDeleteQuote(key);
                delete editableQuoteData[key];
                return;
            }
            const record = dataQuoteSource.value.find(item => key === item.key);
            Object.assign(record, editableData[key]);
            delete editableQuoteData[key];
            if (!record.tire_type_name) {
                onDeleteQuote(key);
            }
        };
        const calculateTireType = () => {
            // Obtener datos
            let tireValue = 0;
            let tireQuantity = 0;
            let llantaValue = 0;
            let llantaQuantity = 0;
            let freight = 0;
            let fee = 0;
            const tireValues = Object.values(dataSource.value);
            tireValues.map((item) => {
                if (item.type === 'Neumatico') {
                    tireValue = item.price;
                }
            })
            tireValues.map((item) => {
                if (item.type === 'Llantas') {
                    llantaValue = item.price;
                }
            });
            let tireValueTotal = 0;
            if (tireValue > 0) {
                freight = formTenderDetail.value.freight;
                fee = formTenderDetail.value.fee;
                tireValueTotal = (parseFloat(tireValue) + parseFloat(freight)) * (1 + (fee / 100));
            }
            // Actualizar


            dataQuoteSource.value.map((item) => {
                if (tireValueTotal >= 0) {
                    item.Neumatico = tireValueTotal;
                }
                if (llantaValue >= 0) {
                    item.Llanta = llantaValue;
                }
            })
            calculateTotalQuoted();
        }
        const calculateTotalQuoted = () => {
            let totalQuoted = 0;
            dataQuoteSource.value.map((item) => {

                totalQuoted += parseFloat(item.Llanta) + parseFloat(item.Neumatico);
            })
            quoteData.value.total_quoted = totalQuoted;
        }

        const fetchTenderData = async (id) => {
            try {
                const response = await getTendersIndex({ claim_id: id });
                if (response.length > 0) {
                    tenderData.value = response.results[0];
                }
                const params = {
                    claim_id: id,
                };
                const quoteResponse = await getQuotes(params);
                quoteData.value = quoteResponse.results[0];
                quoteId.value = quoteData.value.id;
                if (Array.isArray(quoteData.value.details)) {
                    const filteredDetails = quoteData.value.details.filter(detail =>
                        detail.hasOwnProperty('vendor_id') && detail.vendor_id !== null
                    );
                    if (filteredDetails.length > 0) {
                        // filteredDetails.map((item) => {
                        //     dataSource.value.push(item)
                        // })
                        dataSource.value = filteredDetails.map((item, index) => ({
                            ...item,
                            key: index,
                        }));
                    }
                } else {
                    dataSource.value.push(quoteData.value.details);
                }


                let records = [];
                records = quoteResponse.results[0].tire_type_name;
                if (Array.isArray(records)) {
                    records.map((item) => {
                        dataQuoteSource.value.push(
                            {
                                tire_type_name: item.tire_type_name,
                                Llanta: item.Llanta,
                                Neumatico: item.Neumatico,
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
                let brandObject = optionsBrand.find((item) => item.label === quoteData.value.brand);
                let brand = '';
                if (brandObject) {
                    brand = brandObject.value;
                }
                let llantaType = null;
                llantaType = quoteData.value.llanta_type;
                const quoteDataValue = {
                    ...quoteData.value,
                    brand: brand,
                    delivery_time: deliveryTime,
                    tire_model: parseInt(quoteData.value.tire_model),
                    llanta_type: llantaType,
                };
                if (quoteData.value.image_data) {
                    imageData.value = 'data:image/jpeg;base64,' + quoteData.value.image_data;
                    imageUrl.value = imageData.value;
                }
                formTenderDetail.value = quoteDataValue;
                if (!formTenderDetail.value.daytona_ids) {
                    formTenderDetail.value.daytona_ids = null;
                }
                if (!formTenderDetail.value.brand) {
                    formTenderDetail.value.brand = [];
                }
                if (!formTenderDetail.value.tire_model) {
                    formTenderDetail.value.tire_model = '';
                }
                if (!formTenderDetail.value.llanta_type) {
                    formTenderDetail.value.llanta_type = '';
                }
                //Trae Fee de la Aseguradora
                calcularFee();

                //Marca con IA:
                if (formTenderDetail.value.original_parts) {
                    console.log('E original parts check IA changes')
                    handleIACheck(formTenderDetail.value.original_parts);
                }

            } catch (error) {
                console.error('Error fetching tender data:', error);
            }
        };
        const calcularFee = async () => {
            if (formTenderDetail.value.quote_state === 'N' && formTenderDetail.value.company_id) {
                const assurance = await getVendors({ comercial_name: formTenderDetail.value.company_name, vendor_type: 1 });
                console.log('assurance', assurance)
                if (assurance.count > 0) {
                    formTenderDetail.value.fee = assurance.results[0].fee_financial + assurance.results[0].fee_margen;
                }
            }
            if (formTenderDetail.value.quote_state === 'N' && formTenderDetail.value.platform) {
                const platform = await getPlatforms({ name__icontains: formTenderDetail.value.platform });
                console.log('platform', platform);
                if (platform.count > 0) {
                    formTenderDetail.value.fee += platform.results[0].fee;
                }
            }
        }
        const getStateColor = (stateValue) => {
            const state = TENDER_STATES.find(s => s.value === stateValue);
            return state ? state.color : 'default';
        };

        const getStateLabel = (stateValue) => {
            const state = TENDER_STATES.find(s => s.value === stateValue);
            return state ? state.label : stateValue;
        };
        const filterOption = (input, option) => {
            return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        const getLabelList = (value, list) => {
            return list.find((item) => item.value === value).name;
        }
        const onSave = async (value) => {
            isLoading.value = true;
            errorMessage.value = '';
            try {
                // Validar el formulario
                await formRef.value.validate();

                // Preparar los parámetros
                const params = { ...formTenderDetail.value };
                let brandObject = optionsBrand.find((item) => item.value === formTenderDetail.value.brand);

                if (brandObject) {
                    params.brand = brandObject.label;
                }

                params.quote_state = value;

                const details = dataSource.value.map((item) => ({
                    ...item,
                    po: item.po || false,
                    price_oc: parseFloat(item.price_final / 1.21 * (1 + formTenderDetail.value.fee / 100)).toFixed(2),
                }));

                let fullParams = {
                    ...params,
                    details,
                    tire_type_name: dataQuoteSource.value,
                    total_quoted: quoteData.value.total_quoted,
                };

                let response;

                // Editar o agregar cotización según el tipo
                if (type.value === 'Edit') {
                    console.log('Edit');
                    response = await updateQuotes(quoteId.value, fullParams);
                } else if (type.value === 'Add') {
                    console.log('Add');
                    console.log('add form', formTenderDetail.value);
                    fullParams = {
                        ...fullParams,
                        company_name: aseguradoraList.find((item) => item.value === fullParams.company_id).label,
                    };
                    response = await addQuotes(fullParams);
                    tenderId.value = formTenderDetail.value.claim_id;
                    const path = 'licitaciones/' + tenderId.value;
                    router.push({ path });
                }

                // Verificar el estado de la promesa
                if (response) {
                    console.log('response', response);
                    // Realiza acciones adicionales si es necesario
                }
            } catch (error) {
                errorMessage.value = 'Error actualizando las cotizaciones, no se ha guardado el objeto: ' + error;
                console.log('error', error)
                if (error.response.hasOwnProperty('data')) {
                    if (error.response.data.hasOwnProperty('error')) {
                        errorMessage.value += '\n' + error.response.data.error;
                    }
                }
                window.dispatchEvent(new CustomEvent('message-error', { detail: 'Error: ' + errorMessage }));
            } finally {
                isLoading.value = false;
                console.log('finally')
                if (errorMessage.value === '') {
                    window.dispatchEvent(new CustomEvent('message-success', { detail: 'Licitación Guardada. Aguarda que la página se recargue' }));
                    setTimeout(() => {
                        location.reload();
                    }, 3000); // 3000 ms = 3 segundos
                }
            }


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
            calculateTireType();
        };
        const onDeleteQuote = key => {
            dataQuoteSource.value = dataQuoteSource.value.filter(item => item.key !== key);
            calculateTotalQuoted();
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
        const getUsersList = async () => {
            try {
                const idRole = await getRoles({ name: 'Agente' });
                const agentsResponse = await getUsers({ roles: idRole.results[0].id });
                const transformedAgents = agentsResponse.results.map((item) => {
                    return {
                        ...item,
                        fullName: item.username,
                    };
                });
                agents.value = transformedAgents;
            } catch (error) {
                console.error("Error fetching agents:", error);
            }
            try {
                vendorList.value = await getVendorList();
                sucursalList.value = await getSucursalList();
            } catch (error) {
                console.error("Error fetching vendor list:", error);
            }
        };
        const getPlatformsListData = async () => {
            try {
                platformList.value = await getPlatformList();
            } catch (error) {
                console.log('error in get platform list', error)
            }
        }
        onMounted(() => {
            tenderId.value = route.params.id;
            console.log('tender value', tenderId.value)
            getUsersList();
            getPlatformsListData();
            if (tenderId.value) {
                console.log('edit')
                type.value = 'Edit';
                fetchTenderData(tenderId.value);
            } else {
                console.log('add')
                type.value = 'Add';
                formTenderDetail.value = {
                    not_quote: false,
                    delivery_time: 1,
                    original_parts: '',
                    spare_tire_amount: '',
                    brand: 1,
                    tire_model: 1,
                    llanta_type: 'ALEACION',
                    tire_width: 145,
                    tire_height: 30,
                    tire_tread: 13,
                    obs: '',
                    tire_type_name: 'Auxilio',
                    tire_quoted: 'modelo exacto',
                    daytona_ids: null,
                    quote_detail: '',
                    quote_state: 'N',
                    spare_tire_amount: 0,
                    freight: 0,
                    fee: 0,
                    tender_data: {
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

                dataQuoteSource.value = dataQuoteSource.value.map((item) => {
                    item.Neumatico = newCost.value.spare_tire_amounts[0].cost_amount;
                    return item;
                });
            } catch (err) {
                error.value = err;
            } finally {
                loading.value = false;
            }
        };
        const handleChangeAseguradora = async () => {
            if (formTenderDetail.value.company_id) {
                const aseguradora = aseguradoraList.find((item) => item.value === formTenderDetail.value.company_id)
                const assurance = await getVendors({ comercial_name: aseguradora.label, vendor_type: 1 });
                if (assurance.count > 0) {
                    formTenderDetail.value.fee = assurance.results[0].fee_financial + assurance.results[0].fee_margen;
                }
                else {
                    formTenderDetail.value.fee = 0;
                }
            }
            if (formTenderDetail.value.platform) {
                const platform = await getPlatforms({ name__icontains: formTenderDetail.value.platform });
                if (platform.count > 0) {
                    if (platform.count > 0) {
                        formTenderDetail.value.fee += platform.results[0].fee;
                    }
                }
            }
        }
        const handleIACheck = (value) => {
            console.log('valor recibido IA', value)
            if (formTenderDetail.value.quote_state === 'N') {
                const originalPartsString = value;
                iaCheck.value = originalPartsString.split(',').map(part => part.trim());
                console.log('ia check value', iaCheck.value);
            } else {
                iaCheck.value = [];
            }
        }
        const handleEdit = computed(() => {
            if (formTenderDetail.value.quote_state === 'N' || formTenderDetail.value.quote_state === 'E') {
                return false;
            }
            return true;
        })
        const inputRef = ref();
        const name = ref();
        let index = 0;
        const addItem = e => {
            e.preventDefault();
            groupList.push(name.value || `New item ${(index += 1)}`);
            name.value = '';
            setTimeout(() => {
                inputRef.value?.focus();
            }, 0);
            console.log('addItem');
        };
        // PDF
        const handlePdf = (index) => {
            console.log('va al pdf', index)
        }
        const totalPo = computed(() => {
            if (dataSource.value && Array.isArray(dataSource.value)) {
                return dataSource.value.reduce((acc, item) => {
                    let subTotal = 0;
                    if (item.po) {
                        subTotal = item.price_final / 1.21 * item.quantity * (1 + formTenderDetail.value.fee /
                            100);
                    }
                    return acc + (subTotal || 0);
                }, 0);
            }
            return 0;
        });
        const handleGenerateOc = () => {
            console.log('generar OC')
            // Agrupar por vendor
            const filteredData = dataSource.value.filter((item) => item.po === true);
            console.log('filtered Data', filteredData)
            if (filteredData) {
                const groupedData = filteredData.reduce((acc, item) => {
                    // Si el vendor no existe en el acumulador, inicializarlo como un array vacío
                    if (!acc[item.vendor_id]) {
                        acc[item.vendor_id] = [];
                    }
                    // Agregar el item actual al array correspondiente del vendor
                    acc[item.vendor_id].push(item);
                    return acc;
                }, {});

                // Convertir el objeto de grupos en un array de sub-arrays
                const groupedArray = Object.values(groupedData);

                // Enviar cada sub-array a la función postOc
                groupedArray.forEach(async subArray => {
                    console.log(subArray)
                    const filter = {
                        social_name: subArray[0].vendor_id,
                    }
                    console.log('filter', filter)
                    const vendor = await getVendors(filter);
                    const vendorData = vendor.results[0];
                    console.log('vendor', vendor)
                    const params = {
                        order: {
                            cuit: vendorData.cuit,
                            RazonSocial: vendorData.social_name,
                            Direccion: vendorData.address ? vendorData.address : '',
                            Ciudad: vendorData.city ? vendorData.city : '',
                            Provincia: vendorData.province ? vendorData.province : '',
                            Email: vendorData.mail ? vendorData.mail : '',
                            Telefono: vendorData.phone ? vendorData.phone : '',
                            Fechaentrega: new Date(),
                            Sede: formTenderDetail.value.daytona_ids,
                            Ordenid: formTenderDetail.value.claim_id,
                            Nota1: '',
                            Nota2: '',
                            Nota3: '',
                        },
                        itemDetails: subArray.map((item) => {
                            return {
                                Sku: item.sku,
                                Cantidad: item.quantity,
                                Descripcion: item.description,
                                CostoUnitario: item.price,
                            }
                        })
                    }
                    addOrders(params);
                });
            }
        }
        // Logica cambio de cubierta
        const handleChangeBrand = () => {
            console.log('brand', formTenderDetail.value.brand)
            const tireBrand = formTenderDetail.value.brand;
            if (tireBrand === 1 || tireBrand === 6) {
                console.log('modifica fee a 0')
                formTenderDetail.value.fee = 0;
            } else {
                console.log('calcula fee')
                calcularFee()
            }
        }
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
            // optionsDaytonas,
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
            calculateTireType,
            calculateTotalQuoted,
            roles,
            getUsersList,
            platformList,
            getPlatformsListData,
            router,
            handleChangeAseguradora,
            iaCheck,
            handleEdit,
            groupList,
            VNodes,
            inputRef,
            addItem,
            name,
            vendorList,
            sucursalList,
            h,
            handlePdf,
            totalPo,
            handleGenerateOc,
            getLabelList,
            handleChangeBrand,
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

.item-d input {
    border: none;
    /* Optional: remove the border of the input */
    width: 100%;
    /* Optional: make the input take the full width of the container */
    height: 100%;
    /* Optional: make the input take the full height of the container */
    text-align: center;
    /* Optional: center the text inside the input */
    border-radius: 20px;
    /* Optional: apply border-radius to the input */
}

.item-d select {
    border: none;
    /* Optional: remove the border of the input */
    width: 100%;
    /* Optional: make the input take the full width of the container */
    height: 100%;
    /* Optional: make the input take the full height of the container */
    text-align: center;
    /* Optional: center the text inside the input */
    border-radius: 20px;
    /* Optional: apply border-radius to the input */
}

.item-d:not(.no-background) input {
    background-color: var(--soft-back);
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

.not-quote {
    background-color: var(--soft-back);
    width: 50%;
}


.form-item-container {
    display: flex;
    align-items: center;
    padding-right: 5%;
    white-space: nowrap;
    margin-bottom: 2%;
}

.form-item-obs {
    display: flex;
    align-items: center;
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

.input-item {
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

.ia-check {
    margin-left: 10px;
    color: var(--principal)
}

.total-item {
    font-style: italic;
    background-color: var(--soft-back);
    margin-bottom: 1%;
    padding: 1%;
}

.checkbox {
    display: flex;
}

.checkbox .icono {
    margin-left: 30px;
}

.total-oc {
    background-color: var(--soft-back);

}

.footer-oc {
    margin-top: 1%;
}
</style>