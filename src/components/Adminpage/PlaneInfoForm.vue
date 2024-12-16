<template>
    <div class="min-h-screen bg-gray-50 p-4">
      <div class="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl">
        <div class="p-8">
          <h2 class="text-2xl font-bold text-[#4f4939] mb-6">Add New Plane</h2>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Plane Brand -->
            <div class="space-y-1">
              <label class="text-sm text-gray-500">Brand</label>
              <input 
                v-model="form.brand"
                type="text" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                placeholder="Enter flight number"
                required
              />
            </div>

            <!-- Model -->
            <div class="space-y-1">
              <label class="text-sm text-gray-500">Model</label>
              <input 
                v-model="form.model"
                type="text" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                placeholder="Enter flight number"
                required
              />
            </div>
  
            <!-- Available Seats -->
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
                {{ isSubmitting ? 'Adding Plane...' : 'Add Plane' }}
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
                <h3 class="text-xl font-semibold text-gray-900 mb-2">Plane Added Successfully</h3>
                <p class="text-gray-600 mb-4">The plane has been added to the database.</p>
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
  import '@vuepic/vue-datepicker/dist/main.css'
  import { CheckCircle } from 'lucide-vue-next'
  
  const form = reactive({
    brand: null,
    model: null,
    availableSeats: null
  })
  
  const isSubmitting = ref(false)
  const showSuccess = ref(false)
  
  const handleSubmit = async () => {
    try {
      isSubmitting.value = true
      
      // Here you would typically make an API call to save the flight
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
      
      console.log('Submitted plane:', form)
      showSuccess.value = true
      resetForm()
    } catch (error) {
      console.error('Error adding plane:', error)
    } finally {
      isSubmitting.value = false
    }
  }
  
  const resetForm = () => {
    form.brand = null
    form.model = null
    form.availableSeats = null
  }
  </script>
  
  <script lang = "ts">
  export default {
    name: "PlaneInfoForm",
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
    -moz-appearance: textfield;
  }
  </style>
  
  