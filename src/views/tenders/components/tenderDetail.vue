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
        <a-form :model="formTenderDetail" ref="formRefAdd" name="horizontal_login" :rules="rules" layout="inline"
            autocomplete="off">
            <a-form-item label="Nro Siniestro" name="claim_id">
                <a-input class="input-item" v-model:value="formTenderDetail.claim_id" />
            </a-form-item>
            <a-form-item label="Compañía" name="company_id">
                <a-select placeholder="Ingrese su búsqueda" style="min-width: 135px"
                    v-model:value="formTenderDetail.company_id" allowClear show-search :filter-option="filterOption"
                    @change="handleChangeAseguradora">
                    <a-select-option v-for="(aseguradora, index) in aseguradoraList" :key="index"
                        :value="aseguradora.value" :label="aseguradora.name">
                        {{ aseguradora.name }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="Estado" name="quote_state">
                <a-select placeholder="Ingrese su búsqueda" style="min-width: 140px"
                    v-model:value="formTenderDetail.quote_state" allowClear show-search :filter-option="filterOption">
                    <a-select-option v-for="(item, index) in estadoList" :key="index" :value="item.value"
                        :label="item.label">
                        {{ item.label }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="Dominio" name="add_domain">
                <a-input v-model:value="formTenderDetail.add_domain">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Chasis" name="chasis">
                <a-input v-model:value="formTenderDetail.tender_data.chasis">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Marca" name="marca">
                <a-input v-model:value="formTenderDetail.tender_data.brand">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Modelo" name="vehicle">
                <!-- <a-input v-model:value="formTenderDetail.tender_data.vehicle">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input> -->
                <a-select placeholder="Ingrese su búsqueda" style="min-width: 135px"
                    v-model:value="formTenderDetail.tender_data.vehicle" allowClear show-search
                    :filter-option="filterOption" @change="handleChangeAseguradora">
                    <a-select-option v-for="(item, index) in vehicleList" :key="index" :value="item.name"
                        :label="item.name">
                        {{ item.name }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="Año Vehículo" name="vehicle_year">
                <a-input v-model:value="formTenderDetail.tender_data.vehicle_year">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Fecha Siniestro" name="add_claim_date">
                <a-input type="date" v-model:value="formTenderDetail.add_claim_date">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Nombre Cliente" name="name">
                <a-input v-model:value="formTenderDetail.tender_data.name">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Teléfono" name="phone">
                <a-input v-model:value="formTenderDetail.tender_data.phone">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Mail" name="mail">
                <a-input v-model:value="formTenderDetail.mail">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Dirección" name="address">
                <a-input v-model:value="formTenderDetail.address">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Localidad" name="city">
                <a-input v-model:value="formTenderDetail.tender_data.city">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Provincia" name="province">
                <a-input v-model:value="formTenderDetail.tender_data.province">
                    <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="Gestor" name="user">
                <a-select placeholder="Ingrese su búsqueda" style="min-width: 150px"
                    v-model:value="formTenderDetail.user" allowClear show-search :filter-option="filterOption">
                    <a-select-option v-for="(item, index) in agents" :key="index" :value="item.id"
                        :label="(item.fullName)">
                        {{ item.fullName }}
                    </a-select-option>
                </a-select>

            </a-form-item>
            <a-form-item label="Plataforma" name="platform">
                <a-select placeholder="Ingrese su búsqueda" style="min-width: 150px"
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
                <div class="item-d" :class="{ 'no-background': handleEdit(1) }">
                    <a-input v-model:value="formTenderDetail.tender_data.domain" :readonly="handleEdit(1)" />
                </div>
            </a-descriptions-item>
            <a-descriptions-item label="Chasis" class="a-descriptions-item">
                <div class="item-d" :class="{ 'no-background': handleEdit(1) }">
                    <a-input v-model:value="formTenderDetail.tender_data.chasis" :readonly="handleEdit(1)" />
                </div>
            </a-descriptions-item>
            <a-descriptions-item label="Marca" class="a-descriptions-item">
                <div class="item-d" :class="{ 'no-background': handleEdit() }">
                    <a-input v-model:value="formTenderDetail.tender_data.brand" :readonly="handleEdit()" />
                </div>
            </a-descriptions-item>
            <a-descriptions-item label="Modelo" class="a-descriptions-item">
                <div class="item-d" :class="{ 'no-background': handleEdit(1) }">
                    <!-- <a-input v-model:value="formTenderDetail.tender_data.vehicle" :readonly="handleEdit(1)" /> -->
                    <div v-if="!handleEdit(1)">
                        <a-select placeholder="Ingrese su búsqueda" style="min-width: 135px"
                            v-model:value="formTenderDetail.tender_data.vehicle" allowClear show-search
                            :filter-option="filterOption" @change="handleChangeAseguradora" :readonly="handleEdit(1)">
                            <a-select-option v-for="(item, index) in vehicleList" :key="index" :value="item.name"
                                :label="item.name">
                                {{ item.name }}
                            </a-select-option>
                        </a-select>
                    </div>
                    <div v-else>
                        <a-input v-model:value="formTenderDetail.tender_data.vehicle" :readonly="handleEdit(1)" />
                    </div>
                </div>
            </a-descriptions-item>
            <a-descriptions-item label="Año Vehículo" class="a-descriptions-item">
                <div class="item-d" :class="{ 'no-background': handleEdit() }">
                    <a-input v-model:value="formTenderDetail.tender_data.vehicle_year" :readonly="handleEdit()" />
                </div>
            </a-descriptions-item>
            <a-descriptions-item label="Fecha" class="a-descriptions-item">
                <div class="item-d" :class="{ 'no-background': handleEdit() }">
                    <a-input v-model:value="formTenderDetail.tender_data.claim_date" :readonly="handleEdit()" />
                </div>
            </a-descriptions-item>
            <a-descriptions-item label="Plataforma" class="a-descriptions-item">
                <div class="item-d">{{ formTenderDetail.platform }}</div>
            </a-descriptions-item>

        </a-descriptions>
    </div>
    <a-collapse class="collapse-class" :default-active-key="['3']">
        <a-collapse-panel v-show="type === 'Edit'" key="1" header="INFORMACIÓN EXTRA">
            <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" class="description-group">
                <a-descriptions-item label="Nombre Cliente">
                    <div class="item-d" :class="{ 'no-background': handleEdit(1) }">
                        <a-input v-model:value="formTenderDetail.tender_data.name" :readonly="handleEdit(1)" />
                    </div>
                </a-descriptions-item>
                <a-descriptions-item label="Teléfono">
                    <div class="item-d" :class="{ 'no-background': handleEdit(1) }">
                        <a-input v-model:value="formTenderDetail.tender_data.phone" :readonly="handleEdit(1)" />
                    </div>
                </a-descriptions-item>
                <a-descriptions-item label="Mail">
                    <div class="item-d" :class="{ 'no-background': handleEdit(1) }">
                        <a-input v-model:value="formTenderDetail.mail" :readonly="handleEdit(1)" />
                    </div>
                </a-descriptions-item>
                <a-descriptions-item label="Dirección">
                    <div class="item-d" :class="{ 'no-background': handleEdit(1) }">
                        <a-input v-model:value="formTenderDetail.address" :readonly="handleEdit(1)" />
                    </div>
                </a-descriptions-item>
                <a-descriptions-item label="Localidad">
                    <div class="item-d" :class="{ 'no-background': handleEdit(1) }">
                        <a-input v-model:value="formTenderDetail.tender_data.city" :readonly="handleEdit(1)" />
                    </div>
                </a-descriptions-item>
                <a-descriptions-item label="Provincia">
                    <div class="item-d" :class="{ 'no-background': handleEdit(1) }">
                        <a-input v-model:value="formTenderDetail.tender_data.province" :readonly="handleEdit(1)" />
                    </div>
                </a-descriptions-item>
                <a-descriptions-item label="Gestor">
                    <template v-if="userRoles.includes('Admin') && formTenderDetail.quote_state !== 'N'">
                        <div class="item-d" :class="{ 'no-background': handleEdit() }">
                            <a-select placeholder="Ingrese su búsqueda" v-model:value="formTenderDetail.user" allowClear
                                show-search :filter-option="filterOption">
                                <a-select-option v-for="(item, index) in agents" :key="index" :value="item.id"
                                    :label="(item.fullName)">
                                    {{ item.fullName }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </template>
                    <template v-else-if="formTenderDetail.quote_state === 'N'">
                        <div class="item-d" :class="{ 'no-background': handleEdit() }">
                            <a-select placeholder="Ingrese su búsqueda" v-model:value="formTenderDetail.user" allowClear
                                show-search :filter-option="filterOption">
                                <a-select-option v-for="(item, index) in agents" :key="index" :value="item.id"
                                    :label="(item.fullName)">
                                    {{ item.fullName }}
                                </a-select-option>
                            </a-select>
                        </div>
                    </template>
                    <template v-else>
                        <div style="text-align: left">
                            {{ getUserName(formTenderDetail.user) }}</div>
                    </template>

                </a-descriptions-item>
            </a-descriptions>
        </a-collapse-panel>

        <a-collapse-panel key="2" class="collapse-class" header="ENVÍO">
            <div class="form-envio">
                <a-form ref="formEnvioRef" :model="formEnvio" class="form-envio">
                    <a-form-item label="Envío en:" name="delivery_type">
                        <a-radio-group v-model:value="formEnvio.delivery_type">
                            <a-radio value="S" name="Sucursal">Sucursal</a-radio>
                            <a-radio value="E" name="Envio">Envío</a-radio>
                            <a-radio value="T" name="Transporte">Transporte</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item ref="transport" label="Transporte" name="transport"
                        v-show="formEnvio.delivery_type === 'T'">
                        <a-input v-model:value="formEnvio.transport" />
                    </a-form-item>

                    <a-form-item label="Código Postal" required name="postal_code">
                        <a-input v-model:value="formEnvio.postal_code" placeholder="Ingrese un Código Postal" />
                    </a-form-item>
                </a-form>
            </div>
        </a-collapse-panel>
        <hr>
        <a-collapse-panel key="4" class="collapse-class" header="PEDIDO">
            <div class="form-pedido">
                <a-form ref="formPedidoRef" :model="formPedido" class="form-envio">
                    <!-- Pedido ID -->
                    <a-row :gutter="45">
                        <a-col :span="12"> <a-form-item label="Pedido ID" name="pedido_id">
                                <a-input v-model:value="formPedido.pedido_id" :disabled="true" />
                            </a-form-item></a-col>
                        <a-col :span="8"><router-link :to="{ name: 'Todos', params: { id: formPedido.pedido_id } }"
                                target="_blank">
                                <a-button type="primary" danger>
                                    Ir a Pedido {{ formPedido.pedido_id }}
                                </a-button>
                            </router-link></a-col>
                    </a-row>




                    <!-- Orden Compra Conformada Date -->
                    <!-- <a-form-item label="Fecha Orden Compra Conformada" name="orden_compra_conformada_date">
                        <a-date-picker v-model:value="formPedido.orden_compra_conformada_date" :disabled="true"
                            style="width: 100%" />
                    </a-form-item> -->

                    <!-- Entrega de Mercadería -->
                    <a-form-item label="Entrega de Mercadería" name="entrega_de_mercaderia">
                        <a-switch v-model:checked="formPedido.entrega_de_mercaderia" :disabled="true" />
                    </a-form-item>

                    <!-- Orden Compra Conformada -->
                    <a-form-item label="Orden Compra Conformada" name="orden_compra_conformada">
                        <a-switch v-model:checked="formPedido.orden_compra_conformada" :disabled="true" />
                    </a-form-item>
                    <!-- Fecha Entrega de Mercadería -->
                    <!-- <a-form-item label="Fecha Entrega de Mercadería" name="entrega_de_mercaderia_date">
                        <a-date-picker v-model:value="formPedido.entrega_de_mercaderia_date" :disabled="true"
                            style="width: 100%" />
                    </a-form-item> -->

                    <!-- Armado y Embalaje -->
                    <a-form-item label="Armado y Embalaje" name="armado_y_embalaje">
                        <a-switch v-model:checked="formPedido.armado_y_embalaje" :disabled="true" />
                    </a-form-item>

                    <!-- Fecha Armado y Embalaje -->
                    <!-- <a-form-item label="Fecha Armado y Embalaje" name="armado_y_embalaje_date">
                        <a-date-picker v-model:value="formPedido.armado_y_embalaje_date" :disabled="true"
                            style="width: 100%" />
                    </a-form-item> -->

                    <!-- Generación de Lote -->
                    <a-form-item label="Generación de Lote" name="generacion_lote">
                        <a-switch v-model:checked="formPedido.generacion_lote" :disabled="true" />
                    </a-form-item>

                    <!-- Fecha Generación de Lote -->
                    <!-- <a-form-item label="Fecha Generación de Lote" name="generacion_lote_date">
                        <a-date-picker v-model:value="formPedido.generacion_lote_date" :disabled="true"
                            style="width: 100%" />
                    </a-form-item> -->

                    <!-- Proforma -->
                    <a-form-item label="Proforma" name="proforma">
                        <a-switch v-model:checked="formPedido.proforma" :disabled="true" />
                    </a-form-item>

                    <!-- Fecha Proforma -->
                    <!-- <a-form-item label="Fecha Proforma" name="proforma_date">
                        <a-date-picker v-model:value="formPedido.proforma_date" :disabled="true" style="width: 100%" />
                    </a-form-item> -->

                    <!-- Gestión Documental -->
                    <a-form-item label="Gestión Documental" name="gestion_documental">
                        <a-switch v-model:checked="formPedido.gestion_documental" :disabled="true" />
                    </a-form-item>

                    <!-- Fecha Gestión Documental -->
                    <!-- <a-form-item label="Fecha Gestión Documental" name="gestion_documental_date">
                        <a-date-picker v-model:value="formPedido.gestion_documental_date" :disabled="true"
                            style="width: 100%" />
                    </a-form-item> -->

                    <!-- Fletero -->
                    <a-form-item label="Fletero" name="fletero">
                        <a-switch v-model:checked="formPedido.fletero" :disabled="true" />
                    </a-form-item>

                    <!-- Fecha Fletero -->
                    <!-- <a-form-item label="Fecha Fletero" name="fletero_date">
                        <a-date-picker v-model:value="formPedido.fletero_date" :disabled="true" style="width: 100%" />
                    </a-form-item> -->

                    <!-- Facturación Final -->
                    <a-form-item label="Facturación Final" name="facturacion_final">
                        <a-switch v-model:checked="formPedido.facturacion_final" :disabled="true" />
                    </a-form-item>

                    <!-- Fecha Facturación Final -->
                    <!-- <a-form-item label="Fecha Facturación Final" name="facturacion_final_date">
                        <a-date-picker v-model:value="formPedido.facturacion_final_date" :disabled="true"
                            style="width: 100%" />
                    </a-form-item> -->

                    <!-- Imagen URL 1 -->
                    <a-form-item label="Imagen URL 1" name="image_url_1">
                        <a-image v-if="formPedido.image_url_1" :src="formPedido.image_url_1" width="100px"
                            height="100px" />
                        <span v-else>No Image</span>
                    </a-form-item>

                    <!-- Imagen URL 2 -->
                    <a-form-item label="Imagen URL 2" name="image_url_2">
                        <a-image v-if="formPedido.image_url_2" :src="formPedido.image_url_2" width="100px"
                            height="100px" />
                        <span v-else>No Image</span>
                    </a-form-item>

                    <!-- Imagen URL 3 -->
                    <a-form-item label="Imagen URL 3" name="image_url_3">
                        <a-image v-if="formPedido.image_url_3" :src="formPedido.image_url_3" width="100px"
                            height="100px" />
                        <span v-else>No Image</span>
                    </a-form-item>
                </a-form>
            </div>
        </a-collapse-panel>
        <hr>
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

                <a-form layout="horizontal" ref="formRef" :model="formTenderDetail" :rules="rulesForm"
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
                                        show-search @change="calculateTotalQuoted" type="number"></a-input>

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
                        <!-- Tabla de Tire type -->
                        <div style="align-content: center; padding: 2%; display: none;">
                            <a-button v-if="formTenderDetail.quote_state !== 'LO'" class="editable-add-btn"
                                style="margin-bottom: 8px" @click="handleDetailAdd">AGREGAR
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

                                    <template
                                        v-else-if="column.dataIndex === 'operation' && formTenderDetail.quote_state !== 'LO'">
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
                                    <span style="color: red;">*Ancho</span>
                                    <a-select v-model:value="formTenderDetail.tire_width" style="width: 100%"
                                        :options="optionsTireWidth" allow-clear show-search
                                        :filter-option="filterOption"></a-select>
                                    <RobotOutlined class="ia-check" v-show="iaCheck.includes('tire_width')" />
                                </div>
                            </a-col>
                            <a-col :span="3">
                                <div class="">
                                    <span style="color: red;">*Alto</span>
                                    <a-select v-model:value="formTenderDetail.tire_height" style="width: 100%"
                                        placeholder="..." :options="optionsTireHeight" allow-clear show-search
                                        :filter-option="filterOption"></a-select>
                                    <RobotOutlined class="ia-check" v-show="iaCheck.includes('tire_height')" />
                                </div>
                            </a-col>
                            <a-col :span="3">
                                <div class="">
                                    <span style="color: red;">*Rodado</span>
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
                                    <span style="color: red;">*Marca</span>
                                    <div class="input-select">
                                        <!-- <a-badge-ribbon text="IA" color="volcano" v-show="true">
 </a-badge-ribbon> -->
                                        <a-select v-model:value="formTenderDetail.brand" placeholder="..."
                                            style="width:100%" :options="optionsBrand" allow-clear show-search
                                            :filter-option="filterOption" @change="handleChangeBrand"></a-select>
                                        <RobotOutlined class="ia-check" v-show="iaCheck.includes('brand')" />
                                    </div>
                                </div>
                                <!-- <div class="form-item-container">
                                    <span>Modelo Neumático</span>
                                    <div class="input-select">
                                        <a-select v-model:value="formTenderDetail.tire_model" style="width: 100%"
                                            placeholder="..." :options="optionsModel" allow-clear show-search
                                            :filter-option="filterOption"></a-select>
                                        <RobotOutlined class="ia-check" v-show="iaCheck.includes('modelo_rueda')" />
                                    </div>
                                </div> -->
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
                                <a-button type="primary" @click="handleGetCost()" :loading="isLoadingCost">Buscar
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
                                    <span style="color: red;">* Sucursal</span>
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
                <hr>
                <!-- <div v-if="formTenderDetail.quote_state !== 'U'">
                    <a-button v-if="formTenderDetail.quote_state !== 'LO'" class="editable-add-btn"
                        style="margin-bottom: 8px" @click="handleAdd">AGREGAR
                        ITEM</a-button>
                </div> -->
                <!-- Tabla Details -->
                <!-- <a-table :columns="columns" :data-source="dataSource" bordered :pagination="false">
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="['quantity'].includes(column.dataIndex)">
                            <div>
                                <a-input v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]" style="margin: -5px 0" />
                                <template v-else>
                                    <div
                                        :style="{ backgroundColor: record.noStock ? '#eeaab0' : 'white', textAlign: 'right' }">
                                        {{ text }}
                                    </div>
                                </template>
                            </div>
                        </template>
                        <template v-if="['sku'].includes(column.dataIndex)">
                            <div>
                                <template v-if="editableData[record.key]">
                                    {{ editableData[record.key][column.dataIndex] }}
                                </template>
                                <template v-else>
                                    {{ text }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['llanta_type'].includes(column.dataIndex)">
                            <div>
                                <template v-if="editableData[record.key]">
                                    <a-select ref="select" v-if="editableData[record.key]"
                                        v-model:value="editableData[record.key][column.dataIndex]"
                                        style="margin: -5px 0;width: 160px;" @focus="focus"
                                        @change="handleChangeDescription(editableData[record.key][column.dataIndex], record.key)"
                                        :options="editableData.data" :filter-option="false" show-search allow-clear
                                        :not-found-content="editableData.fetching ? undefined : null"
                                        @search="(value) => handleSearchDescription(value)">
                                        <template v-if="editableData.fetching" #notFoundContent>
                                            <a-spin size="small" />
                                        </template>
                                    </a-select>
                                </template>
                                <template v-else>
                                    {{ text }}
                                    {{ getLabelList(text, descriptionList) }}
                                </template>
                            </div>
                        </template>
                        <template v-if="['type'].includes(column.dataIndex)">
                            <div>
                                <a-select ref="select" v-if="editableData[record.key]"
                                    v-model:value="editableData[record.key][column.dataIndex]"
                                    style="margin: -5px 0;width: 190px;" @focus="focus" @change="handleChange"
                                    :options="groupList" show-search :filter-option="filterOption">
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
                                    style="margin: -5px 0; width: 150px" @focus="focus" allow-clear show-search
                                    :filter-option="filterOption">
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
                                            <router-link
                                                :to="{ name: 'OrderDetail', params: { id: record.po_id ? record.po_id : 1 } }">
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
                                v-model:value="editableData[record.key][column.dataIndex]"
                                style="margin: -5px 0; width: 100px" />
                            <template v-else>
                                <div style="text-align: right;">
                                    {{ formatCurrency(record.price_final) }}</div>
                            </template>
                        </template>
                        <template v-if="column.dataIndex === 'price_wo_iva'">
                            <div style="text-align: right;">
                                {{ formatCurrency(record.price_final / 1.21) }}
                            </div>
                       
                        </template>
                        <template v-if="column.dataIndex === 'amount_wo_iva'">
                            <div style="text-align: right;">
                                {{ formatCurrency(record.price_final / 1.21 * record.quantity) }}
                            </div>
                        </template>
                        <template v-else-if="column.dataIndex === 'total'">
                            <div style="text-align: right;">
                                {{ formatCurrency(text) }}

                            </div>

                        </template>

                        <template v-else-if="column.dataIndex === 'operation'">
                            <template
                                v-if="formTenderDetail.quote_state !== 'U' && formTenderDetail.quote_state !== 'LO'">
                                <div class=" editable-row-operations">
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
                    </template>
                </a-table> -->
                <RobotOutlined class="ia-check" v-show="iaCheck.includes('details')" />

                <!-- Nuevo formulario Details-->
                <a-form ref="formDetailRef" name="dynamic_form_item" layout="vertical">
                    <!-- <div style="display: flex; align-items: center; gap: 10px; font-weight: bold; margin-bottom: 10px;">
                        <span style="width: 40px;">Select</span>
                        <span style="width: 120px;">Tipo</span>
                        <span style="width: 300px;">Descripción</span>
                        <span style="width: 80px;">Proveedor</span>
                        <span style="width: 100px;">Precio C/IVA</span>
                        <span style="width: 80px;">Cantidad</span>
                        <span style="width: 100px;">Total S/IVA</span>
                        <span style="width: 120px;">Total + Fee</span>
                    </div> -->
                    <a-form-item v-for="(item, index) in form.items" :key="item.key"
                        :label="index === 0 ? 'Items' : ''">
                        <div>
                            <a-row :gutter="24" style="margin-bottom: 0.5%;">
                                <a-col :span="4"> <a-checkbox v-model:checked="item.po"
                                        @change="updateTotalSelected(item)" />
                                    <div class="icono" v-show="item.po_id">
                                        <router-link
                                            :to="{ name: 'OrderDetail', params: { id: item.po_id ? item.po_id : 1 } }">
                                            <a-button type="primary">
                                                PDF
                                            </a-button>
                                        </router-link>
                                    </div>
                                </a-col>
                                <a-col :span="6"><a-select v-model:value="item.type" placeholder="Tipo"
                                        :options="groupList" show-search :filter-option="filterOption" /></a-col>
                                <a-col :span="8"><a-select v-model:value="item.llanta_type" placeholder="Descripción"
                                        @change="handleChangeDescription(item.llanta_type, index)"
                                        :options="editableData.data" :filter-option="false" show-search allow-clear
                                        :not-found-content="item.fetching ? undefined : null"
                                        @search="(value) => handleSearchDescription(value, index)" /></a-col>
                                <a-col :span="4"><a-input v-model:value="item.sku" placeholder="SKU" :readonly="true"
                                        style="min-width: 120px;" /></a-col>
                            </a-row>
                            <a-row :gutter="24" style="margin-bottom: 0.5%;">
                                <a-col :span="8" :offset="4"> <a-select v-model:value="item.vendor_id"
                                        placeholder="Proveedor" allow-clear show-search :filter-option="filterOption">
                                        <a-select-option v-for="(item, index) in vendorList" :key="index"
                                            :value="item.value" :label="(item.name)">
                                            {{ item.name }}
                                        </a-select-option>
                                    </a-select>
                                </a-col>
                                <a-col :span="6">
                                    <a-input-number v-model:value="item.price_final" placeholder="Precio C/IVA"
                                        @change="updateCalculatedFields(item, index)"
                                        style="min-width: 180px;" /></a-col>
                                <a-col :span="5"><a-input-number v-model:value="item.quantity" placeholder="Cantidad"
                                        @change="updateCalculatedFields(item, index)"
                                        :style="{ backgroundColor: item.noStock ? '#eeaab0' : 'white', textAlign: 'right', minWidth: '180px' }" /></a-col>
                            </a-row>


                            <a-row :gutter="24" style="margin-bottom: 0.5%;">
                                <a-col :span="4" :offset="12">
                                    <a-form-item label="Total S/IVA">
                                        <a-input-number v-model="item.amount_wo_iva" disabled
                                            :value="formatCurrency(item.amount_wo_iva)" placeholder="Total S/IVA"
                                            style="width: 140px"></a-input-number>
                                    </a-form-item>
                                </a-col>
                                <a-col :span="4">
                                    <a-form-item label="Total C/IVA">
                                        <a-input-number label="Total C/IVA" v-model="item.total" disabled
                                            :value="formatCurrency(item.total)" placeholder="Total + Fee"
                                            style="width: 140px" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="4">
                                    <MinusCircleOutlined class="dynamic-delete-button" @click="removeItem(index)" />
                                </a-col>
                            </a-row>
                        </div>
                    </a-form-item>
                    <a-form-item v-if="formTenderDetail.quote_state !== 'LO'">
                        <a-button type="dashed" @click="addItemDetail" style="width: 100%;">
                            <PlusOutlined /> Agregar Item
                        </a-button>
                    </a-form-item>
                    <div class="total-item">
                        <span>
                            Costo Total: {{ totalSelected }}
                        </span>
                    </div>
                    <div class="total-item">
                        <span>
                            Total Selección + IVA: {{ totalSelectedIva }}
                        </span>
                    </div>
                    <div class="total-item">
                        <span>
                            Total Selección + Fee (sin iva): {{ totalSelectedWithFee }}
                        </span>
                    </div>
                    <div class="total-item">
                        <span>
                            Total Selección + Fee + Flete (sin iva): {{ totalSelectedWithFreight }}
                        </span>
                    </div>
                </a-form>
                <!-- Total -->

                <div class="total-item">
                    <span>TOTAL A ADJUDICAR: {{
                        formatCurrency(quoteData.total_quoted) }}</span>

                    <RobotOutlined :style="{ marginLeft: '10px', color: 'white' }"
                        v-show="iaCheck.includes('total_quoted')" />

                </div>
                <div class="btn-check">
                    <a-button type="primary" @click="handleGetStock()" :loading="isLoading">Verificar Stock</a-button>
                    <div class="stock-table" v-show="dataStock.length > 0">
                        <a-table :dataSource="dataStock" :columns="columnsStock" :pagination="false" />

                    </div>
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
                <div v-if="formTenderDetail.quote_state === 'E'">
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
                <div v-if="formTenderDetail.quote_state === 'V'">
                    <a-row>
                        <a-col :span="8" v-if="formTenderDetail.quote_state === 'V'">
                            <a-button type="primary" size="large" danger @click="onSave('R')"
                                :loading="isLoading">Cancelar
                                Presupuesto</a-button>
                        </a-col>
                        <a-col :span="8" :offset="8">
                            <a-button type="primary" size="large" class="hover-button" @click="onSave('A')"
                                :loading="isLoading"
                                v-show="formTenderDetail.platform !== 'CLAIMS' && formTenderDetail.platform !== 'Claims'">Adjudicar</a-button>
                        </a-col>
                    </a-row>
                </div>
                <div v-if="formTenderDetail.quote_state !== 'LO' && userRoles.includes('Admin')" class="boton">
                    <a-row>
                        <a-col :span="8">
                            <a-button type="primary" size="large" danger @click="onSave('LO')"
                                :loading="isLoading">Pasar a
                                Perdida
                            </a-button>
                        </a-col>

                    </a-row>
                </div>
            </div>
            <!-- Botones en estado Adjudicado -->
            <div v-if="formTenderDetail.quote_state === 'A' || formTenderDetail.quote_state === 'u'">
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
                <a-row>
                    <a-col :span="8" :offset="8">
                        <a-button type="primary" size="large" @click="onSave('A')" :loading="isLoading">Generar
                            OC</a-button>
                    </a-col>



                </a-row>
            </div>
            <div>
                <a-row>
                    <a-col :span="8">
                        <a-input-number v-model:value="formTenderDetail.nota_pedido_id" placeholder="nota pediod id"
                            style="width: 80px" />
                        <a-button type="primary" size="large" @click="generatePedido" :loading="isLoading">Generar Nota
                            de
                            Pedido</a-button>
                    </a-col>
                </a-row>
            </div>
        </a-collapse-panel>
    </a-collapse>
</template>

<script>
import { cloneDeep, debounce } from 'lodash-es';
import { ref, onMounted, watch, reactive, toRaw, computed, defineComponent, h } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";

import { getTendersIndex } from '@/api/tenders/tenders.js';
import { getUsers } from '@/api/users/users.js';
import { getPlatformList, getPlatforms } from '@/api/platforms/platforms.js';
import { getRoles } from '@/api/roles/roles.js';
import { getVendors, getVendorList, getSucursalList, getAssuranceList } from '@/api/vendors/vendors.js';
import { getQuotes, addQuotes, updateQuotes } from '@/api/quotes/quotes.js';
import { addOrders } from '@/api/orders/orders.js';
import { getTireCost, getLlantaCost, getDescriptionList, getSkuList, getCosts } from '@/api/costs/costs.js';
import { getCostStock } from '@/api/stocks/stocks.js';
import { getVehiclesList } from '@/api/vehicles/vehicles.js';
import { getProduct } from '@/api/product/product.js';

import { tableColumns } from '../config/columnsDetail.js';
import { tableQuoteColumns } from '../config/columnsQuote.js';
import { tableStockColumns } from '../config/columnsStock.js';

import {
    TENDER_STATES, DELIVERY_TIMES, TIRE_BRANDS, MODELS, LLANTA_TYPES,
    TIRE_HEIGHT, TIRE_WIDTH, TIRE_TREAD, QUOTE_DETAILS, GROUPS,
} from '@/common/common';
import { formRules } from '../config/rules.js';
import { formatCurrency, formatNumber } from '@/utils/utils.js';

import { RobotOutlined } from '@ant-design/icons-vue';
import { apiPedidos } from '@/api/pedidos/pedidos.js';
import { apiChecklist } from '@/api/checklists/checklists.js';


export default {
    name: 'TenderDetail',
    components: {
        RobotOutlined,
        MinusCircleOutlined,
        PlusOutlined,
    },
    setup() {
        const route = useRoute();
        const router = useRouter(); // Importar el router   
        const routeName = ref(route.path);
        const isLoading = ref(false);
        const formRef = ref();
        const formRefAdd = ref();
        const form = reactive({
            items: [],
        });
        const rules = formRules;
        const rulesForm = null;
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
        const columnsStock = tableStockColumns;
        const optionsDeliveryTime = DELIVERY_TIMES;
        const optionsBrand = TIRE_BRANDS;
        const optionsModel = MODELS;
        const optionsLlantaType = LLANTA_TYPES;
        const optionsTireWidth = TIRE_WIDTH;
        const optionsTireHeight = TIRE_HEIGHT;
        const optionsTireTread = TIRE_TREAD;
        const optionsQuoteDetails = QUOTE_DETAILS;
        const loading = ref(false);
        const isLoadingCost = ref(false);
        const error = ref(null);
        const type = ref('Edit');
        const aseguradoraList = ref({});

        const groupList = GROUPS;
        const roles = ref(100); // Define roles como un ref para que sea reactivo
        const agents = ref([]); // Define agents como un ref para almacenar los agentes
        const iaCheck = ref([]);
        const estadoList = TENDER_STATES;
        const vendorList = ref([]);
        const sucursalList = ref([]);
        const descriptionList = ref([]);
        const skuList = ref([]);
        const llantaTypeDescription = ref('');
        const userRoles = localStorage.getItem('roles');
        const dataStock = ref([]);
        const formTenderDetail = ref({
            not_quote: false,
            delivery_time: '',
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
            user: '',
        });
        const imageSelect = ref();
        const imageUrl = ref();
        const editableData = reactive({});
        const editableQuoteData = reactive({});
        const selectedOption = ref(null);
        const platformList = ref([]);
        const vehicleList = ref([]);
        const isModalVisible = ref(false);
        const currentImageIndex = ref(0);
        const formEnvioRef = ref();
        const formEnvio = reactive({
            sent_type: 'S',
        })
        const formPedido = ref([]);
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
            editableData.data = [];
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
                window.dispatchEvent(new CustomEvent('message-error', { detail: 'Validación: Debe existir un Sku, un grupo, un precio unitario, una cantidad y seleccionar un Proveedor' }));
                return errorMessage.value = 'Debe existir un Sku, un grupo, un precio unitario, una cantidad y seleccionar un Proveedor';
            }
            Object.assign(record, editableData[key]);
            record.total = record.price_final / 1.21 * record.quantity * (1 + parseFloat(formTenderDetail.value.fee) / 100);

            delete editableData[key];
            calculateTireType();
            handleGetStock();
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
            let llantaValue = 0;
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
                tireValueTotal = (parseFloat(tireValue)) * (1 + (fee / 100) + parseFloat(freight));
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
            form.items.map((item) => {
                if (item.total >= 0) {
                    totalQuoted += parseFloat(item.total);
                }
            })
            console.log('total_quoted', totalQuoted)

            quoteData.value.total_quoted = parseFloat(totalQuoted + parseFloat(formTenderDetail.value.freight)).toFixed(2);
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
                    const filteredDetails = quoteData.value.details.filter((detail) =>
                        detail.hasOwnProperty('vendor_id') && detail.vendor_id !== null
                    );
                    if (filteredDetails.length > 0) {
                        dataSource.value = filteredDetails.map((item, index) => ({
                            ...item,
                            key: index,
                            noStock: false,
                            total: item.total ? item.total : 0,
                        }));
                        form.items = filteredDetails.map((item, index) => ({
                            ...item,
                            key: index,
                            noStock: false,
                            total: item.total ? item.total : 0,
                        }));
                    }
                } else {
                    const details = { ...quoteData.value.details, noStock: false };
                    dataSource.value.push(details);
                    form.value.items.push(details);
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
                    if (String(quoteData.value.image_data).startsWith('https')) {
                        imageData.value = quoteData.value.image_data;
                    } else {
                        imageData.value = 'data:image/jpeg;base64,' + quoteData.value.image_data;
                    }

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
                // Recopila la info de pedidos.
                if (quoteResponse.results[0].nota_pedido_id) {
                    const pedidoParams = {
                        pedido_id: quoteResponse.results[0].nota_pedido_id,
                    }
                    const pedidosResponse = await apiPedidos('get', pedidoParams);
                    const pedidoId = pedidosResponse.results[0].id;
                    const checklistParams = {
                        pedido: pedidoId,
                    }
                    const checklistResponse = await apiChecklist('get', checklistParams)
                    formPedido.value = {
                        ...pedidosResponse.results[0],
                        ...checklistResponse.results[0],

                    }
                }
                formEnvio.delivery_type = quoteData.value.delivery_type;
                formEnvio.transport = quoteData.value.transport;
                formEnvio.postal_code = quoteData.value.postal_code;
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
        const filterOptionName = (input, option) => {
            if (!input || !option.hasOwnProperty('name')) {
                return;
            }
            return option.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        const handleSearchDescription = debounce((val) => {
            fetchDescription(val);
        }, 300);

        const fetchDescription = async (value) => {
            editableData.data = [];
            editableData.fetching = true;
            console.log('value', value)
            const params = {
                name__icontains: value,
            }
            try {
                const res = await getProduct(params);
                editableData.data = res.results.map(item => ({
                    label: item.name, // Mostrar el nombre en el select
                    value: item.name, // Pero el modelo se mantiene con el ID o value
                    sku: item.sku,
                }));
                descriptionList.value = editableData.data;
                editableData.fetching = false;
                return editableData.data;
            } catch (error) {
                console.error('Error fetching data:', error);
                editableData.fetching = false;
            }
        };
        const filterOptionValue = (input, option) => {
            console.log('filter', input);
            if (!input || !option.hasOwnProperty('value') || typeof option.value !== 'string') {
                return;
            }
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };

        const getLabelList = (value, list) => {
            if (value) {
                const item = list.find((item) => item.value === value);
                if (item) {
                    return item.name;
                }
            }
            return '';
        }
        const onSave = async (value) => {

            errorMessage.value = '';
            if (!formTenderDetail.value.daytona_ids) {
                window.dispatchEvent(new CustomEvent('message-error', { detail: 'Validación: Debe seleccionar al menos una sucursal' }));
                return;
            }
            if (!formTenderDetail.value.tire_width || !formTenderDetail.value.tire_height || !formTenderDetail.value.tire_tread || !formTenderDetail.value.brand) {
                window.dispatchEvent(new CustomEvent('message-error', { detail: 'Validación: Debe completar datos de modelo de la rueda y sus medidas' }));
                return;
            }
            //chequear si todos los proveedores son Neumasur
            if (value === 'A') {
                const neumasur = vendorList.value.find((item) => item.name === 'Neumasur');
                dataSource.value.vendor_id === neumasur.value;
            }
            isLoading.value = true;
            try {
                if (!formTenderDetail.value.user) {
                    formTenderDetail.value.user = parseInt(localStorage.getItem('user_id'));
                }
                // Validar el formulario
                if (type.value === 'Add') {
                    // await formRefAdd.value.validate();
                }
                // await formRef.value.validate();
                const detalle = form.items;

                // Preparar los parámetros
                const params = { ...formTenderDetail.value, ...formEnvio };

                let brandObject = optionsBrand.find((item) => item.value === formTenderDetail.value.brand);

                if (brandObject) {
                    params.brand = brandObject.label;
                }

                params.quote_state = value;

                // const details = { ...detalle }; 

                // const details = dataSource.value.map((item) => ({
                //     ...item,
                //     po: item.po || false,
                //     total: item.total ? item.total : 0,
                //     price_oc: parseFloat(item.price_final / 1.21 * (1 + formTenderDetail.value.fee / 100)).toFixed(2),
                // }));
                const details = detalle.map((item, index) => {
                    // Variables para cálculos
                    const priceFinal = parseFloat(item.price_final).toFixed(2);
                    const priceWoIva = parseFloat(item.price_final / 1.21).toFixed(2);
                    const amountWoIva = parseFloat(priceWoIva * item.quantity);
                    const feeMultiplier = 1 + formTenderDetail.value.fee / 100;
                    const total = amountWoIva ? parseFloat(amountWoIva * feeMultiplier).toFixed(2) : 0;
                    const priceOc = parseFloat(item.price_final / 1.21).toFixed(2);

                    // Retorno del objeto con las variables calculadas
                    return {
                        price: 0,
                        key: index,
                        llanta_type: item.llanta_type,
                        price_final: priceFinal,
                        quantity: item.quantity,
                        sku: item.sku,
                        type: item.type,
                        vendor_id: item.vendor_id,
                        po: item.po || false,
                        noStock: item.noStock || false,
                        amount_wo_iva: amountWoIva,
                        total,
                        price_oc: priceOc,
                    };
                });

                let fullParams = {
                    ...params,
                    details,
                    tire_type_name: dataQuoteSource.value,
                    total_quoted: quoteData.value.total_quoted,
                };

                let response;

                // Editar o agregar cotización según el tipo
                if (type.value === 'Edit') {
                    response = await updateQuotes(quoteId.value, fullParams);
                } else if (type.value === 'Add') {
                    console.log('full params', fullParams)
                    fullParams = {
                        ...fullParams,
                        tender_data: {
                            domain: fullParams.add_domain,
                            claim_date: fullParams.add_claim_date,
                            chasis: formTenderDetail.value.tender_data.chasis,
                            vehicle: formTenderDetail.value.tender_data.vehicle,
                            brand: formTenderDetail.value.tender_data.brand,
                            vehicle_year: formTenderDetail.value.tender_data.vehicle_year,
                            name: formTenderDetail.value.tender_data.name,
                            phone: formTenderDetail.value.tender_data.phone,
                            city: formTenderDetail.value.tender_data.city,
                            province: formTenderDetail.value.tender_data.province,
                        },
                        company_name: aseguradoraList.value.find((item) => item.value === fullParams.company_id).name,
                    };
                    console.log('full params despues de la edición', fullParams)
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
                errorMessage.value = 'Error actualizando las cotizaciones, no se ha guardado el objeto: ';
                if (error.response && Object.prototype.hasOwnProperty.call(error.response, 'data')) {
                    if (Object.prototype.hasOwnProperty.call(error.response.data, 'error')) {
                        errorMessage.value += '\n' + error.response.data.error;
                    }
                } else {
                    errorMessage.value = errorMessage.value + '\nVerifique los campos obligatorios.';
                }
                window.dispatchEvent(new CustomEvent('message-error', { detail: 'Error: ' + errorMessage.value }));
            } finally {
                isLoading.value = false;
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
            calculateTotalQuoted();
        };
        const onDeleteQuote = key => {
            dataQuoteSource.value = dataQuoteSource.value.filter(item => item.key !== key);
            calculateTotalQuoted();
        };
        const handleChangeDeliveryTime = () => {
            console.log('handle dT');
        }
        const handleChangeSku = async (item, key) => {
            const params = {
                code: item,
            }
            const res = await getCosts(params);
            const description = res.results[0].detail;  // Obtén la descripción del resultado
            const price_final = res.results[0].cost_amount;  // Obtén la descripción del resultado
            editableData[key]['llanta_type'] = description;
            editableData[key]['price_final'] = price_final;
            console.log('handle sku', res.results[0]);
        }
        const handleChangeDescription = async (item, key) => {
            const desciptionItem = await fetchDescription(item);
            // const desciptionItem = descriptionList.value.find((item) => item.value = item)
            const sku = desciptionItem[0].sku;
            console.log('description item', desciptionItem[0].sku)
            const params = {
                code: sku,
            }
            const res = await getCosts(params);
            const price_final = res.results[0].cost_amount;  // Obtén la descripción del resultado

            form.items[key]['sku'] = sku;
            form.items[key]['price_final'] = parseFloat(price_final).toFixed(2);
        }
        const handleModalCancel = () => {
            console.log('handle Cancel Modal');
            isModalVisible.value = false;
        }
        const showModal = () => {
            isModalVisible.value = true;
            console.log('handle open Modal');
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
                price_final: 0,
                quantity: 1,
                total: 0,
            };
            editableData.data = [];
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
        const getVehiclesListData = async () => {
            try {
                vehicleList.value = await getVehiclesList();
            } catch (error) {
                console.log('error in get vehicle list', error)
            }
        }
        const getDescriptionListData = async () => {
            try {
                const res = await getDescriptionList();
                descriptionList.value = res.filter((item) => {
                    if (item.value && item.name) {
                        return item;
                    }
                })
            } catch (error) {
                console.log('error in get description list', error)
            }
        }
        const getSkuListData = async () => {
            try {
                const res = await getSkuList();
                skuList.value = res.filter((item) => {
                    if (item.value && item.name) {
                        return item;
                    }
                })
            } catch (error) {
                console.log('error in get sku list', error)
            }
        }
        const getAssurnanceListData = async () => {
            try {
                const res = await getAssuranceList();
                aseguradoraList.value = res.filter((item) => {
                    if (item.value && item.name) {
                        return item;
                    }
                })
            } catch (error) {
                console.log('error in get assurance list', error)
            }
        }
        onMounted(() => {
            tenderId.value = route.params.id;
            getUsersList();
            getPlatformsListData();
            getDescriptionListData();
            getSkuListData();
            getAssurnanceListData();
            getVehiclesListData();
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
                    user: parseInt(localStorage.getItem('user_id')),
                    tender_data: {
                        domain: '',
                    },
                }
                console.log('user', localStorage.getItem('user_id'))
                console.log('formTender', formTenderDetail.value)
            }
        });
        const handleGetCost = async () => {
            console.log('handle get cost')
            isLoadingCost.value = true;
            error.value = null;
            newCost.value = { spare_tire_amount: [] };
            const brandName = optionsBrand.find((item) => item.value === formTenderDetail.value.brand).label;
            if (!formTenderDetail.value.tire_width || !formTenderDetail.value.tire_height || !formTenderDetail.value.tire_tread || !brandName) {
                window.dispatchEvent(new CustomEvent('message-error', { detail: 'Validación: Debe seleccionar los datos de neumatico y marca' }));
                isLoadingCost.value = false;
                return;
            }
            try {
                const params = {
                    tire_width: formTenderDetail.value.tire_width,
                    tire_height: formTenderDetail.value.tire_height,
                    tire_tread: formTenderDetail.value.tire_tread,
                    brand: brandName,
                }
                const costResponse = await getTireCost(params);
                newCost.value = costResponse;
                const newKey = `${count.value}`;
                const skuN = newCost.value.spare_tire_amounts[0].sku;
                if (dataSource.value.find((item) => item.sku === skuN)) {
                    window.dispatchEvent(new CustomEvent('message-error', { detail: 'Validación: Neumático SKU ya existente N°: ' + skuN }));
                } else {
                    let total = newCost.value.spare_tire_amounts[0].cost_amount / 1.21 * 1 * (1 + parseFloat(formTenderDetail.value.fee) / 100);
                    form.items.push({
                        type: 'Neumático',
                        key: newKey,
                        sku: skuN, // Usa otro valor si es necesario
                        id: newCost.value.spare_tire_amounts[0].id,  // Usa otro valor si es necesario
                        llanta_type: newCost.value.spare_tire_amounts[0].detail, // Usa otro valor si es necesario
                        price_final: newCost.value.spare_tire_amounts[0].cost_amount,
                        quantity: 1,
                        vendor_id: '',
                        total: total,
                    });
                }
                if (!formTenderDetail.value.tire_width || !formTenderDetail.value.tire_height || !formTenderDetail.value.tire_tread || !brandName) {
                    window.dispatchEvent(new CustomEvent('message-error', { detail: 'Validación: Debe seleccionar los datos de llanta, modelo y marca' }));
                    isLoadingCost.value = false;
                    return;
                }
                const llantaParams = {
                    llanta_type: 'Llanta',
                    brand: formTenderDetail.value.tender_data.brand,
                    vehicle: formTenderDetail.value.tender_data.vehicle,
                }
                const llantaResponse = await getLlantaCost(llantaParams);
                const newKeyLlanta = `${count.value}` + 1;
                const skuL = llantaResponse.spare_tire_amounts[0].sku;

                if (form.items.find((item) => item.sku === skuL)) {
                    window.dispatchEvent(new CustomEvent('message-error', { detail: 'Validación: Llanta SKU ya existente N°: ' + skuL }));
                } else if (form.items.find((item) => item.type === 'Llanta') && !skuL) {
                    window.dispatchEvent(new CustomEvent('message-error', { detail: 'Validación: Llanta Duplicada con SKU nulo' }));
                } else {
                    form.items.push({
                        type: 'Llanta',
                        key: newKeyLlanta,
                        sku: skuL,
                        id: llantaResponse.spare_tire_amounts[0].id,
                        llanta_type: llantaResponse.spare_tire_amounts[0].detail,
                        price_final: llantaResponse.spare_tire_amounts[0].cost_amount,
                        quantity: 1,
                        vendor_id: '',
                    });
                }
                calculateTotalQuoted();
                handleGetStock();
            } catch (err) {
                error.value = err;
            } finally {
                isLoadingCost.value = false;
            }
        };
        const handleChangeAseguradora = async () => {
            if (formTenderDetail.value.company_id) {
                const aseguradora = aseguradoraList.value.find((item) => item.value === formTenderDetail.value.company_id)
                const assurance = await getVendors({ comercial_name: aseguradora.name, vendor_type: 1 });
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
        const handleEdit = (field = null) => {
            if (formTenderDetail.value.quote_state === 'N' || formTenderDetail.value.quote_state === 'E') {
                return false;
            }
            else if (formTenderDetail.value.quote_state === 'V' || formTenderDetail.value.quote_state === 'A') {
                if (field && field === 1) {
                    return false;
                }
                else {
                    return true;
                }
            }
            return true;
        }
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
            if (form.items && Array.isArray(form.items)) {
                return form.items.reduce((acc, item) => {
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
                        id: subArray[0].vendor_id,
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
                                Descripcion: item.llanta_type,
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

        //Verificar stock
        const handleGetStock = () => {
            loading.value = true;
            error.value = null;
            newCost.value = { spare_tire_amount: [] };

            // const data = dataSource.value.filter((item) => item.sku);
            const data = form.items.filter((item) => item.sku);

            if (data.length === 0) {
                window.dispatchEvent(new CustomEvent('message-error', { detail: 'Validación: No existe información para consultar' }));
                error.value = 'validacion';
                loading.value = false;
                return;
            }

            // Crear una lista de promesas para todas las llamadas a la API
            const promises = data.map((item) => {
                return getCostStock({ code: item.sku })
                    .then((res) => {
                        if (res && res.results.length > 0) {
                            const stockData = res.results[0];
                            // const dataSourceItem = dataSource.value.find((dataItem) => dataItem.sku === stockData.sku);
                            const dataSourceItem = form.items.find((dataItem) => dataItem.sku === stockData.sku);
                            // Actualizar los valores de la respuesta
                            if (dataSourceItem) {
                                dataSourceItem.noStock = dataSourceItem.quantity > stockData.available_stock ? true : false;
                                if (!dataSourceItem.noStock) {
                                    console.log('no stock', false)
                                    const neumasur = vendorList.value.find((item) => item.name === 'Neumasur');
                                    if (neumasur) {
                                        dataSourceItem.vendor_id = neumasur.value;
                                        console.log('neumasur', neumasur)
                                    }
                                }
                                return {
                                    sku: stockData.sku,
                                    producto: stockData.producto,
                                    stock: stockData.stock,
                                    minimum_stock: stockData.minimum_stock,
                                    available_stock: stockData.available_stock,
                                };
                            }

                        }
                    })
                    .catch((err) => {
                        // Manejar errores por cada SKU
                        console.error(`Error fetching stock for SKU ${item.sku}:`, err);
                    });
            });

            // Ejecutar todas las promesas en paralelo
            Promise.all(promises)
                .then((results) => {
                    dataStock.value = results.filter(Boolean); // Filtramos cualquier resultado `undefined`
                })
                .catch((err) => {
                    // Manejo de errores global
                    error.value = err;
                    console.error('Error fetching stocks:', err);
                })
                .finally(() => {
                    loading.value = false;
                });
        };
        const getUserName = (id) => {
            console.log('get user name', id)
            const user = agents.value.filter((item) => item.id === id);
            console.log('user', user)
            if (user) {
                return user[0].fullName;
            }
            return id;
        }
        const generatePedido = async () => {
            try {
                const assurance = await getVendors({ comercial_name: formTenderDetail.value.company_name, vendor_type: 1 });
                const params = {
                    "pedido_id": quoteId.value,
                    "cuit_aseguradora": assurance.results[0].cuit,
                    "apellidoynombre": formTenderDetail.value.tender_data.name,
                    "direccion": "sin dirección",
                    "ciudad": formTenderDetail.value.tender_data.city,
                    "provincia": formTenderDetail.value.tender_data.province,
                    "email": "mail@mail.com",
                    "telefono": formTenderDetail.value.tender_data.phone ? formTenderDetail.value.tender_data.phone : "1234",
                    "tipo_envio": "A",
                    "sucursal": "B",
                    "transporte": "C",
                    "estado": 0,
                    "ordenid": quoteId.value,
                    "vendedor": formTenderDetail.value.user ? formTenderDetail.value.user : 'sin usuario',
                    "nota1": "",
                    "nota2": "",
                    "nota3": ""
                };

                const response = await apiPedidos('post', params);
                const pedidoId = response.id;
                formTenderDetail.value.nota_pedido_id = pedidoId;
                const paramsCheck = {
                    "quote_id": quoteId.value,
                    "orden_compra_conformada": false,
                    "orden_compra_conformada_date": new Date(),
                    "entrega_de_mercaderia": false,
                    "entrega_de_mercaderia_date": new Date(),
                    "armado_y_embalaje": false,
                    "armado_y_embalaje_date": new Date(),
                    "generacion_lote": false,
                    "proforma": false,
                    "proforma_date": new Date(),
                    "generacion_lote_date": new Date(),
                    "gestion_documental": false,
                    "gestion_documental_date": new Date(),
                    "fletero": false,
                    "fletero_date": new Date(),
                    "facturacion_final": false,
                    "facturacion_final_date": new Date(),
                    "image_url_1": "",
                    "image_url_2": "",
                    "image_url_3": "",
                    "pedido": pedidoId,
                }
                const responseCheck = await apiChecklist('post', paramsCheck)
                console.log('response', response)
                console.log('responseCheck', responseCheck)
                onSave();
            } catch (error) {
                console.error("Error fetching vendor list:", error);
            }
        }
        const totalSelectedWithFee = computed(() => {
            let selectedItems = form.items.filter((item) => item.po);
            let total = selectedItems.reduce((sum, item) => {
                const priceWithoutTax = (parseFloat(item.price_final) || 0) / 1.21;
                const totalWithoutTax = priceWithoutTax * (parseFloat(item.quantity) || 0);
                let totalWithFee = totalWithoutTax;
                if (formTenderDetail.value.fee > 0) {
                    totalWithFee = totalWithoutTax * (1 + formTenderDetail.value.fee / 100);
                }
                return sum + totalWithFee;
            }, 0);

            return formatCurrency(total);
        });
        const totalSelected = computed(() => {
            let selectedItems = form.items.filter((item) => item.po);
            let total = selectedItems.reduce((sum, item) => {
                const priceWithoutTax = (parseFloat(item.price_final) || 0) / 1.21;
                const totalWithoutTax = priceWithoutTax * (parseFloat(item.quantity) || 0);
                return sum + totalWithoutTax;
            }, 0);

            return formatCurrency(total);
        });
        const totalSelectedIva = computed(() => {
            let selectedItems = form.items.filter((item) => item.po);
            let total = selectedItems.reduce((sum, item) => {
                const priceWithoutTax = (parseFloat(item.price_final) || 0);
                const totalWithoutTax = priceWithoutTax * (parseFloat(item.quantity) || 0);
                return sum + totalWithoutTax;
            }, 0);

            return formatCurrency(total);
        });
        const totalSelectedWithFreight = computed(() => {
            let selectedItems = form.items.filter((item) => item.po);
            let total = selectedItems.reduce((sum, item) => {
                const priceWithoutTax = (parseFloat(item.price_final) || 0) / 1.21;
                const totalWithoutTax = priceWithoutTax * (parseFloat(item.quantity) || 0);
                let totalWithFee = totalWithoutTax;
                if (formTenderDetail.value.fee > 0) {
                    totalWithFee = totalWithoutTax * (1 + formTenderDetail.value.fee / 100);
                }
                return sum + totalWithFee;
            }, 0);
            if (formTenderDetail.value.freight > 0) {
                total += parseFloat(formTenderDetail.value.freight)
            }
            return formatCurrency(total);
        });
        const updateTotalSelected = () => {
            // totalSelected.value = form.items
            //     .filter((item) => item.po);
            // totalSelected.value = form.items
            //     .filter((item) => item.po)
            //     .reduce((sum, item) => sum + (item.total || 0), 0)
            // //     .toFixed(2);
            // console.log('Total Selected:', totalSelected.value);
        };

        const addItemDetail = () => {
            form.items.push({
                key: Date.now(),
                po: false,
                type: null,
                sku: null,
                llanta_type: null,
                vendor: null,
                price_final: null,
                quantity: null,
                amount_wo_iva: 0,
                total: 0,
            });
        };

        const removeItem = (index) => {
            form.items.splice(index, 1);
        };

        const updateCalculatedFields = (item, index) => {
            const priceWithoutTax = (item.price_final || 0) / 1.21;
            const totalWithoutTax = priceWithoutTax * (item.quantity || 0);

            let totalWithFee = totalWithoutTax;
            if (formTenderDetail.value.fee > 0) {
                totalWithFee = totalWithoutTax * (1 + formTenderDetail.value.fee / 100);
            }
            form.items[index].amount_wo_iva = totalWithoutTax;
            item.total = totalWithFee;
            calculateTireType();
            handleGetStock();
        };

        const submitForm = () => {
            console.log("Submitted form:", form);
        };

        const resetForm = () => {
            form.items = [];
        };

        addItemDetail(); // Start with one empty field
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
            formRefAdd,
            rules,
            onLicitar,
            dataQuoteSource,
            countDetail,
            handleDetailAdd,
            imageSelect,
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
            userRoles,
            handleGetStock,
            isLoadingCost,
            descriptionList,
            skuList,
            filterOptionName,
            handleChangeSku,
            llantaTypeDescription,
            dataStock,
            columnsStock,
            getUserName,
            vehicleList,
            handleChangeDescription,
            filterOptionValue,
            fetchDescription,
            handleSearchDescription,
            generatePedido,
            totalSelectedWithFee,
            addItemDetail,
            removeItem,
            updateCalculatedFields,
            submitForm,
            resetForm,
            form,
            updateTotalSelected,
            formEnvio,
            formEnvioRef,
            formPedido,
            rulesForm,
            totalSelected,
            totalSelectedWithFreight,
            totalSelectedIva,
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
    margin-top: 1%;
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
    font-size: larger;
    font-weight: bolder !important;

}

.footer-oc {
    margin-top: 1%;

}

.boton {
    margin-top: 1%;

}

.btn-check {
    margin-top: 1%;
}

.stock-table {
    margin-top: 1%;
}
</style>