<template>
    <div :style="{ display: 'grid', gridTemplateColumns: `repeat(${dynamicColumns}, 1fr)`, gap: gridGap }">
        <a-card v-for="(card, index) in cards" :key="index"
            :hoverable="card.hoverable !== undefined ? card.hoverable : defaultHoverable"
            :style="{ width: card.width || defaultWidth, backgroundColor: getCardBackground(card.quote_state), ...card.cardStyle, ...defaultCardStyle }"
            @click="navigateRoute(card[navigateId])">
            <!-- Imagen con altura y ancho definidos -->
            <template #cover v-if="card.image">
                <img :alt="card.imageAlt || 'Card cover'" :src="card.image" :style="imageStyle" />
            </template>

            <!-- Título y descripción dinámicos -->
            <a-card-meta>
                <template #title>
                    <span>{{ card.domain }} - {{ card.vehicle }} </span>
                </template>
                <template #description>
                    <span> {{ getCardState(card.quote_state) }}</span>
                    <div style="font-size: 12px; line-height: 1.2; text-align: left;">
                        <p><strong>Compañía:</strong> {{ card.company_name }}</p>
                        <p><strong>Fecha del reclamo:</strong> {{ card.claim_date }}</p>
                        <p><strong>Ciudad:</strong> {{ card.city }}</p>
                        <p><strong>Provincia:</strong> {{ card.province }}</p>
                    </div>
                    <div class="footer-btn">
                        <a-button type="primary" shape="circle" :size="size"
                            @click="(event) => handleNewTab(event, card[navigateId])">
                            <template #icon>
                                <ExportOutlined />
                            </template>
                        </a-button>
                    </div>
                </template>
            </a-card-meta>
        </a-card>
    </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { ExportOutlined } from '@ant-design/icons-vue';

import { navigateTo } from '@/utils/utils';
import { TENDER_STATES } from '@/common/common';
import { upperCase } from 'lodash';

export default {
    name: 'BasicCards',
    components: {
        ExportOutlined,
    },
    props: {
        cards: {
            type: Array,
            required: true, // Se espera un array de objetos de tarjetas
        },
        columns: {
            type: Number,
            default: 3, // Número de columnas en el grid
        },
        gridGap: {
            type: String,
            default: "16px", // Espaciado entre tarjetas
        },
        defaultWidth: {
            type: String,
            default: "240px", // Ancho por defecto para cada tarjeta
        },
        defaultHoverable: {
            type: Boolean,
            default: true, // Si las tarjetas son hoverable por defecto
        },
        baseRoute: {
            type: String,
            required: true, // Ruta base que se recibe como prop
        },
        navigateId: {
            type: String,
            default: 'claims_id', // Ruta base que se recibe como prop
        },
    },
    setup(props) {
        const defaultCardStyle = {
            minHeight: "200px", // Altura mínima de la tarjeta
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        };
        const imageStyle = {
            width: "100%",
            height: "120px", // Altura fija para la imagen
            objectFit: "cover", // Ajusta la imagen para llenar el espacio definido
        };
        const getCardBackground = (state) => {
            if (!state) {
                return '';
            }
            const tenderState = TENDER_STATES.find((item) => item.value === state);
            return tenderState.back ? tenderState.back : '';
        }
        const getCardState = (state) => {
            if (!state) {
                return '';
            }
            const tenderState = TENDER_STATES.find((item) => item.value === state);
            return tenderState.label ? upperCase(tenderState.label) : '';
        }
        const dynamicColumns = ref(props.columns);
        const screenWidth = ref(window.innerWidth); // Ancho de la pantalla

        const setColumnsBasedOnScreenSize = () => {
            if (screenWidth.value < 560) {
                dynamicColumns.value = 1; // Pantallas pequeñas
            } else if (screenWidth.value < 820) {
                dynamicColumns.value = 2;
            } else if (screenWidth.value >= 820 && screenWidth.value < 1080) {
                dynamicColumns.value = 3; // Pantallas medianas
            } else {
                dynamicColumns.value = 5; // Pantallas grandes
            }
        };

        // Ajustar las columnas al montar el componente y al redimensionar la ventana
        onMounted(() => {
            setColumnsBasedOnScreenSize();
            window.addEventListener('resize', updateScreenWidth);
        });

        onBeforeUnmount(() => {
            window.removeEventListener('resize', updateScreenWidth);
        });

        // Actualiza el valor de screenWidth y recalcula las columnas
        const updateScreenWidth = () => {
            screenWidth.value = window.innerWidth;
            setColumnsBasedOnScreenSize();
        };
        const navigateRoute = (id) => {
            navigateTo(id, props.baseRoute, true);
        };
        const handleNewTab = (event, id) => {
            event.stopPropagation();
            navigateTo(id, props.baseRoute, true, {}, true);
        };

        return {
            defaultCardStyle,
            imageStyle,
            getCardBackground,
            navigateRoute,
            dynamicColumns,
            handleNewTab,
            getCardState,
        }
    }
}
</script>

<style>
.footer-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.a-card {
    position: relative;
    overflow: hidden;
}
</style>