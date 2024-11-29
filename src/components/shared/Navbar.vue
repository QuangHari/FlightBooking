<template>
    <nav class="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Left section: Logos -->
          <div class="flex items-center gap-6">
            <a href="/" class="flex-shrink-0">
              <img src="" alt="QAirline" class="h-10" />
            </a>
            <div class="h-8 w-px bg-gray-200"></div>
            <a href="/" class="flex-shrink-0">
              <img src="" alt="OneWorld" class="h-7" />
            </a>
          </div>
  
          <!-- Middle section: Main navigation -->
          <div class="hidden lg:flex items-center gap-8">
            <a 
              v-for="item in navigationItems" 
              :key="item"
              href="#"
              class="text-gray-700 hover:text-purple-700 font-medium transition-colors"
            >
              {{ item }}
            </a>
          </div>
  
          <!-- Right section: Actions -->
          <div class="flex items-center gap-6">
            <a href="#" class="text-gray-700 hover:text-purple-700 font-medium hidden sm:block">
              Help
            </a>
            <button class="text-gray-700 hover:text-purple-700">
              <Search class="w-5 h-5" />
            </button>
            <div class="flex items-center gap-2 text-gray-700 hover:text-purple-700 cursor-pointer">
              <img 
                src="" 
                alt="US Flag" 
                class="h-5 w-7 rounded"
              />
              <span class="font-medium hidden sm:block">EN</span>
            </div>
            <div class="h-8 w-px bg-gray-200 hidden sm:block"></div>
            <div class="flex items-center gap-2">
              <User2 class="w-5 h-5 text-gray-700" />
              <a href="#" class="text-gray-700 hover:text-purple-700 font-medium whitespace-nowrap hidden sm:block">
                Log in | Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Mobile menu button -->
      <div class="lg:hidden absolute right-4 top-6">
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="text-gray-700 hover:text-purple-700"
        >
          <Menu v-if="!isMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>
  
      <!-- Mobile menu -->
      <div 
        v-if="isMenuOpen" 
        class="lg:hidden"
      >
        <div class="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
          <a
            v-for="item in navigationItems"
            :key="item"
            href="#"
            class="block px-3 py-2 text-gray-700 hover:text-purple-700 font-medium"
          >
            {{ item }}
          </a>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup lang ="ts">
  import { ref } from 'vue'
  import { Search, User2, Menu, X } from 'lucide-vue-next'
  
  const navigationItems = ['Explore', 'Book', 'Experience', 'Privilege Club']
  const isMenuOpen = ref(false)
  </script>
  <script lang = "ts">
    export default {
    name: "NavBar",
  };
  </script>
