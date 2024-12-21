<template>
  <div class="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl">
    <div class="p-8">
      <h2 class="text-2xl font-bold text-[#4f4939] mb-6">Edit Flight Information</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Flight Number -->
        <div class="space-y-1">
          <label for="flightNumber" class="text-sm text-gray-500">Flight Number</label>
          <input 
            id="flightNumber"
            v-model="form.flightNumber"
            type="text" 
            class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
            placeholder="Select flight number"
            @focus="showFlightDropdown = true"
            @blur="hideFlightDropdown"
            required
          />
          <div class="relative">
            <div v-if="showFlightDropdown" class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
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
          <div class="space-y-1 relative">
            <label for="departureDateTime" class="text-sm text-gray-500">Edit Departure Date & Time</label>
            <Datepicker
              id="departureDateTime"
              v-model="form.departureDateTime"
              :enable-time-picker="true"
              :is24="true"
              text-input
              placeholder="Select date and time"
              input-class-name="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
              :teleport="true"
              required
            />
          </div>

          <!-- Arrival Date Time -->
          <div class="space-y-1 relative">
            <label for="arrivalDateTime" class="text-sm text-gray-500">Edit Arrival Date & Time</label>
            <Datepicker
              id="arrivalDateTime"
              v-model="form.arrivalDateTime"
              :enable-time-picker="true"
              :is24="true"
              text-input
              placeholder="Select date and time"
              input-class-name="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
              :teleport="true"
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
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]"
      >
        <div class="bg-white p-6 rounded-lg shadow-xl">
          <div class="text-center">
            <CheckCircle class="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Flight Information Updated Successfully</h3>
            <p class="text-gray-600 mb-4">The flight has been updated in the database.</p>
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

<script setup lang="ts">
import { ref, reactive, defineProps, onMounted, onUnmounted } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { CheckCircle } from 'lucide-vue-next'
  import {updateFlightSchedule} from '../../api/flight'
const props = defineProps({
  flightId :{ Number, required: true },
  flightNumber: {
    type: String,
    default: ''
  }
})

const form = reactive({
  flightNumber: props.flightNumber,
  departureDateTime: null,
  arrivalDateTime: null,
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const showFlightDropdown = ref(false)
const flightOptions = ref<string[]>(['QR001', 'QR002', 'QR003', 'QR004', 'QR005'])

const selectFlightOption = (option: string) => {
  form.flightNumber = option
  showFlightDropdown.value = false
}

const hideFlightDropdown = () => {
  setTimeout(() => {
    showFlightDropdown.value = false
  }, 100)
}
const emit = defineEmits(['flight-edited'])
const handleSubmit = async () => {
  try {
    isSubmitting.value = true
    
    const data = {
        flightId : Number(props.flightId),
        newDepartureDateTime : form.departureDateTime,
        newArrivalDateTime :  form.arrivalDateTime,
      };
    await updateFlightSchedule(data);
    emit('flight-edited')
    showSuccess.value = true
    resetForm()
  } catch (error) {
    console.error('Error updating flight:', error)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  form.flightNumber = props.flightNumber
  form.departureDateTime = null
  form.arrivalDateTime = null
}

const positionDatepicker = (e: Event) => {
  const target = e.target as HTMLElement
  const datepicker = document.querySelector('.dp__outer_menu_wrap') as HTMLElement
  if (datepicker && target) {
    const rect = target.getBoundingClientRect()
    datepicker.style.position = 'absolute'
    datepicker.style.top = `${rect.bottom + window.scrollY}px`
    datepicker.style.left = `${rect.left + window.scrollX}px`
    datepicker.style.width = `${rect.width}px`
  }
}

onMounted(() => {
  document.addEventListener('dp:open', positionDatepicker)
})

onUnmounted(() => {
  document.removeEventListener('dp:open', positionDatepicker)
})
</script>

<script lang="ts">
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

:deep(.dp__outer_menu_wrap) {
  position: fixed !important;
  z-index: 9999 !important;
}

:deep(.dp__main) {
  width: 100%;
}
</style>