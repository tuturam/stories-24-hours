<script setup lang="ts">
  import { useStories } from '@/stores/useStories';
  import StoryForm from './StoryForm.vue';
import { onMounted } from 'vue';

  const stories = useStories();
  onMounted(() => {
    stories.getStories()
  });
</script>

<template>
  <div class="story-container">
    <div
      v-for="story in stories.story"
      :key="story.id"
      class="story-item"
    >
      <img :src="story.base64Image" alt="" style="max-width: 200px; max-height: 200px;" />
    </div>
  </div>
  <StoryForm />
</template>