<script setup lang="ts">
  import { ref } from 'vue';
  import { useStories } from '@/stores/useStories';

  const stories = useStories();
  const imageFile = ref<File | null>(null);
  const imagePreview = ref<string | undefined>(undefined);

  const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      imageFile.value = target.files[0];
      imagePreview.value = URL.createObjectURL(target.files[0]);
    }
  };

  const submitStory = () => {
    if (imageFile.value) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        stories.addStory(base64Image);
        imageFile.value = null;
      };
      reader.readAsDataURL(imageFile.value);
    }
  };
</script>
<template>
  <div class="story-form">
    <span>preview</span>
    <img
      v-if="imageFile"
      :src="imagePreview"
      alt="Image Preview"
      style="max-width: 200px; max-height: 200px;"
    />
    <input
      type="file"
      @change="handleFileChange"
      accept="image/*"
    />
    <button @click="submitStory">Submit Story</button>
  </div>
</template>