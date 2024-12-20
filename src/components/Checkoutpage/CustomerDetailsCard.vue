<template>
  <div class="bg-white rounded-lg shadow-md max-w-2xl w-full">
    <!-- Header -->
    <div class="flex justify-between items-center p-6 border-b">
      <h2 class="text-2xl font-semibold">Edit Profile</h2>
      <button @click="emit('close')" class="text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
      <!-- Title -->
      <div class="space-y-2">
        <label class="text-lg font-medium">Title</label>
        <select 
          v-model="form.title"
          class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d0c5a4] focus:border-[#d0c5a4]"
        >
          <option value="">Title</option>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Ms">Ms</option>
          <option value="Dr">Dr</option>
        </select>
      </div>

      <!-- Gender -->
      <div class="space-y-2">
        <label class="text-lg font-medium">Gender</label>
        <div class="flex gap-4">
          <label class="flex items-center gap-2 p-3 border rounded-lg cursor-pointer">
            <input 
              type="radio" 
              v-model="form.gender" 
              value="male"
              class="w-4 h-4 text-[#4f4939]"
            >
            Male
          </label>
          <label class="flex items-center gap-2 p-3 border rounded-lg cursor-pointer">
            <input 
              type="radio" 
              v-model="form.gender" 
              value="female"
              class="w-4 h-4 text-[#4f4939]"
            >
            Female
          </label>
        </div>
      </div>

      <!-- Name Fields -->
      <div class="space-y-2">
        <label class="text-lg font-medium">First name/middle name on passport</label>
        <input 
          v-model="form.firstName"
          type="text"
          class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d0c5a4] focus:border-[#d0c5a4]"
        >
      </div>

      <div class="space-y-2">
        <label class="text-lg font-medium">Last name on passport</label>
        <input 
          v-model="form.lastName"
          type="text"
          class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d0c5a4] focus:border-[#d0c5a4]"
        >
      </div>

      <!-- Date of Birth -->
      <div class="space-y-2">
        <label class="text-lg font-medium">Date of birth</label>
        <div class="grid grid-cols-3 gap-4">
          <select 
            v-model="form.birthDay"
            class="p-3 border rounded-lg focus:ring-2 focus:ring-[#d0c5a4] focus:border-[#d0c5a4]"
          >
            <option value="">Day</option>
            <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
          </select>
          <select 
            v-model="form.birthMonth"
            class="p-3 border rounded-lg focus:ring-2 focus:ring-[#d0c5a4] focus:border-[#d0c5a4]"
          >
            <option value="">Month</option>
            <option v-for="(month, index) in months" :key="month" :value="month">
              {{ new Date(2000, index).toLocaleString('default', { month: 'long' }) }}
            </option>
          </select>
          <select 
            v-model="form.birthYear"
            class="p-3 border rounded-lg focus:ring-2 focus:ring-[#d0c5a4] focus:border-[#d0c5a4]"
          >
            <option value="">Year</option>
            <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
          </select>
        </div>
      </div>

      <!-- Nationality -->
      <div class="space-y-2">
        <label class="text-lg font-medium">Nationality</label>
        <select 
          v-model="form.nationality"
          class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d0c5a4] focus:border-[#d0c5a4]"
        >
          <option value="">Select nationality</option>
          <option value="US">United States</option>
          <option value="UK">United Kingdom</option>
          <option value="CA">Canada</option>
          <!-- Add more nationalities as needed -->
        </select>
      </div>

      <!-- Passport Details -->
      <div class="space-y-4">
        <h3 class="text-xl font-semibold">Passport details</h3>
        
        <div class="space-y-2">
          <label class="text-lg font-medium">Passport number</label>
          <input 
            v-model="form.passportNumber"
            type="text"
            class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d0c5a4] focus:border-[#d0c5a4]"
          >
        </div>

        <div class="space-y-2">
          <label class="text-lg font-medium">Date of expiry</label>
          <div class="grid grid-cols-3 gap-4">
            <select 
              v-model="form.expiryDay"
              class="p-3 border rounded-lg focus:ring-2 focus:ring-[#d0c5a4] focus:border-[#d0c5a4]"
            >
              <option value="">Day</option>
              <option v-for="day in 31" :key="day" :value="day">{{ day }}</option>
            </select>
            <select 
              v-model="form.expiryMonth"
              class="p-3 border rounded-lg focus:ring-2 focus:ring-[#d0c5a4] focus:border-[#d0c5a4]"
            >
              <option value="">Month</option>
              <option v-for="(month, index) in months" :key="month" :value="month">
                {{ new Date(2000, index).toLocaleString('default', { month: 'long' }) }}
              </option>
            </select>
            <select 
              v-model="form.expiryYear"
              class="p-3 border rounded-lg focus:ring-2 focus:ring-[#d0c5a4] focus:border-[#d0c5a4]"
            >
              <option value="">Year</option>
              <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <button 
        type="submit"
        :disabled="!isFormValid"
        class="w-full bg-[#4f4939] text-white py-4 rounded-full hover:bg-[#d0c5a4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save and continue
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface FormData {
  title: string;
  gender: string;
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

const props = defineProps<{
  initialData: FormData;
}>()

const emit = defineEmits<{
  (e: 'submit', data: FormData): void
  (e: 'close'): void
}>()

const form = ref<FormData>({
  title: '',
  gender: '',
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

onMounted(() => {
  Object.assign(form.value, props.initialData)
})

// Generate years for dropdowns (100 years back from current year)
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

// Months for dropdowns
const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'))

// Methods
const handleSubmit = () => {
  // Create a copy of the form data
  const formData = { ...form.value }
  
  // Convert month name to number for birth month and expiry month
  formData.birthMonth = (months.indexOf(formData.birthMonth) + 1).toString().padStart(2, '0')
  formData.expiryMonth = (months.indexOf(formData.expiryMonth) + 1).toString().padStart(2, '0')
  
  // Emit the submit event with the form data
  emit('submit', formData)
  emit('close')
}

const isFormValid = computed(() => {
  return (
    form.value.title &&
    form.value.gender &&
    form.value.firstName &&
    form.value.lastName &&
    form.value.birthDay &&
    form.value.birthMonth &&
    form.value.birthYear &&
    form.value.nationality &&
    form.value.passportNumber &&
    form.value.expiryDay &&
    form.value.expiryMonth &&
    form.value.expiryYear
  )
})
</script>

<script lang="ts">
export default {
  name: 'CustomerDetailsCard',
};
</script>

