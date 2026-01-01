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

  const showCreateDialog = () => {
    openDialog.value = true;
  };
</script>

<template>
  <div class="story-container">
    <div class="header">
      <h1>Stories 24 Hours</h1>
    </div>
    <div class="story-list">
      <div class="create-story story-list-item" @click="showCreateDialog">
        +
      </div>
      <div
        v-for="story in stories.story"
        :key="story.id"
        class="story-list-item stories"
      >
        <img :src="story.base64Image" alt="">
      </div>
    </div>
  </div>
  <Dialog
    :show="openDialog"
    title="Add story"
    :onClose="() => openDialog = false"
  >
  <StoryForm />
  </Dialog>
</template>

<style>
  .header {
    text-align: center;
    padding: 1rem;
  }
  .story-list-item {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    cursor: pointer;
    font-weight: bold;
    overflow: hidden;
  }
  .create-story.story-list-item {
    border: 3px solid #ccc;
    color: #ccc
  }
  .stories.story-list-item {
    border: 3px solid black;
  }
  .story-list {
    display: flex;
    gap: 1rem;
    margin: 1rem;
  }
  .story-list-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>