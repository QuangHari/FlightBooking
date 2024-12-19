<template>
    <div class="min-h-screen bg-gray-50 p-4">
      <div class="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl">
        <div class="p-8">
          <h2 class="text-2xl font-bold text-[#4f4939] mb-6">Edit Flight Information</h2>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Flight Number -->
            <div class="space-y-1">
              <label class="text-sm text-gray-500">Flight Number</label>
              <input 
                v-model="form.flightNumber"
                type="text" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                placeholder="Select flight number"
                @focus="showFlightDropdown = true"
                @blur="hideFlightDropdown"
                required
              />
              <div class = "relative">
                <div v-if="showFlightDropdown" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60">
                  <div 
                    v-for="(option, index) in flightOptions" 
                    :key="index" 
                    @mousedown="selectFlightOption(option)"
                    class="p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {{ option }}
                  </div>
                </div>
              </div>
            </div>
  
            <div class="grid grid-cols-2 gap-4">
              <!-- Departure Date Time -->
              <div class="space-y-1">
                <label class="text-sm text-gray-500">Edit Departure Date & Time</label>
                <Datepicker
                  v-model="form.departureDateTime"
                  :enable-time-picker="true"
                  :is24="true"
                  text-input
                  placeholder="Select date and time"
                  input-class-name="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                  required
                />
              </div>
  
              <!-- Arrival Date Time -->
              <div class="space-y-1">
                <label class="text-sm text-gray-500">Edit Arrival Date & Time</label>
                <Datepicker
                  v-model="form.arrivalDateTime"
                  :enable-time-picker="true"
                  :is24="true"
                  text-input
                  placeholder="Select date and time"
                  input-class-name="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                  required
                />
              </div>
            </div>

            <div class="flex justify-end gap-4">
              <button
                type="button"
                @click="resetForm"
                class="px-6 py-3 text-[#4f4939] hover:text-[#d0c5a4] font-medium"
              >
                Reset
              </button>
              <button
                type="submit"
                class="bg-[#4f4939] hover:bg-[#d0c5a4] text-white px-8 py-3 rounded-full font-medium transition-colors"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Updating Flight...' : 'Update Flight' }}
              </button>
            </div>
          </form>
  
          <!-- Success Message -->
          <div
            v-if="showSuccess"
            class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div class="bg-white p-6 rounded-lg shadow-xl">
              <div class="text-center">
                <CheckCircle class="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Flight Information Updated Successfully</h3>
                <p class="text-gray-600 mb-4">The flight has been updated to the database.</p>
                <button
                  @click="showSuccess = false"
                  class="bg-[#4f4939] hover:bg-[#d0c5a4] text-white px-6 py-2 rounded-full font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang = "ts">
  import { ref, reactive } from 'vue'
  import Datepicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'
  import { CheckCircle } from 'lucide-vue-next'
  
  const form = reactive({
    flightNumber: '',
    departureDateTime: null,
    arrivalDateTime: null,
  })
  
  const isSubmitting = ref(false)
  const showSuccess = ref(false)

  const showFlightDropdown = ref(false)
  const flightOptions = ref<string[]>([])

  const selectFlightOption = (option: string) => {
    form.flightNumber = option
    showFlightDropdown.value = false
  }

  const hideFlightDropdown = () => {
    setTimeout(() => {
      showFlightDropdown.value = false
    }, 100)
  }
  
  const handleSubmit = async () => {
    try {
      isSubmitting.value = true
      
      // Here you would typically make an API call to save the flight
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      
      console.log('Submitted flight:', form)
      showSuccess.value = true
      resetForm()
    } catch (error) {
      console.error('Error adding flight:', error)
    } finally {

    }
  }
  
  const resetForm = () => {
    form.flightNumber = ''
    form.departureDateTime = null
    form.arrivalDateTime = null
  }
  </script>
  
  <script lang = "ts">
  export default {
    name: "EditForm",
  };
  </script>

  <style scoped>
  input::placeholder {
    color: theme('colors.gray.400');
  }
  
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  input[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;
  }
  </style>
  
  