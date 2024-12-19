<template>
    <div class="bg-white rounded-lg shadow-md p-6 w-full">
      <!-- Main Content -->
      <div class="space-y-4">
        <!-- Plane Name -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-semibold text-gray-900">{{ name }} </h3>
            <p class="text-sm text-gray-500">Aircraft Information</p>
          </div>
          <Plane class="w-6 h-6 text-gray-400" />
        </div>
  
        <!-- Seats Information -->
        <div class="flex items-center space-x-2">
          <Users class="w-5 h-5 text-gray-400" />
          <span class="text-gray-700">{{ capacity }} seats</span>
        </div>
  
        <!-- Details Button -->
        <button 
          @click="showModal = true"
          class="w-full mt-4 bg-[#4f4939] text-white py-2 px-4 rounded-md hover:bg-[#d0c5a4] transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Info class="w-4 h-4" />
          <span>Plane Details</span>
        </button>
      </div>
  
      <!-- Modal -->
      <Teleport to="body">
        <div v-if="showModal" 
             class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
             @click.self="showModal = false">
          <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4 relative">
            <!-- Close Button -->
            <button 
              @click="showModal = false"
              class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X class="w-6 h-6" />
            </button>
  
            <!-- Modal Content -->
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <Plane class="w-8 h-8 text-[#4f4939]" />
                <h3 class="text-2xl font-semibold text-gray-900">{{ name }}</h3>
              </div>
              
              <div class="flex items-center space-x-2 text-gray-600">
                <Users class="w-5 h-5" />
                <span>Capacity: {{ capacity }} seats</span>
              </div>
  
              <div class="mt-4">
                <h4 class="text-lg font-medium text-gray-900 mb-2">Description</h4>
                <p class="text-gray-600 leading-relaxed">
                  {{ details }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  import {  ref } from 'vue'
  import { Plane, Users, Info, X } from 'lucide-vue-next'

  
  // Props definition
 defineProps({
    name: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    },
    details: {
      type: String,
      required: true
    }
  })
  

 
  const showModal = ref(false)
  </script>
  
  <script lang="ts">
  export default {
    name: 'AdminPlaneCard'
  }
  </script>