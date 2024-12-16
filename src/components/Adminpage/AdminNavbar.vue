<template>
    <nav class="fixed top-0 left-0 right-0 bg-[#f8f8f8] border-b border-gray-100 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Left section: Logos -->
          <div class="flex items-center gap-6">
            <a href="/" class="flex-shrink-0">
              <img src="../../assets/MainLogo_shadow.png" alt="QAirline" class="h-10" />
            </a>
            <div class="h-8 w-px bg-gray-200"></div>
            <a href="/" class="flex-shrink-0">
              <img src="../../assets/Oneworld_logo.svg.png" alt="OneWorld" class="h-7" />
            </a>
          </div>
  
          <!-- Middle section: Main navigation -->
          <div class="hidden lg:flex items-center gap-8">
            <a 
              v-for="item in navigationItems" 
              :key="item"
              href="#"
                class="text-gray-700 hover:text-[#d0c5a4] font-medium transition-colors"
            >
              {{ item }}
            </a>
          </div>
  
          <!-- Right section: Actions -->
          <div class="flex items-center gap-6">
            <button class="text-gray-700 hover:text-[#d0c5a4]">
            </button>
            <div class="flex items-center gap-2 text-gray-700 hover:text-[#d0c5a4] cursor-pointer">
              <img 
                src="../../assets/USflag.png" 
                alt="US Flag" 
                class="h-5 w-7 rounded"
              />
              <span class="font-medium hidden sm:block">EN</span>
            </div>
            <div class="h-8 w-px bg-gray-200 hidden sm:block"></div>
            <div class="flex items-center gap-2">
              <a href="/author" class="text-gray-700 hover:text-[#d0c5a4] font-medium whitespace-nowrap hidden sm:block">
              Sign in | Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup lang ="ts">
    import { ref } from 'vue';
    const navigationItems = ref(['Edit Flight Info', 'Add Flight', 'Add Plance', 'Publish Ad']);
  </script>


  <script lang = "ts">
    export default {
    name: "AdminNavbar",
  };
  </script>
