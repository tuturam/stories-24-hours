<script setup lang="ts">
  import { ref } from 'vue';
  import { useStories } from '@/stores/useStories';
  import { useDialog } from '@/stores/useDialog';

  const stories = useStories();
  const dialog = useDialog();
  const imageFile = ref<File | null>(null);
  const imagePreview = ref<string | undefined>(undefined);
  const refFileInput = ref<HTMLInputElement | null>(null);
  const isDragging = ref(false);

  const handleFileChange = () => {
    const target = refFileInput.value as HTMLInputElement;
    if (target.files && target.files[0]) {
      imageFile.value = target.files[0];
      imagePreview.value = URL.createObjectURL(target.files[0]);
    }
  };

  const handleDragDrop = (event: DragEvent) => {
    event.preventDefault();
    isDragging.value = false;
    if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
      imageFile.value = event.dataTransfer.files[0];
      imagePreview.value = URL.createObjectURL(event.dataTransfer.files[0]);
    }
  };

  const handleClickSelectFile = () => {
    refFileInput.value?.click();
  };

  const onDragOver = (event: DragEvent) => {
    isDragging.value = true;
  };

  const onDragLeave = (event: DragEvent) => {
    isDragging.value = false;
  };

  const submitStory = () => {
    if (imageFile.value) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        stories.addStory(base64Image);
        imageFile.value = null;
        dialog.closeDialog();
      };
      reader.readAsDataURL(imageFile.value);
    }
  };
</script>
<template>
  <div class="story-form">
    <!-- container drag n drop -->
     <div 
      class="drag-drop-container"
      @dragover.prevent="onDragOver" 
      @drop.prevent="handleDragDrop"
      @dragleave.prevent="onDragLeave"
      :class="{ dragging: isDragging, 'dropped-image': imagePreview }"
    >
      <div v-if="imageFile">
        <img :src="imagePreview" :alt="imageFile?.name" style="width: 100%; height: 100%;">
      </div>
      <div v-else>
        Drag and drop an image here
        or <a href="" @click.prevent="handleClickSelectFile">click here</a> to select a file.
      </div>
     </div>
    <input
      ref="refFileInput"
      type="file"
      @change="handleFileChange"
      accept="image/*"
      style="display: none;"
    />
    <button class="submit-btn" @click="submitStory">Submit Story</button>
  </div>
</template>

<style scoped>
  .drag-drop-container {
    border: 2px dashed #ccc;
    padding: 1rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  .drag-drop-container.dragging {
    border-color: #000;
  }
  .drag-drop-container.dropped-image {
    padding: 0;
    border: none;
  }
  .submit-btn {
    padding: 0.5rem 1rem;
    background-color: black;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
  }
  .submit-btn:hover {
    background-color: #333;
  }
</style>