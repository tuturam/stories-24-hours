<script setup lang="ts">
  const props = defineProps<{
    open: boolean;
  }>();
</script>

<template>
  <div class="story-viewer" v-if="open">
    <div class="story-image-container">
      <!-- <img :src="storyImage" alt="Story Image" class="story-image" /> -->
    </div>
    <div class="story-timer-bar">
      <div 
        class="timer-fill" 
      ></div>
    </div>
  </div>
</template>