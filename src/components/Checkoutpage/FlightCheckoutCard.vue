<template>
  <div class="max-w-lg mx-auto bg-white rounded-lg p-6 space-y-6 shadow-md">
    <!-- Trip Details Section -->
    <div class="space-y-4">
      <h1 class="text-2xl font-bold">Trip details</h1>
      <div class="flex justify-between items-center">
        <div class="space-y-2">
          <label for="economyPassengers" class="block text-sm font-medium text-gray-700">Economy Passengers</label>
          <input 
            type="number" 
            id="economyPassengers" 
            v-model="economyPassengers" 
            min="0" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div class="space-y-2">
          <label for="businessPassengers" class="block text-sm font-medium text-gray-700">Business Passengers</label>
          <input 
            type="number" 
            id="businessPassengers" 
            v-model="businessPassengers" 
            min="0" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
    </div>

    <!-- Flight Route Section -->
    <div 
      class="flex justify-between items-center cursor-pointer"
      @click="isModalOpen = true"
    >
      <div class="space-y-1">
        <h2 class="text-xl font-bold">{{ departureCity }} to {{ arrivalCity }}</h2>
        <p class="text-gray-600">{{ formatDate(flightDate) }}</p>
      </div>
      <ChevronRightIcon class="h-6 w-6 text-gray-400" />
    </div>

    <div class="border-t my-4"></div>

    <!-- Price Section -->
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <h2 class="text-lg">Economy Price (per passenger)</h2>
        <p class="text-lg font-medium">VND {{ economyPrice.toLocaleString() }}</p>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="text-lg">Business Price (per passenger)</h2>
        <p class="text-lg font-medium">VND {{ businessPrice.toLocaleString() }}</p>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="text-lg">Economy Total</h2>
        <p class="text-lg font-medium">VND {{ economyTotal.toLocaleString() }}</p>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="text-lg">Business Total</h2>
        <p class="text-lg font-medium">VND {{ businessTotal.toLocaleString() }}</p>
      </div>
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Grand Total</h2>
        <p class="text-xl font-bold">VND {{ grandTotal.toLocaleString() }}</p>
      </div>
    </div>

    <!-- Payment Summary Link -->
    <button 
      @click="isModalOpen = true"
      class="text-black underline font-medium hover:text-gray-600"
    >
      Payment Summary
    </button>

    <!-- Continue Button -->
    <button class="w-full bg-[#4f4939] text-white py-4 rounded-full hover:bg-[#d0c5a4] transition-colors">
      Book Now
    </button>

    <!-- Flight Details Modal -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div class="bg-white rounded-lg max-w-lg w-full p-6 relative">
          <!-- Modal Header -->
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold">Flight details</h2>
            <button @click="isModalOpen = false" class="text-gray-500 hover:text-gray-700">
              <XIcon class="h-6 w-6" />
            </button>
          </div>

          <!-- Flight Route -->
          <h3 class="text-xl font-bold mb-2">{{ departureCity }} to {{ arrivalCity }}</h3>
          <p class="text-gray-600 mb-6">{{ formatDate(flightDate) }}</p>

          <!-- Timeline -->
          <div class="space-y-8 relative">
            <div class="absolute left-[7px] top-8 bottom-8 w-[2px] bg-gray-300"></div>

            <!-- Departure -->
            <div class="flex gap-4">
              <div class="w-4 h-4 rounded-full bg-gray-300 mt-1"></div>
              <div>
                <p class="font-bold">{{ departureTime }}</p>
                <p class="font-bold">{{ departureCity }}</p>
                <p class="text-gray-600">{{ departureAirport }}</p>
              </div>
            </div>

            <!-- Flight Info -->
            <div class="flex gap-4 ml-4 pl-4">
              <img src="../../assets/MainLogo_shadow.png" alt="Airline Logo" class="h-6" />
              <div>
                <p class="font-bold">{{ flightNumber }}</p>
                <p class="text-gray-600">{{ plane }}</p>
                <p class="text-gray-600">{{ operator }}</p>
              </div>
            </div>

            <!-- Arrival -->
            <div class="flex gap-4">
              <div class="w-4 h-4 rounded-full bg-gray-300 mt-1"></div>
              <div>
                <p class="font-bold">{{ arrivalTime }}</p>
                <p class="font-bold">{{ arrivalCity }}</p>
                <p class="text-gray-600">{{ arrivalAirport }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronRightIcon, XIcon } from 'lucide-vue-next'

// Props definition
const props = defineProps({
  departureCity: { type: String, required: true },
  arrivalCity: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  departureAirport: { type: String, required: true },
  arrivalAirport: { type: String, required: true },
  flightNumber: { type: String, required: true },
  plane: { type: String, required: true },
  operator: { type: String, required: true },
  flightDate: { type: Date, required: true },
  economyPrice: { type: Number, required: true },
  businessPrice: { type: Number, required: true },
  duration: { type: String, required: true }
})

// Modal state
const isModalOpen = ref(false)

// Passenger counts
const economyPassengers = ref(1)
const businessPassengers = ref(0)

// Computed properties for totals
const economyTotal = computed(() => props.economyPrice * economyPassengers.value)
const businessTotal = computed(() => props.businessPrice * businessPassengers.value)
const grandTotal = computed(() => economyTotal.value + businessTotal.value)

// Date formatter
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date)
}
</script>

<script lang="ts">
export default {
  name: 'FlightCheckoutCard',
};
</script>

