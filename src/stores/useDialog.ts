import { defineStore } from "pinia";
import { ref } from "vue";

export const useDialog = defineStore("dialog", () => {
  const isOpen = ref(false);

  const openDialog = () => {
    isOpen.value = true;
  };

  const closeDialog = () => {
    isOpen.value = false;
  };

  return { isOpen, openDialog, closeDialog };
});