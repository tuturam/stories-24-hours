import { defineStore } from "pinia";
import { ref } from "vue";

export interface Story {
  id: string;
  createdAt: string;
  base64Image: string;
  expiredAt: string;
}

const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const useStories = defineStore("stories", () => {
  const story = ref<Story[]>([])
  
  const addStory = (base64Image: string) => {
    const now = Date.now();
    const id = crypto.randomUUID();
    const expiredAt = new Date(now + EXPIRATION_TIME).toISOString();
    const createdAt = new Date(now).toISOString();
    const newStory: Story = {
      id,
      createdAt,
      base64Image,
      expiredAt
    };

    story.value.push(newStory);
    saveStoriesToLocalStorage();
  }
  const clearStories = () => {
    story.value = [];
    saveStoriesToLocalStorage();
  }
  const getStories = () => {
    // get from localStorage
    try {
      // const storedStories = localStorage.getItem('stories');
      // if (storedStories) {
      //   story.value = JSON.parse(storedStories);
      // }
      throw new Error('Error retrieving stories from localStorage');
    } catch (error) {
      console.error('Error retrieving stories from localStorage:', error);
    }
  }
  const removeExpiredStories = () => {
    const now = Date.now();
    story.value = story.value.filter(
      (s) => now < new Date(s.expiredAt).getTime()
    );
    saveStoriesToLocalStorage();
  }
  const saveStoriesToLocalStorage = () => {
    try {
      localStorage.setItem('stories', JSON.stringify(story.value));
    } catch (error) {
      console.error('Error saving stories to localStorage:', error);
    }
  }
  return { story, addStory, clearStories, getStories, removeExpiredStories };
})