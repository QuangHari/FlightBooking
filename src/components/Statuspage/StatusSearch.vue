<template>
    <div class="max-w-4xl mx-auto pb-4">
      <div class="bg-gray-100 p-4 rounded-lg shadow-md">
        <form @submit.prevent="handleSearch" class="flex flex-wrap items-end gap-2">
          <!-- From / Flight Number Input -->
          <div class="flex-1 min-w-[180px]">
            <div class="relative">
              <input 
                v-model="form.from"
                type="text" 
                class="w-full p-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
                placeholder="From / Flight number"
              />
              <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                From / Flight number
              </label>
            </div>
          </div>
  
          <!-- To Input -->
          <div class="flex-1 min-w-[180px]">
            <div class="relative">
              <input 
                v-model="form.to"
                type="text" 
                class="w-full p-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
              />
              <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                To
              </label>
            </div>
          </div>
  
          <!-- Date Picker -->
          <div class="flex-1 min-w-[180px]">
            <div class="relative">
              <Datepicker
                v-model="form.date"
                :enable-time-picker="false"
                :format="formatDate"
                input-class-name="w-full p-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d0c5a4]"
              >
                <template #trigger>
                  <div class="flex items-center justify-between w-full p-2 text-sm bg-white border border-gray-200 rounded-lg cursor-pointer">
                    <span :class="form.date ? 'text-black' : 'text-gray-400'">
                      {{ form.date ? formatDate(form.date) : 'Select date' }}
                    </span>
                    <CalendarDays class="w-4 h-4 text-gray-400" />
                  </div>
                </template>
              </Datepicker>
              <label class="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                Date
              </label>
            </div>
          </div>
  
          <!-- Search Button -->
          <button 
            type="submit"
            class="flex-none w-[120px] p-2 bg-[#4f4939] hover:bg-[#d0c5a4] text-white text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Search</span>
            <Plane class="w-4 h-4" />
          </button>
        </form>
        <span class="block mt-2 text-xs text-[#4f4939]">Example: VN1234 or Hanoi</span>
      </div>
  
      <!-- Flight Status Results -->
      <div v-if="searchResult" class="mt-6">
        <StatusCard v-bind="searchResult" />
      </div>
    </div>
  </template>
  
  <script setup lang = "ts">
  import { ref, reactive } from 'vue'
  import Datepicker from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'
  import { Plane, CalendarDays } from 'lucide-vue-next'
  import StatusCard from './StatusCard.vue'

  
  const form = reactive({
    from: '',
    to: '',
    date: null
  })
  
  interface SearchResult {
    flightNumber: string;
    status: string;
    departureDateTime: Date;
    arrivalDateTime: Date;
    departureCity: string;
    departureCode: string;
    departureAirport: string;
    departureCountry: string;
    arrivalCity: string;
    arrivalCode: string;
    arrivalAirport: string;
    arrivalCountry: string;
    progressPercentage: number;
  }
  
  const searchResult = ref<SearchResult | null>(null)
  
  const formatDate = (date :Date) => {
    if (!date) return ''
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long'
    })
  }
  
  const handleSearch = () => {
    // Giả lập kết quả trả về từ API
    searchResult.value = {
      flightNumber: 'QR703',
      status: 'Scheduled',
      departureDateTime: new Date('2024-12-20T01:20:00'),
      arrivalDateTime: new Date('2024-12-20T08:00:00'),
      departureCity: 'Doha',
      departureCode: 'DOH',
      departureAirport: 'Hamad International Airport',
      departureCountry: 'Qatar',
      arrivalCity: 'New York',
      arrivalCode: 'JFK',
      arrivalAirport: 'John F Kennedy Airport',
      arrivalCountry: 'United States of America',
      progressPercentage: 0
    }
  }
  </script>
  
  <style scoped>
  /* Custom styles for datepicker to match design */
  :deep(.dp__input) {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
  }
  
  :deep(.dp__input:focus) {
    outline: none;
    --tw-ring-color: #d0c5a4;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
  }
  
  :deep(.dp__input_icon) {
    display: none;
  }
  </style>
  
  <script lang = "ts">
  export default {
    name: 'StatusSearch',
  };
  </script>
  
  