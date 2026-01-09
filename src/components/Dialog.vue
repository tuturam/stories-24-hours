<script setup lang="ts">
import { onMounted } from 'vue';

  interface DialogProps {
    show: boolean;
    title?: string;
    onClose?: () => void;
  }
  const props = defineProps<DialogProps>()
  onMounted(() => {
    // handle close esc key
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && props.show) {
        props.onClose && props.onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  })
</script>

<template>
  <div
    v-if="props.show"
    class="dialog-backdrop"
    @click="props.onClose && props.onClose()"
  >
    <div
      class="dialog-content"
      @click.stop
    >
      <h2 v-if="props.title">{{ props.title }}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.dialog-backdrop {
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.dialog-content {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  min-width: 300px;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>