<template>
  <div class="relative bg-white rounded-lg shadow-md overflow-hidden max-w-sm m-4">
    <!-- Image Section -->
    <div class="h-40 overflow-hidden">
      <img class="w-full h-full object-cover" :src="imageSrc" :alt="title" />
  
    </div>
    <!-- Text Section -->
    <div class="p-4">
      <h2 class="text-xl font-semibold text-gray-800 mb-2">{{ title }}</h2>
      <hr class="border-t border-gray-200 my-2 absolute bottom-8 left-4 right-4">
      <div class="flex items-center justify-between text-gray-600 font-medium">
        <button class="absolute bottom-4 bg-transparent text-gray-600 font-medium py-1 px-2 rounded hover:text-[#d0c5a4]">
          {{ subtitle }}
        </button>
        <span class="absolute bottom-4 right-4">&#x2794;</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "CardItem",
  props: {
    imageSrc: {
      type: String,
      required: true, // Input for the image path
    },
    title: {
      type: String,
      required: true, // Input for the card title
    },
    subtitle: {
      type: String,
      required: true, // Input for the subtitle or description
    },
  },
};
</script>