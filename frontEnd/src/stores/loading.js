import { ref } from "vue";
import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", () => {

    const isLoading = ref(false)

    function toggleLoading(){
        isLoading.value = !isLoading.value;
    }

    return {
        isLoading,
        toggleLoading
    };
});