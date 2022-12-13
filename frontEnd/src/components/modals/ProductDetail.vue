
<script setup>
    import Modal from '@/components/global/modal.vue'
    import { ref, computed, inject } from 'vue';

    import { useProductsStore } from '../../stores/products.js'

    const serverBaseUrl = inject("serverBaseUrl");

    const productsStore = useProductsStore();

    const emit = defineEmits(['close'])

    let props = defineProps({
        product: {
            type: Object,
            required: true
        },
        showProduct: {
            type: Boolean
        }
    })

    let editingProduct = ref(props.product)

    const photoFullUrl = computed(() => {
        return props.product.photo_url
            ? serverBaseUrl + "/storage/products/" + props.product.photo_url
            : null
    })

    let atualizar = () => {
        if (productsStore.updateProduct(editingProduct.value))
            emit('close')
    }


</script>

<template>
    <modal :show="showProduct">
        <div class="row justify-content-center">
            <div class="col-6">
                <div class="card text-white" style="background-color: rebeccapurple;max-width: 80%;padding: 1rem;">
                    <img :src="photoFullUrl" class="mx-auto"
                        alt="https://a.storyblok.com/f/108717/960x640/7fd6d1bd50/7-tipps-fur-gute-food-fotografie1.jpg"
                        height="150" width="150" />
                    <div class="card-body">
                        <h4 class="fw-bold mb-3">{{ editingProduct.name }}</h4>
                        <p class="mb-1 fst-italic small">Atualizar os dados do producto</p>
                        <div class="mb-3 row">
                            <div class="col-12 col-md-4">
                                <label for="nome_do_producto" class="fw-bold">Nome:</label>
                                <input type="text" class="form-control form-control-sm" id="nome_do_producto"
                                    placeholder="nome do producto" v-model="editingProduct.name">
                            </div>
                            <div class="col-12 col-md-2">
                                <label for="tipo_de_producto" class="fw-bold">Tipo:</label>
                                <select class="form-select form-select-sm" aria-label=".form-select-sm example"
                                    v-model="editingProduct.type">
                                    <option selected>Selecionar</option>
                                    <option value="hot dish">Hot dish</option>
                                    <option value="cold dish">Cold dish</option>
                                    <option value="drink">Drink</option>
                                    <option value="dessert">Dessert</option>
                                </select>
                            </div>
                            <div class="col-12 col-md-2">
                                <label for="preco_do_producto" class="fw-bold">Preço:</label>
                                <input type="number" class="form-control form-control-sm" id="preco_do_producto"
                                    placeholder="preco do producto" v-model="editingProduct.price">
                            </div>
                            <div class="col-12 col-md-4">
                                <label for="photo_do_producto" class="fw-bold">Foto de producto:</label>
                                <input class="form-control form-control-sm" id="photo_url" type="file"
                                    @change="productsStore.uploadImage($event)">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="descricao_do_product" class="fw-bold float-left">Descrição:</label>
                            <textarea class="form-control" placeholder="Descrição do producto" id="descricao_do_product"
                                v-model="editingProduct.description" style="height: 100px"></textarea>
                        </div>
                        <div class="d-grid">
                            <div class="d-flex justify-content-between">
                                <button class="btn btrn-sm btn-outline-dark" type="button"
                                    @click="$emit('close')">Cancelar</button>
                                <button class="btn btrn-sm btn-outline-primary" type="button"
                                    @click="atualizar">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>