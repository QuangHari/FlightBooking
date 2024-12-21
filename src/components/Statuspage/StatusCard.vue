<template>
    <div class="bg-white rounded-lg border p-6 grid grid-cols-[200px,1fr,auto] gap-8 shadow-md">
      <!-- Flight Number and Status -->
      <div class="space-y-4">
        <h2 class="text-3xl font-medium text-[#4f4939]">{{ flightNumber }}</h2>
        <div class="flex items-center gap-2 text-green-600">
          <Plane class="w-5 h-5" />
          <span class="uppercase font-medium">{{ status }}</span>
        </div>
      </div>
  
      <!-- Flight Details -->
      <div class="flex items-center gap-8">
        <!-- Departure -->
        <div class="space-y-2">
          <p class="text-lg font-medium">{{ formatDateTime(departureDateTime) }}</p>
          <div>
            <p class="text-lg font-medium text-[#4f4939]">{{ departureCity }}({{ departureCode }})</p>
            <p class="text-sm text-gray-600">{{ departureAirport }},</p>
            <p class="text-sm text-gray-600">{{ departureCountry }}</p>
          </div>
        </div>
  
        <!-- Flight Progress -->
        <div class="flex-1 flex items-center gap-2">
          <div class="h-[2px] bg-gray-300 flex-1 relative">
            <Plane 
              class="w-6 h-6 text-green-600 absolute -top-[11px] left-0"
              :style="{ left: `${progressPercentage}%` }"
            />
          </div>
        </div>
  
        <!-- Arrival -->
        <div class="space-y-2">
          <p class="text-lg font-medium">{{ formatDateTime(arrivalDateTime) }}</p>
          <div>
            <p class="text-lg font-medium text-[#4f4939]">{{ arrivalCity }}({{ arrivalCode }})</p>
            <p class="text-sm text-gray-600">{{ arrivalAirport }},</p>
            <p class="text-sm text-gray-600">{{ arrivalCountry }}</p>
          </div>
        </div>
      </div>
  
      <!-- Set Alert Button -->
      <button class="h-fit px-6 py-3 bg-[#4f4939] text-white rounded-lg hover:bg-[#d0c5a4] transition-colors">
        Set alert
      </button>
    </div>
  </template>
  
  <script setup lang = "ts">
  import { computed } from 'vue'
  import { Plane } from 'lucide-vue-next'
  
  const props = defineProps({
    flightNumber: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    departureDateTime: {
      type: String,
      required: true
    },
    arrivalDateTime: {
      type: String,
      required: true
    },
    departureCity: {
      type: String,
      required: true
    },
    departureCode: {
      type: String,
      required: true
    },
    departureAirport: {
      type: String,
      required: true
    },
    departureCountry: {
      type: String,
      required: true
    },
    arrivalCity: {
      type: String,
      required: true
    },
    arrivalCode: {
      type: String,
      required: true
    },
    arrivalAirport: {
      type: String,
      required: true
    },
    arrivalCountry: {
      type: String,
      required: true
    },
    progressPercentage: {
      type: Number,
      default: 0
    }
  })
  
  const formatDateTime = (date : Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
  }
  </script>
  
<script lang = "ts">
    export default {
        name: 'StatusCard'
    };
</script>  