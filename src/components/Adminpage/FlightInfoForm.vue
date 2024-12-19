<template>
      <div class="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl">
        <div class="p-8">
          <h2 class="text-2xl font-bold text-[#4f4939] mb-6">Add New Flight</h2>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Flight Number -->
            <div class="space-y-1">
              <label class="text-sm text-gray-500">Flight Number</label>
              <input 
                v-model="form.flightNumber"
                type="text" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                placeholder="Enter flight number"
                required
              />
            </div>
  
            <div class="grid grid-cols-2 gap-4">
              <!-- Origin Airport Code -->
              <div class="space-y-1 relative">
                <label class="text-sm text-gray-500">Origin City Code</label>
                <div>
                  <input 
                    v-model="form.originAirportCode"
                    type="text" 
                    class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                    placeholder="City or airport"
                    @focus="showFromDropdown = true"
                    @blur="hideFromDropdown"
                    required
                  />
                  <div v-if="showFromDropdown" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <div 
                      v-for="(option, index) in fromOptions" 
                      :key="index" 
                      @mousedown="selectFromOption(option)"
                      class="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {{ option }}
                    </div>
                  </div>
                </div>
              </div>
  
              <!-- Destination Airport Code -->
              <div class="space-y-1 relative">
                <label class="text-sm text-gray-500">Destination City Code</label>
                <input 
                  v-model="form.destinationAirportCode"
                  type="text" 
                  class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                  placeholder="City or airport"
                  @focus="showToDropdown = true"
                  @blur="hideToDropdown"
                  required
                />
                <div v-if="showToDropdown" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  <div 
                    v-for="(option, index) in toOptions" 
                    :key="index" 
                    @mousedown="selectToOption(option)"
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
                <label class="text-sm text-gray-500">Departure Date & Time</label>
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
                <label class="text-sm text-gray-500">Arrival Date & Time</label>
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
  
            <!-- Available Seats and Plane info -->
            <div class="space-y-1">
              <label class="text-sm text-gray-500">Available Seats</label>
              <input 
                v-model.number="form.availableSeats"
                type="number" 
                min="0"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                placeholder="Enter number of available seats"
                required
              />
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">Plane</label>
              <input 
                  v-model="form.plane"
                  type="text" 
                  class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                  placeholder="City or airport"
                  @focus="showPlaneDropdown = true"
                  @blur="hidePlaneDropdown"
                  required
                />
                <div class="relative">
                  <div v-if="showPlaneDropdown" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <div 
                      v-for="(option, index) in planeOptions" 
                      :key="index" 
                      @mousedown="selectPlaneOption(option)"
                      class="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {{ option }}
                    </div>
                  </div>
                </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">Economy Price</label>
              <input 
                v-model.number="form.economyPrice"
                type="number" 
                min="0"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                placeholder="Enter number of available seats"
                required
              />
            </div>

            <div class="space-y-1">
              <label class="text-sm text-gray-500">First Class Price</label>
              <input 
                v-model.number="form.firstClassPrice"
                type="number" 
                min="0"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                placeholder="Enter number of available seats"
                required
              />
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
                {{ isSubmitting ? 'Adding Flight...' : 'Add Flight' }}
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
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Flight Added Successfully</h3>
                <p class="text-gray-600 mb-4">The flight has been added to the database.</p>
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
    originAirportCode: '',
    destinationAirportCode: '',
    availableSeats: null,
    plane: null as string | null,
    economyPrice: null,
    firstClassPrice: null
  })
  
  const showFromDropdown = ref(false)
  const fromOptions = ref<string[]>([])
  const isSubmitting = ref(false)
  const showSuccess = ref(false)

  const selectFromOption = (option: string) => {
    form.originAirportCode = option
    showFromDropdown.value = false
  }
  
  const hideFromDropdown = () => {
    setTimeout(() => {
      showFromDropdown.value = false
    }, 100)
  }

  const showToDropdown = ref(false)
  const toOptions = ref<string[]>([])

  const selectToOption = (option: string) => {
    form.destinationAirportCode = option
    showToDropdown.value = false
  }

  const hideToDropdown = () => {
    setTimeout(() => {
      showToDropdown.value = false
    }, 100)
  }

  const showPlaneDropdown = ref(false)
  const planeOptions = ref<string[]>([])

  const selectPlaneOption = (option: string) => {
    form.plane = option
    showPlaneDropdown.value = false
  }

  const hidePlaneDropdown = () => {
    setTimeout(() => {
      showPlaneDropdown.value = false
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
      form.plane = null
    }
  }
  
  const resetForm = () => {
    form.flightNumber = ''
    form.departureDateTime = null
    form.arrivalDateTime = null
    form.originAirportCode = ''
    form.destinationAirportCode = ''
    form.availableSeats = null
    form.plane = null
    form.economyPrice = null
    form.firstClassPrice = null
  }
  </script>
  
  <script lang = "ts">
  export default {
    name: "FlightInfoForm",
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
  
  