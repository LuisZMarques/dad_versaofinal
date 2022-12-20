<template>
    <modal :show="props.show" :user="user">
        <div class="row justify-content-center">
            <div class="col-4">
                <div class="card text-white" style="background-color: rebeccapurple;max-width: 80%;padding: 1rem;text-align: center;">
                    <div class="card-body">
                        <h2 class="fw-bold mb-2 text-center">FasTuga</h2>
                        <h5 class="fw-bold mb-2 text-center">Editar Utilizador</h5>
                        <div class="text-center">
                            <img :src="photoFullUrl" class="rounded img-thumbnail" alt="...">
                        </div>
                        <div class="mb-3">
                            <label for="email" class=" form-label fw-bold">Nome:</label>
                            <input type="text" class="form-control" id="name" placeholder="name" v-model="user.name">
                        </div>
                        <div class=" mb-3">
                            <label for="email" class="form-label fw-bold ">Email:</label>
                            <input type="email" class="form-control" id="email" placeholder="name@example.com"
                                v-model="user.email">
                        </div>
                        <div class=" mb-3">
                            <label for="photo_do_producto" class="form-label fw-bold ">Atualizar foto perfil:</label>
                            <input class="form-control form-control-sm" id="photo_url" type="file"
                                @change="usersStore.uploadImage($event)">
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label fw-bold">Password:</label>
                            <input type="password" class="form-control" id="password" placeholder="*******"
                                v-model="user.password">
                        </div>
                        <div class="d-grid">
                            <div class="btn-group" style="margin-bottom : 0.5rem">
                                <button class="btn btrn-sm btn-outline-danger" type="button"
                                    @click="$emit('close')">Cancel</button>
                                <button class="btn btrn-sm btn-outline-success" type="button"
                                    @click="usersStore.updateUser(user)">Modificar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </modal>
</template>
  
<script setup>

import { useUsersStore } from '@/stores/users.js'
import { ref, inject, computed, watch } from 'vue';
import Modal from '@/components/global/modal.vue'

const serverBaseUrl = inject("serverBaseUrl");
const axios = inject('axios')

const usersStore = useUsersStore()

const props = defineProps(['show', 'user', 'close'])

const photoFullUrl = computed(() => {
    return props.user.photo_url
        ? serverBaseUrl + "/storage/fotos/" + props.user.photo_url
        : serverBaseUrl + "/storage/fotos/anonyms.png";
});


</script>