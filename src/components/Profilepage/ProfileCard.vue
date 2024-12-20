<template>
  <div class="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
    <!-- Header Section -->
    <div class="flex justify-between items-start mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">
          {{ profileData.firstName }} {{ profileData.lastName }}
        </h1>
        <p class="text-[#4f4939] mt-1">Personal Information</p>
      </div>
      <button 
        @click="openEditModal"
        class="px-4 py-2 text-sm font-medium text-[#4f4939] hover:text-[#d0c5a4] transition-colors"
      >
        Edit Profile
      </button>
    </div>

    <!-- Main Content -->
    <div class="space-y-6">
      <!-- Personal Information Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Title -->
        <div class="space-y-1">
          <label class="text-sm text-gray-500">Title</label>
          <p class="text-gray-900 font-medium">{{ profileData.title || '-' }}</p>
        </div>

        <!-- First Name -->
        <div class="space-y-1">
          <label class="text-sm text-gray-500">First Name</label>
          <p class="text-gray-900 font-medium">{{ profileData.firstName || '-' }}</p>
        </div>

        <!-- Last Name -->
        <div class="space-y-1">
          <label class="text-sm text-gray-500">Last Name</label>
          <p class="text-gray-900 font-medium">{{ profileData.lastName || '-' }}</p>
        </div>

        <!-- Date of Birth -->
        <div class="space-y-1">
          <label class="text-sm text-gray-500">Date of Birth</label>
          <p class="text-gray-900 font-medium">
            {{ formatDate(profileData.birthDay, profileData.birthMonth, profileData.birthYear) || '-' }}
          </p>
        </div>

        <!-- Nationality -->
        <div class="space-y-1">
          <label class="text-sm text-gray-500">Nationality</label>
          <p class="text-gray-900 font-medium">{{ profileData.nationality || '-' }}</p>
        </div>
      </div>

      <!-- Passport Information Section -->
      <div class="pt-6 border-t border-gray-200">
        <h2 class="text-lg font-semibold text-[#4f4939] mb-4">Passport Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Passport Number -->
          <div class="space-y-1">
            <label class="text-sm text-gray-500">Passport Number</label>
            <p class="text-gray-900 font-medium">{{ profileData.passportNumber || '-' }}</p>
          </div>

          <!-- Passport Expiry -->
          <div class="space-y-1">
            <label class="text-sm text-gray-500">Passport Expiry Date</label>
            <p class="text-gray-900 font-medium">
              {{ formatDate(profileData.expiryDay, profileData.expiryMonth, profileData.expiryYear) || '-' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- CustomerDetailsCard Modal -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div class="bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          <CustomerDetailsCard 
            :initialData="profileData"
            @submit="updateProfile"
            @close="closeEditModal"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import CustomerDetailsCard from '../Checkoutpage/CustomerDetailsCard.vue'

interface ProfileData {
  title: string;
  firstName: string;
  lastName: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  nationality: string;
  passportNumber: string;
  expiryDay: string;
  expiryMonth: string;
  expiryYear: string;
}

const profileData = reactive<ProfileData>({
  title: '',
  firstName: '',
  lastName: '',
  birthDay: '',
  birthMonth: '',
  birthYear: '',
  nationality: '',
  passportNumber: '',
  expiryDay: '',
  expiryMonth: '',
  expiryYear: ''
})

const isModalOpen = ref(false)

const openEditModal = () => {
  isModalOpen.value = true
}

const closeEditModal = () => {
  isModalOpen.value = false
}

const updateProfile = (newData: ProfileData) => {
  Object.assign(profileData, newData)
  closeEditModal()
}

// Date formatter
const formatDate = (day: string, month: string, year: string) => {
  if (!day || !month || !year) return null
  
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

const getMonthName = (monthNumber: string) => {
  const date = new Date(2000, parseInt(monthNumber) - 1, 1)
  return date.toLocaleString('default', { month: 'long' })
}
</script>

<script lang="ts">
export default {
  name: 'ProfileCard'
}
</script>