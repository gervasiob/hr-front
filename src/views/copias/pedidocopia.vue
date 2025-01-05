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