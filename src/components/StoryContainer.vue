<script setup>
  import { useStories } from '@/stores/useStories';
  import StoryForm from './StoryForm.vue';
  import { onMounted, ref } from 'vue';
  import Dialog from './Dialog.vue';

  const stories = useStories();
  onMounted(() => {
    stories.getStories()
  });
  const openDialog = ref(false);
</script>

<template>
  <div class="story-container">
    <div class="header">
      <h1>Stories 24 Hours</h1>
    </div>
    <!-- <div
      v-for="story in stories.story"
      :key="story.id"
      class="story-item"
    >
      <img :src="story.base64Image" alt="" style="max-width: 200px; max-height: 200px;" />
    </div> -->
  </div>
  <Dialog
    :show="openDialog"
    title="Add story"
    :onClose="() => openDialog = false"
  >
  <StoryForm />
  </Dialog>
  <button @click="openDialog = true">Add Story</button>
</template>

<style>
  .header {
    text-align: center;
    padding: 1rem;
  }
</style>