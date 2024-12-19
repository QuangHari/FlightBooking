<template>
    <div class="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div class="container mx-auto px-4 py-8 mt-16">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900">All Flights Available</h1>
          <button
            @click="openAddFlightModal"
            class="bg-[#4f4939] hover:bg-[#d0c5a4] text-white px-6 py-2 rounded-full font-medium transition-colors"
          >
            Add Flight
          </button>
        </div>
        <div class="grid grid-cols-1 gap-6">
          <AdminFlightCard
            v-for="flight in flights"
            :key="flight.flightNumber"
            v-bind="flight"
          />
        </div>
      </div>
  
      <!-- Add Flight Modal -->
      <Teleport to="body">
        <div
          v-if="showAddFlightModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-hidden"
          @click.self="closeAddFlightModal"
        >
          <div class="bg-white rounded-lg overflow-hidden max-w-3xl w-full max-h-[90vh] flex flex-col">
            <div class="flex justify-between items-center p-4 border-b">
              <h2 class="text-xl font-semibold text-[#4f4939]">Add New Flight</h2>
              <button @click="closeAddFlightModal" class="text-gray-500 hover:text-gray-700">
                <XIcon class="w-6 h-6" />
              </button>
            </div>
            <div class="p-4 overflow-y-auto flex-grow">
              <FlightInfoForm @flight-added="handleFlightAdded" />
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import AdminNavbar from '../components/Adminpage/AdminNavbar.vue'
  import AdminFlightCard from '../components/Adminpage/AdminFlightCard.vue'
  import FlightInfoForm from '../components/Adminpage/FlightInfoForm.vue'
  import { XIcon } from 'lucide-vue-next'
  
  interface Flight {
    departureTime: string
    arrivalTime: string
    departureAirport: string
    arrivalAirport: string
    departureCity: string
    arrivalCity: string
    departureAirportFull: string
    arrivalAirportFull: string
    duration: string
    date: string
    flightNumber: string
    aircraft: string
    operator: string
    economyPrice: number
    businessPrice: number
  }
  
  const flights = ref<Flight[]>([
    {
      departureTime: "01:20",
      arrivalTime: "08:00",
      departureAirport: "DOH",
      arrivalAirport: "JFK",
      departureCity: "Doha",
      arrivalCity: "New York",
      departureAirportFull: "Hamad International Airport (DOH)",
      arrivalAirportFull: "John F Kennedy Airport (JFK)",
      duration: "14h 40m",
      date: "2024-12-20",
      flightNumber: "QR703",
      aircraft: "Boeing 777-300ER",
      operator: "QAirline",
      economyPrice: 3960000,
      businessPrice: 13290000
    },
    {
      departureTime: "09:15",
      arrivalTime: "14:30",
      departureAirport: "DOH",
      arrivalAirport: "LHR",
      departureCity: "Doha",
      arrivalCity: "London",
      departureAirportFull: "Hamad International Airport (DOH)",
      arrivalAirportFull: "London Heathrow Airport (LHR)",
      duration: "7h 15m",
      date: "2024-12-21",
      flightNumber: "QR001",
      aircraft: "Airbus A350-1000",
      operator: "QAirline",
      economyPrice: 2800000,
      businessPrice: 9500000
    },
    {
      departureTime: "22:40",
      arrivalTime: "06:10",
      departureAirport: "DOH",
      arrivalAirport: "SYD",
      departureCity: "Doha",
      arrivalCity: "Sydney",
      departureAirportFull: "Hamad International Airport (DOH)",
      arrivalAirportFull: "Sydney Kingsford Smith Airport (SYD)",
      duration: "13h 30m",
      date: "2024-12-22",
      flightNumber: "QR908",
      aircraft: "Boeing 777-300ER",
      operator: "QAirline",
      economyPrice: 4200000,
      businessPrice: 14500000
    }
  ])
  
  const showAddFlightModal = ref(false)
  
  const openAddFlightModal = () => {
    showAddFlightModal.value = true
    document.body.style.overflow = 'hidden'
  }
  
  const closeAddFlightModal = () => {
    showAddFlightModal.value = false
    document.body.style.overflow = ''
  }
  
  const handleFlightAdded = (newFlight: Flight) => {
    flights.value.push(newFlight)
    closeAddFlightModal()
  }
  
  onMounted(() => {
    if (showAddFlightModal.value) {
      document.body.style.overflow = 'hidden'
    }
  })
  
  onUnmounted(() => {
    document.body.style.overflow = ''
  })
  </script>
  
  <script lang="ts">
  export default {
    name: 'AdminFlights',
  }
  </script>
  
  <style scoped>
  .overflow-y-auto {
    scrollbar-width: thin;
    scrollbar-color: #4f4939 #f3f4f6;
  }
  
  .overflow-y-auto::-webkit-scrollbar {
    width: 8px;
  }
  
  .overflow-y-auto::-webkit-scrollbar-track {
    background: #f3f4f6;
  }
  
  .overflow-y-auto::-webkit-scrollbar-thumb {
    background-color: #4f4939;
    border-radius: 20px;
    border: 2px solid #f3f4f6;
  }
  </style>