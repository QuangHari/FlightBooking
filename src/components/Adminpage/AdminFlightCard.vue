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
  
      <!-- Flight Details Button -->
      <button 
        @click="showDetails = true"
        class="text-sm text-gray-900 hover:text-[#d0c5a4] font-medium mb-6 underline ml-auto mr-8"
      >
        Flight details
      </button>
  
      <!-- Fare Options -->
      <div class="ml-auto grid grid-cols-2 gap-4">
        <button 
          class="text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div class="text-sm text-gray-600 mb-1">Flight Number</div>
          <div class="text-lg md:text-2xl font-semibold">
             {{ flightNumber }}
          </div>
        </button>
      </div>
  
      <!-- Flight Details Modal -->
      <Teleport to="body">
        <div 
          v-if="showDetails"
          class="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-start justify-end"
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
                  @click="showEditForm = true"
                  class="w-full bg-[#4f4939] hover:bg-[#d0c5a4] text-white rounded-full py-2 transition-colors text-sm font-medium"
                >
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
  
      <!-- Edit Form Modal -->
      <Teleport to="body">
        <div 
          v-if="showEditForm"
          class="fixed inset-0 bg-black bg-opacity-50 z-70 flex items-center justify-center"
          @click.self="showEditForm = false"
        >
          <div class="bg-white w-full max-w-3xl rounded-lg overflow-hidden">
            <EditForm 
            @flight-edited="handleFlightUpdated"
            :flightId="props.flighId"
            @close="showEditForm = false" :flightNumber="flightNumber" />
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { InfoIcon, X, Plane, Calendar, Ban, Briefcase, Luggage, Armchair, CreditCard } from 'lucide-vue-next'
  import EditForm from './EditForm.vue'
  
  // Props definition
  const props = defineProps({
    flighId : { type: Number, required: true },
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
    economyPrice: { type: Number, required: true },
    businessPrice: { type: Number, required: true }
  })
  
  // Modal states
  const showDetails = ref(false)
  const showEditForm = ref(false)
  const emit = defineEmits(['flight-updated'])
  const handleFlightUpdated = () => {
    console.log('Flight updated');
    emit('flight-updated')
  }
  // Computed date format
  const formattedDate = computed(() => {
    return new Date(props.date).toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  })
  </script>
  
  <script lang="ts">
  export default {
    name: "AdminFlightCard",
  };
  </script>

