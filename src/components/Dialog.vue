<script setup lang="ts">
  interface DialogProps {
    show: boolean;
    title?: string;
    onClose?: () => void;
  }
  const props = defineProps<DialogProps>()
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>