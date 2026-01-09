<script setup lang="ts">
  import { useStories } from '@/stores/useStories';
  import { computed, onMounted, onUnmounted, ref } from 'vue';

  const stories = useStories()
  const computedStories = computed(() => stories.story);
  const currentIndex = ref(0)
  const progress = ref(0);
  const isPaused = ref(false);
  const STORY_DURATION = 3000; // 3 seconds per story
  let intervalId: number | null = null;
  const props = defineProps<{
    open: boolean;
    currentIndexProp: number;
  }>();
  const emit = defineEmits<{
    (e: 'close'): void;
  }>();

  const startTimer = () => {
    if (intervalId) clearInterval(intervalId); // Hapus timer lama
    
    const increment = 100 / (STORY_DURATION / 100); // = 100 / 50 = 2
    
    intervalId = setInterval(() => {
      if (!isPaused.value) {
        progress.value += increment; // +2% setiap 100ms
        
        if (progress.value >= 100) {
          nextStory(); // Pindah story berikutnya
        }
      }
    }, 100); // Jalan tiap 100ms
  };
  const nextStory = () => {
    progress.value = 0;
    if (currentIndex.value < computedStories.value.length - 1) {
      currentIndex.value++;
    } else {
      // Jika sudah di story terakhir, tutup viewer
      emit('close');
      currentIndex.value = 0; // Reset ke story pertama
    }
  };
  const prevStory = () => {
    progress.value = 0;
    if (currentIndex.value > 0) {
      currentIndex.value--;
    }
  }
  const resetProgress = () => {
    progress.value = 0;
  }
  const handlePrevAndNextScreen = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const x = e.clientX;
    const widthElement = target.offsetWidth;
    if (x < widthElement / 2) {
      // Klik di kiri layar
      prevStory();
    } else {
      // Klik di kanan layar
      nextStory();
    }
    resetProgress();
  };
  const pauseStory = () => {
    isPaused.value = true;
  };
  const resumeStory = () => {
    isPaused.value = false;
  };
  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && props.open) {
      emit('close');
    }
  };

  onMounted(() => {
    startTimer();

    // handle esc key to close viewer
    window.addEventListener('keydown', handleEsc);
  });
  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  });
</script>

<template>
  <div class="story-viewer" v-if="open" @click.self="handlePrevAndNextScreen" @mousedown="pauseStory" @mouseup="resumeStory" @mouseleave="resumeStory">
    <!-- close buttton -->
    <button 
      class="close-button"
      @click="$emit('close')"
    >×</button>
    <!-- Progress bars untuk semua story (di atas) -->
    <div class="progress-bars-container">
      <div 
        v-for="(story, index) in computedStories" 
        :key="story.id"
        class="progress-bar"
      >
        <div 
          class="progress-fill"
          :style="{ 
            width: index === currentIndex ? progress + '%' 
                 : (index < currentIndex ? '100%' : '0%') 
          }"
        ></div>
      </div>
    </div>

    <!-- Carousel container dengan transform translateX -->
    <div class="carousel-container">
      <div 
        class="carousel-track"
        :style="{ 
          transform: `translateX(calc(-${currentIndex * 100}% - ${currentIndex * 16}px))`
        }"
      >
        <div 
          v-for="story in computedStories" 
          :key="story.id"
          class="carousel-slide"
        >
          <img :src="story.base64Image" alt="Story Image" class="story-image" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .story-viewer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2000;
  }

  /* Progress bars di atas */
  .progress-bars-container {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 6px;
    z-index: 10;
    width: 90%;
    max-width: 500px;
  }

  .progress-bar {
    flex: 1;
    height: 3px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background-color: white;
    transition: width 0.1s linear;
  }

  /* Carousel */
  .carousel-container {
    position: relative;
    width: 90%;
    max-width: 500px;
    height: 80vh;
    overflow: hidden;
    border-radius: 25px;
  }

  .carousel-track {
    display: flex;
    height: 100%;
    gap: 16px;
    transition: transform 0.5s ease-in-out;
  }

  .carousel-slide {
    flex: 0 0 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
  }

  .story-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 25px;
    user-select: none;
  }
  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    z-index: 10;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>