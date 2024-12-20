<template>
  <div class="bg-white rounded-lg p-4 md:p-6 shadow-md flex flex-row">
    <!-- Flight Header -->
    <div class="flex items-center gap-2 mb-4">
      <span class="font-medium" style="color: #4f4939;">Qsuite</span>
      <InfoIcon class="w-4 h-4 text-gray-400" />
    </div>

    <!-- Flight Times and Route -->
    <div class="flex items-center justify-between mb-6 ml-9 self-center">
      <div class="space-y-1">
        <div class="text-2xl md:text-4xl font-light">{{ departureTime }}</div>
        <div class="text-sm text-gray-600">{{ departureAirport }}</div>
      </div>

      <div class="flex flex-col items-center px-2 md:px-4">
        <img 
          src="../../assets/MainLogo_shadow.png" 
          alt="QAirline" 
          class="h-6 mb-2"
        />
        <span class="text-xs md:text-sm text-gray-600 whitespace-nowrap">Non-stop, {{ duration }}</span>
      </div>

      <div class="space-y-1">
        <div class="text-2xl md:text-4xl font-light">{{ arrivalTime }}</div>
        <div class="text-sm text-gray-600">{{ arrivalAirport }}</div>
      </div>
    </div>

    <!-- Flight Details and Cancel Buttons -->
    <div class="flex flex-col ml-auto">
      <button 
        @click="showDetails = true"
        class="text-sm text-gray-900 hover:text-[#d0c5a4] font-medium mb-4 underline"
      >
        Flight details
      </button>
      
      <button 
        @click="handleCancellation"
        class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Cancel Flight
      </button>
    </div>

    <!-- Flight Details Modal -->
    <Teleport to="body">
      <div 
        v-if="showDetails"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-end"
        @click.self="showDetails = false"
      >
        <div class="bg-white w-full max-w-md h-full overflow-y-auto">
          <!-- Modal Header -->
          <div class="flex items-center justify-between p-4 md:p-6 border-b">
            <h2 class="text-xl font-semibold">Flight details</h2>
            <button 
              @click="showDetails = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <X class="w-6 h-6" />
            </button>
          </div>

          <!-- Modal Content -->
          <div class="p-4 md:p-6">
            <h3 class="text-xl font-semibold mb-2">
              {{ departureCity }} to {{ arrivalCity }}
            </h3>
            <div class="text-gray-600 mb-6">{{ formattedDate }}</div>

            <!-- Timeline -->
            <div class="relative pl-8 border-l-2 border-gray-200">
              <!-- Departure -->
              <div class="mb-8 relative">
                <div class="absolute -left-[41px] top-0 w-5 h-5 bg-white border-4 border-[#4f4939] rounded-full"></div>
                <div class="text-lg font-medium">{{ departureTime }}</div>
                <div class="font-medium">{{ departureCity }}</div>
                <div class="text-gray-600">{{ departureAirportFull }}</div>
              </div>

              <!-- Flight Info -->
              <div class="mb-8 -ml-8">
                <div class="flex items-center gap-2 mb-1">
                  <img 
                    src="../../assets/MainLogo_shadow.png" 
                    alt="QAirline" 
                    class="h-6"
                  />
                  <span class="text-gray-900">{{ duration }}</span>
                </div>
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="font-medium">{{ flightNumber }}</span>
                  <span class="text-gray-600">- {{ aircraft }}</span>
                  <span class="text-[#4f4939]">- Qsuite</span>
                </div>
                <div class="text-gray-600">Operated by {{ operator }}</div>
              </div>

              <!-- Arrival -->
              <div class="relative">
                <div class="absolute -left-[41px] top-0 w-5 h-5 bg-white border-4 border-[#4f4939] rounded-full"></div>
                <div class="text-lg font-medium">{{ arrivalTime }}</div>
                <div class="font-medium">{{ arrivalCity }}</div>
                <div class="text-gray-600">{{ arrivalAirportFull }}</div>
              </div>
            </div>
            <div class="mt-6">
              <button 
                @click="showPassengerDetails = true"
                class="w-full bg-[#4f4939] hover:bg-[#d0c5a4] text-white rounded-full py-2 transition-colors text-sm font-medium"
              >
                Passenger Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Cancellation Result Modal -->
    <Teleport to="body">
      <div 
        v-if="showCancellationModal"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        @click.self="showCancellationModal = false"
      >
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
          <div class="flex flex-col items-center text-center">
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center mb-4"
              :class="canCancel ? 'bg-green-100' : 'bg-red-100'"
            >
              <component 
                :is="canCancel ? CheckCircle : XCircle"
                class="w-6 h-6"
                :class="canCancel ? 'text-green-600' : 'text-red-600'"
              />
            </div>
            <h3 class="text-xl font-semibold mb-2">
              {{ canCancel ? 'Flight Cancelled Successfully' : 'Unable to Cancel Flight' }}
            </h3>
            <p class="text-gray-600 mb-6">
              {{ cancellationMessage }}
            </p>
            <button 
              @click="showCancellationModal = false"
              class="px-4 py-2 bg-[#4f4939] text-white rounded-lg hover:bg-[#d0c5a4]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Teleport>
    
    <!-- Passenger Details Modal -->
    <Teleport to="body">
      <div 
        v-if="showPassengerDetails"
        class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        @click.self="showPassengerDetails = false"
      >
        <div class="bg-white rounded-lg p-6 max-w-md w-full">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-semibold">Passenger Details</h3>
            <button 
              @click="showPassengerDetails = false"
              class="text-gray-400 hover:text-gray-600"
            >
              <X class="w-6 h-6" />
            </button>
          </div>
          <div class="space-y-4">
            <div>
              <label class="text-sm text-gray-600">Gender</label>
              <p class="font-medium">{{ gender }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-600">Name</label>
              <p class="font-medium">{{ firstName }} {{ lastName }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-600">Date of birth</label>
              <p class="font-medium">{{ dateOfBirth }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-600">Nationality</label>
              <p class="font-medium">{{ nationality }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-600">Passport Number</label>
              <p class="font-medium">{{ passportNumber }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-600">Phone Number</label>
              <p class="font-medium">{{ phoneNumber }}</p>
            </div>
            <div>
              <label class="text-sm text-gray-600">Address</label>
              <p class="font-medium">{{ address }}</p>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { InfoIcon, X, CheckCircle, XCircle } from 'lucide-vue-next'

// Props definition
const props = defineProps({
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  departureAirport: { type: String, required: true },
  arrivalAirport: { type: String, required: true },
  departureCity: { type: String, required: true },
  arrivalCity: { type: String, required: true },
  departureAirportFull: { type: String, required: true },
  arrivalAirportFull: { type: String, required: true },
  duration: { type: String, required: true },
  date: { type: String, required: true },
  flightNumber: { type: String, required: true },
  aircraft: { type: String, required: true },
  operator: { type: String, required: true },
  gender: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: String, required: true },
  nationality: { type: String, required: true },
  passportNumber: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true }
})

// Modal states
const showDetails = ref(false)
const showCancellationModal = ref(false)
const canCancel = ref(false)
const cancellationMessage = ref('')
const showPassengerDetails = ref(false)

// Computed date format
const formattedDate = computed(() => {
  return new Date(props.date).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
})

const handleCancellation = () => {
  const departureDate = new Date(props.date + ' ' + props.departureTime)
  const currentDate = new Date()
  const hoursDifference = (departureDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60)

  canCancel.value = hoursDifference > 12
  cancellationMessage.value = canCancel.value
    ? 'Your flight has been successfully cancelled. A refund will be processed within 5-7 business days.'
    : 'Flights cannot be cancelled within 12 hours of departure. Please contact customer service for assistance.'
  
  showCancellationModal.value = true
}
</script>

<script lang="ts">
export default {
  name: "ProfileFlightCard",
};
</script>

