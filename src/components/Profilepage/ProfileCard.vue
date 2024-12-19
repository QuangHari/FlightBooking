<template>
    <div class="bg-white rounded-3xl shadow-md p-8 max-w-2xl mx-auto">
      <!-- Header with Profile Icon -->
      <div class="flex items-center gap-4 mb-6">
        <div 
          class="w-16 h-16 rounded-full bg-[#d0c5a4] text-white flex items-center justify-center text-2xl font-bold"
          aria-label="Profile initial"
        >
          {{ lastName[0] }}
        </div>
        <h1 class="text-2xl font-bold text-[#4f4939]">{{ firstName }} {{ lastName }}</h1>
      </div>
  
      <!-- Profile Information -->
      <div class="space-y-4">
        <div v-for="(value, key) in profileData" :key="key" class="flex items-center justify-between p-4 bg-gray-100 rounded-3xl shadow-md">
          <div>
            <p class="text-sm text-gray-500 capitalize">{{ key }}</p>
            <p class="font-medium text-[#4f4939]">{{ value }}</p>
          </div>
          <button 
            @click="openModal(key)"
            class="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <PencilIcon class="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
  
      <!-- Edit Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div class="bg-white rounded-lg p-6 w-full max-w-md">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-[#4f4939]">Edit {{ activeField }}</h2>
            <button @click="closeModal" class="p-1 hover:bg-gray-100 rounded-full">
              <XIcon class="w-6 h-6" />
            </button>
          </div>
          
          <input
            v-model="editValue"
            :type="activeField === 'email' ? 'email' : 'text'"
            class="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-gray-200 outline-none"
            :placeholder="`Enter new ${activeField}`"
          />
          
          <div class="flex justify-end gap-2">
            <button 
              @click="closeModal"
              class="px-4 py-2 text-[#4f4939] hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
            <button 
              @click="saveChanges"
              class="px-4 py-2 bg-[#4f4939] text-white rounded-lg hover:bg-[#d0c5a4]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { PencilIcon, XIcon } from 'lucide-vue-next'
  
  interface ProfileProps {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  }
  
  interface ProfileData {
    username: string;
    email: string;
    'first name': string;
    'last name': string;
  }
  
  const props = withDefaults(defineProps<ProfileProps>(), {
    username: '',
    email: '',
    firstName: '',
    lastName: ''
  })
  
  const emit = defineEmits([
    'update:username',
    'update:email',
    'update:firstName',
    'update:lastName'
  ])
  
  const isModalOpen = ref<boolean>(false)
  const activeField = ref<string>('')
  const editValue = ref<string>('')
  
  const profileData = computed<ProfileData>(() => ({
    username: props.username,
    email: props.email,
    'first name': props.firstName,
    'last name': props.lastName
  }))
  
  const openModal = (field: string): void => {
    activeField.value = field
    editValue.value = profileData.value[field as keyof ProfileData]
    isModalOpen.value = true
  }
  
  const closeModal = (): void => {
    isModalOpen.value = false
    editValue.value = ''
  }
  
  const fieldToEmitMap: Record<string, string> = {
    'username': 'update:username',
    'email': 'update:email',
    'first name': 'update:firstName',
    'last name': 'update:lastName'
  }
  
  const saveChanges = (): void => {
    const normalizedField = activeField.value.replace(/\s+/g, '')
    const emitEvent = fieldToEmitMap[activeField.value]
    if (emitEvent) {
      emit(emitEvent as 'update:username' | 'update:email' | 'update:firstName' | 'update:lastName', editValue.value)
      closeModal()
    }
  }
  </script>

  <script lang="ts">
    export default {
        name: 'ProfileCard',
    };
  </script>