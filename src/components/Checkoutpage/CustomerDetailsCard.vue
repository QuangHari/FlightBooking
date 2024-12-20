<template>
  <div class="max-w-3xl mx-auto shadow-md my-8">
    <!-- Customer Card -->
    <button 
      @click="isModalOpen = true"
      class="w-full bg-white rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
    >
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
          <span class="text-lg font-semibold">{{ getInitial }}</span>
        </div>
        <div class="text-left">
          <h2 class="text-xl font-semibold">{{ firstName || 'Adult 1' }} {{ lastName }}</h2>
          <p v-if="!isComplete" class="text-red-500">
            Please check and complete {{ remainingFields }} field(s)
          </p>
          <p v-else class="text-gray-600">
            {{ firstName }} {{ lastName }}
          </p>
        </div>
      </div>
      <div class="bg-[#4f4939] text-white px-6 py-2 rounded-full flex items-center gap-2">
        Edit
        <PencilIcon class="w-4 h-4" />
      </div>
    </button>

    <!-- Modal -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center p-4 z-50 overflow-y-auto">
        <div class="bg-white rounded-lg w-full max-w-2xl mt-8 relative">
          <!-- Modal Header -->
          <div class="flex justify-between items-center p-6 border-b">
            <h2 class="text-2xl font-semibold">Adult Passenger</h2>
            <button @click="isModalOpen = false" class="text-gray-500 hover:text-gray-700">
              <XIcon class="w-6 h-6" />
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="p-6 space-y-6">

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
                  <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
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
                <option value="VN">Vietnam</option>
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
            </div>

            <!-- Phone Number -->
            <div class="space-y-4">
              <h3 class="text-xl font-semibold">Contact details</h3>
              
              <div class="space-y-2">
                <label class="text-lg font-medium">Phone number</label>
                <input 
                  v-model="form.phoneNumber"
                  type="text"
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d0c5a4] focus:border-[#d0c5a4]"
                >
              </div>

              <div class="space-y-2">
                <label class="text-lg font-medium">Address</label>
                <input 
                  v-model="form.address"
                  type="text"
                  class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#d0c5a4] focus:border-[#d0c5a4]"
                >
              </div>
            </div>

            <!-- Submit Button -->
            <button 
              type="submit"
              class="w-full bg-[#4f4939] text-white py-4 rounded-full hover:bg-[#d0c5a4] transition-colors"
            >
              Save and continue
            </button>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { PencilIcon, XIcon } from 'lucide-vue-next'
import { emit } from 'process';

const isModalOpen = ref(false)
const firstName = ref('')
const lastName = ref('')

const form = ref({
  gender: '',
  firstName: '',
  lastName: '',
  birthDay: '',
  birthMonth: '',
  birthYear: '',
  nationality: '',
  passportNumber: '',
  phoneNumber: '',
  address: '',
})

// Generate years for dropdowns (100 years back from current year)
const currentYear = new Date().getFullYear()
const years = Array.from({ length: 100 }, (_, i) => currentYear - i)

// Months for dropdowns
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

// Computed properties
const getInitial = computed(() => {
  return form.value.lastName ? form.value.lastName[0].toUpperCase() : 'A'
})

const isComplete = computed(() => {
  return Object.values(form.value).every(value => value !== '')
})

const remainingFields = computed(() => {
  return Object.values(form.value).filter(value => value === '').length
})

// Methods
const handleSubmit = () => {


  firstName.value = form.value.firstName
  lastName.value = form.value.lastName
  isModalOpen.value = false

  
}
</script>

<script>
export default {
  name: 'CustomerDetailsCard',
};
</script>